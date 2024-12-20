package com.quiz.quiz_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quiz.quiz_backend.dto.QuestionDTO;
import com.quiz.quiz_backend.service.QuestionService;


@RestController
@RequestMapping("/api/question")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @GetMapping("/{round}")
    public QuestionDTO getRandomQuestion(@PathVariable int round) {
        return questionService.getRandomQuestion(round);
    }
}
