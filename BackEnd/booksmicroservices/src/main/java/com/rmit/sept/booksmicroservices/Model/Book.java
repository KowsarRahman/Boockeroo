package com.rmit.sept.booksmicroservices.Model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.persistence.GenerationType;
import java.util.Date;

@Entity
@Table(name = "BOOK_TBL")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "ISBN is required")
    @Column(unique = true)
    private String ISBN;

    @NotBlank(message = "Title is required")
    @Column(unique = true)
    private String title;

    @NotBlank(message = "Author's name is required")
    private String author;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Condition is required")
    private String condition;

    @NotBlank(message = "Price is required")
    private double price;

    @NotBlank(message = "Page Count is required")
    private int pageCount;

    @NotBlank(message = "Store Owner is required")
    private String storeOwnerID;

    private String imageLink;

    private Date create_at;
    private Date update_at;

    public Book() {}

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

    public String getStoreOwnerID() {
        return storeOwnerID;
    }

    public void setStoreOwnerID(String storeOwner) {
        this.storeOwnerID = storeOwner;
    }

    public Date getCreate_At() {
        return create_at;
    }

    public void setCreate_At(Date create_At) {
        this.create_at = create_At;
    }

    public Date getUpdate_At() {
        return update_at;
    }

    public void setUpdate_At(Date update_At) {
        this.update_at = update_At;
    }

    public int getPageCount() {
        return pageCount;
    }

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
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
