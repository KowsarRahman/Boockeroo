package com.rmit.sept.booksmicroservices.Repositories;

import com.rmit.sept.booksmicroservices.Model.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book, Long> {
    Book findByISBN(String ISBN);
    Book findByTitle(String title);
    int deleteByISBN(String ISBN);
    Iterable<Book> findAllByAuthor(String author);
    Iterable<Book> findAllByCategory(String category);

    Book getById(Long id);
}
