package com.quiz.quiz_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.quiz.quiz_backend.model.Question;

@RepositoryRestResource
public interface QuestionRepository extends JpaRepository<Question, Integer>{
    List<Question> findByRoundNumber(int roundNumber);
}
