package com.rmit.sept.booksmicroservices.Web;

import com.rmit.sept.booksmicroservices.Model.Book;
import com.rmit.sept.booksmicroservices.Services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @PostMapping("/addBook")
    public ResponseEntity<Book> createNewBook(@RequestBody Book book) {
        Book book1 = bookService.saveBook(book);
        return new ResponseEntity<Book>(book1, HttpStatus.CREATED);
    }

    @GetMapping("/findBookById/{id}")
    public Book findBookById(@PathVariable long id) {
        return bookService.getBookById(id);
    }

    @PostMapping("/addBooks")
    public ResponseEntity<List<Book>> createNewBooks(@RequestBody List<Book> newBooks) {
        List<Book> newBooks1 = bookService.saveBooks(newBooks);
        return new ResponseEntity<List<Book>>(newBooks1, HttpStatus.CREATED);
    }

    @GetMapping("/findBooks")
    public List<Book> findBooks() {
        return bookService.getBooks();
    }

    @GetMapping("/findBookByISBN/{ISBN}")
    public Book findBookByISBN(@PathVariable String ISBN) {
        return bookService.getBookByISBN(ISBN);
    }

    @GetMapping("/findBookByTitle/{title}")
    public Book findBookByTitle(@PathVariable String title) {
        return bookService.getBookByTitle(title);
    }

    @GetMapping("/findBookByAuthor/{author}")
    public List<Book> findBookByAuthor(@PathVariable String author) {
        return bookService.getBookByAuthor(author);
    }

    @GetMapping("/findBookByCategory/{category}")
    public List<Book> findBookByCategory(@PathVariable String category) {
        return bookService.getBookByCategory(category);
    }

    @DeleteMapping("/deleteByID/{id}")
    public String deleteBookByID(@PathVariable Long id) {
        return bookService.deleteBookByID(id);
    }

    @DeleteMapping("/deleteByISBN/{ISBN}")
    @Transactional
    public String deleteBookByISBN(@PathVariable String ISBN) {
        return bookService.deleteBookByISBN(ISBN);
    }

    @PutMapping("/updateBook")
    public Book updateBook(@RequestBody Book book) {
        return bookService.updateBook(book);
    }

}
