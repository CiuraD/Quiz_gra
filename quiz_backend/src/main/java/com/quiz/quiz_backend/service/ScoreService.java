package com.quiz.quiz_backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.quiz.quiz_backend.dto.ScoreDTO;
import com.quiz.quiz_backend.model.ScoreTable;
import com.quiz.quiz_backend.repository.ScoreTableRepository;
import com.quiz.quiz_backend.repository.UserRepository;

@Service
public class ScoreService {
    @Autowired
    private ScoreTableRepository scoreTableRepository;

    @Autowired
    private UserRepository userRepository;

    private final int MAX_NUMBER_OF_SCORES = 10;

    public List<ScoreDTO> getTopScores() {
        List<ScoreTable> scoreTableList = scoreTableRepository.findAll();
        List<ScoreDTO> scoreDTOList = new ArrayList<>();
        for (ScoreTable scoreTable : scoreTableList) {
            scoreDTOList.add(new ScoreDTO(scoreTable.getUser().getLogin(), scoreTable.getScore()));
        }
        scoreDTOList.sort((a, b) -> b.getScore() - a.getScore());
        scoreDTOList = scoreDTOList.subList(0, MAX_NUMBER_OF_SCORES);
        return scoreDTOList;
    }

    public HttpStatus addScore(ScoreDTO scoreDTO) {
        ScoreTable scoreTable = new ScoreTable();
        scoreTable.setScore(scoreDTO.getScore());
        scoreTable.setUser(userRepository.findByLogin(scoreDTO.getUsername()));
        scoreTableRepository.save(scoreTable);
        return HttpStatus.OK;
    }
}
