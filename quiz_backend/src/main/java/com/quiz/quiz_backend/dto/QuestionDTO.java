package com.quiz.quiz_backend.dto;

public class QuestionDTO {
    private String questionContent;
    private String answer_a;
    private String answer_b;
    private String answer_c;
    private String answer_d;
    private String correctAnswer;

    public QuestionDTO(String questionContent, String answer_a, String answer_b, String answer_c, String answer_d, String correctAnswer) {
        this.questionContent = questionContent;
        this.answer_a = answer_a;
        this.answer_b = answer_b;
        this.answer_c = answer_c;
        this.answer_d = answer_d;
        this.correctAnswer = correctAnswer;
    }

    public String getQuestionContent() {
        return this.questionContent;
    }

    public void setQuestionContent(String questionContent) {
        this.questionContent = questionContent;
    }

    public String getAnswer_a() {
        return this.answer_a;
    }

    public void setAnswer_a(String answer_a) {
        this.answer_a = answer_a;
    }

    public String getAnswer_b() {
        return this.answer_b;
    }

    public void setAnswer_b(String answer_b) {
        this.answer_b = answer_b;
    }

    public String getAnswer_c() {
        return this.answer_c;
    }

    public void setAnswer_c(String answer_c) {
        this.answer_c = answer_c;
    }

    public String getAnswer_d() {
        return this.answer_d;
    }

    public void setAnswer_d(String answer_d) {
        this.answer_d = answer_d;
    }

    public String getCorrectAnswer() {
        return this.correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }
}
