package com.rmit.sept.booksmicroservices.Services;

import com.rmit.sept.booksmicroservices.Model.Book;
import com.rmit.sept.booksmicroservices.Repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public Book saveBook(Book newBook) {

        //business logic
        return bookRepository.save(newBook);
    }

    public Book getBookByISBN(String ISBN) {
        //business logic
        return bookRepository.findByISBN(ISBN);
    }

}
