package com.rmit.sept.booksmicroservices.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class Book {
    @Id
    @NotBlank(message = "ISBN is required")
    @Column(unique = true)
    private String ISBN;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Author's Name is required")
    private String author;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Condition is required")
    private String condition;

    @NotBlank(message = "Price is required")
    private double price;

    private String storeOwner;

    private Date create_At;
    private Date update_At;

    public Book() {}

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


    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @PrePersist
    protected void onCreate(){
        this.create_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.update_At = new Date();
    }

    public String getStoreOwner() { return storeOwner; }

    public void setStoreOwner(String storeOwner) {
        this.storeOwner = storeOwner;
    }
}
