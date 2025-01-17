package com.quiz.quiz_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.quiz.quiz_backend.dto.LoggedUserDTO;
import com.quiz.quiz_backend.dto.LoginDTO;
import com.quiz.quiz_backend.dto.RegisterDTO;
import com.quiz.quiz_backend.dto.VerificationDTO;
import com.quiz.quiz_backend.service.UserService;


@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserService userService;
    
    @PostMapping("login")
    @ResponseBody
    public LoggedUserDTO login(@RequestBody LoginDTO loginDTO) {
        return userService.login(loginDTO);
    }

    @PostMapping("register")
    public ResponseEntity<Void> register(@RequestBody RegisterDTO registerDTO) {
        HttpStatus status = userService.register(registerDTO);
        return new ResponseEntity<>(status);
    }

    @PutMapping("activate")
    public ResponseEntity<Void> activateUser(@RequestBody VerificationDTO verificationDTO) {
        HttpStatus status = userService.activateUser(verificationDTO);
        return new ResponseEntity<>(status);
    }

    @GetMapping("activate/{userMail}")
    public ResponseEntity<Void> reSendActivationCode(@PathVariable String userMail) {
        HttpStatus status = userService.sendActivationCode(userMail);
        return new ResponseEntity<>(status);
    }
}
