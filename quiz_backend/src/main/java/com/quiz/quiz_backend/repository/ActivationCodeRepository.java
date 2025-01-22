package com.quiz.quiz_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.quiz.quiz_backend.model.ActivationCode;
import com.quiz.quiz_backend.model.User;

@RepositoryRestResource
public interface ActivationCodeRepository extends JpaRepository<ActivationCode, Integer>{
    ActivationCode findByCode(String code);
    ActivationCode findByCodeAndUser(String code, User user);
    ActivationCode findByUser(User user);
}
