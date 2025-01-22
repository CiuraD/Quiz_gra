package com.quiz.quiz_backend.dto;

public class VerificationDTO {
    private String email;
    private String code;

    public VerificationDTO(String email, String code) {
        this.email = email;
        this.code = code;
    }

    public String getEmail() {
        return this.email;
    }

    public String getVerificationCode() {
        return this.code;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setVerificationCode(String verificationCode) {
        this.code = verificationCode;
    }
}
