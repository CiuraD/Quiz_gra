package com.quiz.quiz_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.quiz.quiz_backend.model.User;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender emailSender;

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }

    public void sendActivationMessage(User user, String activationCode) {
        String subject = "Quiz App - Account Activation";
        String text = "Your activation code is: " + activationCode;
        sendSimpleMessage(user.getEmail(), subject, text);
    }
}
