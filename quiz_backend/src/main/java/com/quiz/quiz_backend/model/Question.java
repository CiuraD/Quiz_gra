package com.quiz.quiz_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "pytania")
public class Question {

    @Id
    @Column(name = "id_pytania")
    private int id;

    @Column(name = "tresc")
    private String content;

    @Column(name = "odpowiedz_a")
    private String answerA;

    @Column(name = "odpowiedz_b")
    private String answerB;

    @Column(name = "odpowiedz_c")
    private String answerC;

    @Column(name = "odpowiedz_d")
    private String answerD;

    @Column(name = "prawidlowa")
    private String correctAnswer;

    @Column(name = "numer_rundy")
    private int roundNumber;

    public int getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public String getAnswerA() {
        return answerA;
    }

    public String getAnswerB() {
        return answerB;
    }

    public String getAnswerC() {
        return answerC;
    }

    public String getAnswerD() {
        return answerD;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public int getRoundNumber() {
        return roundNumber;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setAnswerA(String answerA) {
        this.answerA = answerA;
    }

    public void setAnswerB(String answerB) {
        this.answerB = answerB;
    }

    public void setAnswerC(String answerC) {
        this.answerC = answerC;
    }

    public void setAnswerD(String answerD) {
        this.answerD = answerD;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public void setRoundNumber(int roundNumber) {
        this.roundNumber = roundNumber;
    }
}
