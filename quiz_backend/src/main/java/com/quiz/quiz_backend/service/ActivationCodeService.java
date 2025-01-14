package com.quiz.quiz_backend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quiz.quiz_backend.model.ActivationCode;
import com.quiz.quiz_backend.model.User;
import com.quiz.quiz_backend.repository.ActivationCodeRepository;

@Service
public class ActivationCodeService {

    @Autowired
    private ActivationCodeRepository activationCodeRepository;

    private String GenerateUniqueActivationCode() {
        String code = String.valueOf((int) (Math.random() * 9000) + 1000);

        while (activationCodeRepository.findByCode(code) != null) {
            code = String.valueOf((int) (Math.random() * 9000) + 1000);
        }
        return code;
    }

    public void createActivationCode(User user) {
        String code = GenerateUniqueActivationCode();

        ActivationCode activationCode = new ActivationCode();
        activationCode.setCode(code);
        activationCode.setUser(user);

        activationCodeRepository.save(activationCode);
    }

    public boolean isActivationCodeCorrect(String code, User user) {
        ActivationCode activationCode = activationCodeRepository.findByCodeAndUser(code, user);
        return activationCode != null;
    }

    public String getActivationCodeForUser(User user) {
        ActivationCode activationCode = activationCodeRepository.findByUser(user);
        return activationCode.getCode();
    }
}
