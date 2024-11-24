package com.quiz.quiz_backend.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "uzytkownik")
public class User {

    @Id
    @Column(name = "id_uzytkownika")
    private int userId;

    @Column(name = "login")
    private String login;

    @Column(name = "haslo")
    private String password;

    @Column(name = "mail")
    private String email;

    @Column(name = "aktywowane")
    private boolean activated;

    @OneToOne
    @JoinColumn(name = "id_uzytkownika")
    private ActivationCode activationCode;

    @OneToMany
    @JoinColumn(name = "id_uzytkownika")
    private List<ScoreTable> scoreTable;

    public int getUserId() {
        return userId;
    }

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public boolean isActivated() {
        return activated;
    }

    public ActivationCode getActivationCode() {
        return activationCode;
    }

    public List<ScoreTable> getScoreTable() {
        return scoreTable;
    }


    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public void setActivationCode(ActivationCode activationCode) {
        this.activationCode = activationCode;
    }

    public void setScoreTable(List<ScoreTable> scoreTable) {
        this.scoreTable = scoreTable;
    }
}
