package com.example.project3.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

public class Newsfeed {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String email;
    private String school;
    private int academic;
    private int tuition;
    private int location;
    private String comment;
    private Timestamp create_at;

    public Timestamp getCreate_at() {
        return create_at;
    }

    public void setCreate_at(Timestamp create_at) {
        this.create_at = create_at;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public int getAcademic() {
        return academic;
    }

    public void setAcademic(int academic) {
        this.academic = academic;
    }

    public int getTuition() {
        return tuition;
    }

    public void setTuition(int tuition) {
        this.tuition = tuition;
    }

    public int getLocation() {
        return location;
    }

    public void setLocation(int location) {
        this.location = location;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}

