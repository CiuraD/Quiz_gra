package com.quiz.quiz_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.quiz.quiz_backend.dto.LoginDTO;
import com.quiz.quiz_backend.dto.RegisterDTO;
import com.quiz.quiz_backend.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public String login(LoginDTO loginDTO) {
        //TODO implement login logic
        return "Login successful";
    }

    public HttpStatus register(RegisterDTO registerDTO) {
        //TODO implement register logic
        return HttpStatus.OK;
    }
}
