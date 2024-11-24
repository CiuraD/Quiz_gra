package com.quiz.quiz_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "kody_aktywacyjne")
public class ActivationCode {

    @Id
    @Column(name = "id_kodu")
    private int codeId;

    @Column(name = "kod")
    private String code;

    @OneToOne
    @JoinColumn(name = "id_uzytkownika")
    private User user;

    public int getCodeId() {
        return codeId;
    }

    public String getCode() {
        return code;
    }

    public User getUser() {
        return user;
    }

    public void setCodeId(int codeId) {
        this.codeId = codeId;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
