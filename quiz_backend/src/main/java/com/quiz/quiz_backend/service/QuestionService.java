package com.quiz.quiz_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quiz.quiz_backend.dto.QuestionDTO;
import com.quiz.quiz_backend.model.Question;
import com.quiz.quiz_backend.repository.QuestionRepository;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    public QuestionDTO getRandomQuestion(int round) {
        List<Question> questions = questionRepository.findByRoundNumber(round);
        if (questions.isEmpty()) {
            return null;
        }
        Question randomQuestion = questions.get((int) (Math.random() * questions.size()));
        return new QuestionDTO(
            randomQuestion.getContent(),
            randomQuestion.getAnswerA(),
            randomQuestion.getAnswerB(),
            randomQuestion.getAnswerC(),
            randomQuestion.getAnswerD(),
            randomQuestion.getCorrectAnswer()
        );
    }
}
