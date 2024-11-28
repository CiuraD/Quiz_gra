package com.quiz.quiz_backend.dto;

public class ScoreDTO {
    String username;
    int score;

    public ScoreDTO(String username, int score) {
        this.username = username;
        this.score = score;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getScore() {
        return this.score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
