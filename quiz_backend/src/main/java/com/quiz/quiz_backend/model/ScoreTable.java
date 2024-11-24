package com.quiz.quiz_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tablica_wynikow")
public class ScoreTable {

    @Id
    @Column(name = "id_wyniku")
    private int scoreId;

    @Column(name = "wynik")
    private int score;

    @ManyToOne
    @JoinColumn(name = "id_uzytkownika", nullable = false)
    private User user;

    public User getUser() {
        return user;
    }

    public int getScoreId() {
        return scoreId;
    }

    public int getScore() {
        return score;
    }

    public void setScoreId(int scoreId) {
        this.scoreId = scoreId;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
