package com.rmit.sept.reviewmicroservices.Model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Table(name = "review_tbl")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Username is Required")
    private String username;

    @NotBlank(message = "ISBN is Required")
    private String ISBN;

    @NotBlank(message = "Title is Required")
    private String title;

    @NotBlank(message = "Score is Required")
    private double score;

    @NotBlank(message = "Description is Required")
    private String desc;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date createAt;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date updateAt;

    public Review() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getISBN() {
        return ISBN;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }


    @PrePersist
    protected void onCreate() {
        this.createAt = new Date();
    }

    public Date getCreateAt() {
        return createAt;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updateAt = new Date();
    }

    public Date getUpdateAt() {
        return updateAt;
    }
}
