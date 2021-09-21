package com.rmit.sept.booksmicroservices.Repositories;

import com.rmit.sept.booksmicroservices.Model.Book;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookRepository extends CrudRepository<Book, Long> {
    Book findByISBN(String ISBN);
    Book findByTitle(String title);
    int deleteByISBN(String ISBN);
    Iterable<Book> findByAuthorContaining(String author);
    Iterable<Book> findAllByCategory(String category);
    List<Book> findByISBNContaining(String isbn);

    Book getById(Long id);
}
