package com.rmit.sept.ordermicroservices.Model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;


@Entity
@Table(name = "ORDER_TBL")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "ISBN is Required")
    private String ISBN;

    @NotBlank(message = "Title is Required")
    private String title;

    @NotBlank(message = "Username is Required")
    private String username;

    @NotBlank(message = "Status is required")
    private String status;

    @NotBlank(message = "Price is required")
    private float price;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date create_at;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date update_at;

    public Order() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public Date getCreate_at() {
        return create_at;
    }

    public void setCreate_at(Date create_at) {
        this.create_at = create_at;
    }

    public Date getUpdate_at() {
        return update_at;
    }

    public void setUpdate_at(Date update_at) {
        this.update_at = update_at;
    }

    @PrePersist
    protected void onCreate() {
        this.create_at = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.update_at = new Date();
    }
}
