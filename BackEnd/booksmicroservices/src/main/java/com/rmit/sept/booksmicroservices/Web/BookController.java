package com.rmit.sept.booksmicroservices.Web;

import com.rmit.sept.booksmicroservices.Model.Book;
import com.rmit.sept.booksmicroservices.Services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @PostMapping("/addBook")
    public ResponseEntity<Book> createNewBook(@RequestBody Book book) {
        Book book1 = bookService.saveBook(book);
        return new ResponseEntity<Book>(book1, HttpStatus.CREATED);
    }

    @GetMapping("/findBookByISBN/{ISBN}")
    public Book findBookByISBN(@PathVariable String ISBN) {
        return bookService.getBookByISBN(ISBN);
    }
}
