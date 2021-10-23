package com.rmit.sept.booksmicroservices.Repositories;

import com.rmit.sept.booksmicroservices.Model.Book;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookRepository extends CrudRepository<Book, Long> {
    Book findByISBN(String ISBN);
    Book findByTitle(String title);
    int deleteByISBN(String ISBN);
    List<Book> findAllByAuthor(String author);
    List<Book> findAllByGenre(String genre);

    Book getById(Long id);
}

