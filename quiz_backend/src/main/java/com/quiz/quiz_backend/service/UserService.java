package com.quiz.quiz_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.quiz.quiz_backend.dto.LoggedUserDTO;
import com.quiz.quiz_backend.dto.LoginDTO;
import com.quiz.quiz_backend.dto.RegisterDTO;
import com.quiz.quiz_backend.dto.VerificationDTO;
import com.quiz.quiz_backend.model.User;
import com.quiz.quiz_backend.repository.UserRepository;
import com.quiz.quiz_backend.util.JwtUtil;

@Service
public class UserService {
    private static final int RESPONSE_OK = 518;
    private static final int RESPONSE_USER_NOT_FOUND = 494;
    private static final int RESPONSE_INVALID_PASSWORD = 884;
    private static final int RESPONSE_USER_NOT_ACTIVATED = 958;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ActivationCodeService activationCodeService;

    @Autowired
    private EmailService emailService;

    public LoggedUserDTO login(LoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.getMail());
        if (user == null) {
            return new LoggedUserDTO("", "", RESPONSE_USER_NOT_FOUND);
        }

        if (!bCryptPasswordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            return new LoggedUserDTO("", "", RESPONSE_INVALID_PASSWORD);
        }

        if (!user.isActivated()) {
            return new LoggedUserDTO("", "", RESPONSE_USER_NOT_ACTIVATED);
        }
        
        String jwtToken = jwtUtil.generateToken(user.getLogin());
        return new LoggedUserDTO(user.getLogin(), jwtToken, RESPONSE_OK);
    }

    public HttpStatus register(RegisterDTO registerDTO) {
        User potenitalUserEmail = userRepository.findByEmail(registerDTO.getEmail());
        if (potenitalUserEmail != null) {
            return HttpStatus.CONFLICT;
        }

        User potenitalUserLogin = userRepository.findByLogin(registerDTO.getUsername());
        if (potenitalUserLogin != null) {
            return HttpStatus.CONFLICT;
        }

        if (!registerDTO.getPassword().equals(registerDTO.getConfirmPassword())) {
            return HttpStatus.BAD_REQUEST;
        }

        User user = new User();
        user.setLogin(registerDTO.getUsername());
        String hashedPassword = bCryptPasswordEncoder.encode(registerDTO.getPassword());
        user.setPassword(hashedPassword);
        user.setEmail(registerDTO.getEmail());
        userRepository.save(user);


        User registretedUser = userRepository.findByEmail(registerDTO.getEmail());
        if (registretedUser == null) {
            return HttpStatus.PRECONDITION_FAILED;
        }

        activationCodeService.createActivationCode(registretedUser);

        String activationCode = activationCodeService.getActivationCodeForUser(registretedUser);
        if (activationCode == null) {
            return HttpStatus.PRECONDITION_FAILED;
        }

        emailService.sendActivationMessage(registretedUser, activationCode);

        return HttpStatus.OK;
    }

    public HttpStatus sendActivationCode(String userMail) {
        User user = userRepository.findByEmail(userMail);
        if (user == null) {
            return HttpStatus.NOT_FOUND;
        }

        String activationCode = activationCodeService.getActivationCodeForUser(user);
        if (activationCode == null) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }

        emailService.sendActivationMessage(user, activationCode);

        return HttpStatus.OK;
    }

    public HttpStatus activateUser(VerificationDTO verificationDTO) {
        User user = userRepository.findByEmail(verificationDTO.getEmail());
        if (user == null) {
            return HttpStatus.NOT_FOUND;
        }

        if (!activationCodeService.isActivationCodeCorrect(verificationDTO.getVerificationCode(), user)) {
            return HttpStatus.BAD_REQUEST;
        }

        user.setActivated(true);
        userRepository.save(user);

        return HttpStatus.OK;
    }
}
