package com.quiz.quiz_backend.dto;

public class LoggedUserDTO {
    private String username;
    private String jwtToken;
    private int responseCode;

    public LoggedUserDTO() {
    }

    public LoggedUserDTO(String username, String jwtToken, int responseCode) {
        this.username = username;
        this.jwtToken = jwtToken;
        this.responseCode = responseCode;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getJwtToken() {
        return this.jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public int getResponseCode() {
        return this.responseCode;
    }

    public void setResponseCode(int responseCode) {
        this.responseCode = responseCode;
    }
}
