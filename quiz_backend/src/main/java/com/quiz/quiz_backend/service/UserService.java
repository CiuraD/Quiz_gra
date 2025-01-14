package com.quiz.quiz_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.quiz.quiz_backend.dto.LoggedUserDTO;
import com.quiz.quiz_backend.dto.LoginDTO;
import com.quiz.quiz_backend.dto.RegisterDTO;
import com.quiz.quiz_backend.model.User;
import com.quiz.quiz_backend.repository.UserRepository;
import com.quiz.quiz_backend.util.JwtUtil;

@Service
public class UserService {
    private static final int RESPONSE_OK = 518;
    private static final int RESPONSE_USER_NOT_FOUND = 494;
    private static final int RESPONSE_INVALID_PASSWORD = 884;
    private static final int RESPONSE_USER_NOT_ACTIVATED = 958;

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

        //TODO Implement password hashing
        if (!user.getPassword().equals(loginDTO.getPassword())) {
            return new LoggedUserDTO("", "", RESPONSE_INVALID_PASSWORD);
        }

        if (false) {
            //TODO implement activation logic
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
        //TODO Implement password hashing
        user.setPassword(registerDTO.getPassword());
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
}
