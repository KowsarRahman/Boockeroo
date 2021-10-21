package com.rmit.sept.booksmicroservices.Services;

import com.rmit.sept.booksmicroservices.Model.Book;
import com.rmit.sept.booksmicroservices.Repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public Book saveBook(Book newBook) {
        return bookRepository.save(newBook);
    }

    public List<Book> saveBooks(Iterable<Book> newBooks) {
        return (List<Book>) bookRepository.saveAll(newBooks);
    }

    public List<Book> getBooks() {

        return (List<Book>) bookRepository.findAll();
    }

    public Book getBookByISBN(String ISBN) {
        return bookRepository.findByISBN(ISBN);
    }

    public Book getBookByTitle(String title) {
        return bookRepository.findByTitle(title);
    }

    public List<Book> getBookByAuthor(String author) {
        return bookRepository.findAllByAuthor(author);
    }

    public List<Book> getBookByCategory(String category) {
        return bookRepository.findAllByCategory(category);
    }

    public Book getBookById(long id) {
        return bookRepository.getById(id);
    }
    public String deleteBookByID(Long id) {
        bookRepository.deleteById(id);
        return "Book removed. ID: " + id;
    }


    public String deleteBookByISBN(String ISBN) {
        bookRepository.deleteByISBN(ISBN);
        return "Book removed. ISBN: " + ISBN;
    }

    public Book updateBook(Book book) {
        Book existingBook = bookRepository.getById(book.getId());

        existingBook.setId(book.getId());
        existingBook.setPrice(book.getPrice());

        return bookRepository.save(existingBook);
    }

    public Book updateStock(Book book) {
        Book existingBook = bookRepository.getById(book.getId());

        existingBook.setStock(book.getStock());
        return bookRepository.save(existingBook);
    }

}
