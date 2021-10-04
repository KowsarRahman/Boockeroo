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
    private Date createAt;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date updateAt;

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

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date create_at) {
        this.createAt = create_at;
    }

    public Date getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Date update_at) {
        this.updateAt = update_at;
    }

    @PrePersist
    protected void onCreate() {
        this.createAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updateAt = new Date();
    }
}
