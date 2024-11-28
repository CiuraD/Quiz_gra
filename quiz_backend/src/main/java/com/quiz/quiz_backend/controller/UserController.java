package com.quiz.quiz_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.quiz.quiz_backend.dto.LoginDTO;
import com.quiz.quiz_backend.dto.RegisterDTO;
import com.quiz.quiz_backend.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserService userService;
    
    @GetMapping("login")
    @ResponseBody
    public String login(@RequestParam LoginDTO loginDTO) {
        //return userService.Login(loginDTO);
        return userService.login(loginDTO);
    }

    @PostMapping("register")
    public HttpStatus register(@RequestBody RegisterDTO registerDTO) {
        //TODO: process POST request
        
        return HttpStatus.OK;
    }

    @PutMapping("activate/{userId}")
    public HttpStatus putMethodName(@PathVariable String userId, @RequestBody String activationCode) {
        //TODO: process PUT request
        
        return HttpStatus.OK;
    }
}
