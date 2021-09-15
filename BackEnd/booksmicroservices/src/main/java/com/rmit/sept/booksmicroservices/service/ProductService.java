package com.rmit.sept.booksmicroservices.service;

import com.rmit.sept.booksmicroservices.model.Book;
import com.rmit.sept.booksmicroservices.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    @Autowired
    private BookRepository bookRepository;

    public Book saveBook (Book newBook) {
        //business logic
        return bookRepository.save(newBook);
    }
}
