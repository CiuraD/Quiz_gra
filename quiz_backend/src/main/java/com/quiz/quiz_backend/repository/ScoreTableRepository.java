package com.quiz.quiz_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.quiz.quiz_backend.model.ScoreTable;

@RepositoryRestResource
public interface ScoreTableRepository extends JpaRepository<ScoreTable, Integer>{
}
