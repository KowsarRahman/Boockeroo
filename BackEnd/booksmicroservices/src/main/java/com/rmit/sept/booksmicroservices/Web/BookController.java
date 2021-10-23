package com.rmit.sept.booksmicroservices.Web;

import com.opencsv.CSVWriter;
import com.rmit.sept.booksmicroservices.Model.Book;
import com.rmit.sept.booksmicroservices.Services.BookService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookService bookService;

    Logger logger = LoggerFactory.getLogger(BookController.class);

    @PostMapping("/addBook")
    public ResponseEntity<Book> createNewBook(@RequestBody Book book) {
        Book book1 = bookService.saveBook(book);
        logger.trace("Added new book");
        return new ResponseEntity<>(book1, HttpStatus.CREATED);
    }

    @GetMapping("/findBookById/{id}")
    public Book findBookById(@PathVariable long id) {
        logger.trace("Retrieved book with ID: " + id);
        return bookService.getBookById(id);
    }

    @PostMapping("/addBooks")
    public ResponseEntity<List<Book>> createNewBooks(@RequestBody List<Book> newBooks) {
        List<Book> newBooks1 = bookService.saveBooks(newBooks);
        logger.trace("Added new list of books");
        return new ResponseEntity<>(newBooks1, HttpStatus.CREATED);
    }

    @GetMapping("/findBooks")
    public List<Book> findBooks() {
        logger.trace("Retrieved all books");
        return bookService.getBooks();
    }

    @GetMapping("/findBookByISBN/{ISBN}")
    public Book findBookByISBN(@PathVariable String ISBN) {
        logger.trace("Retrieved book with ISBN: " + ISBN);
        return bookService.getBookByISBN(ISBN);
    }

    @GetMapping("/findBookByTitle/{title}")
    public Book findBookByTitle(@PathVariable String title) {
        logger.trace("Retrieved book with title: " + title);
        return bookService.getBookByTitle(title);
    }

    @GetMapping("/findBookByAuthor/{author}")
    public List<Book> findBookByAuthor(@PathVariable String author) {
        logger.trace("Retrieved book by author: " + author);
        return bookService.getBookByAuthor(author);
    }

    @GetMapping("/findBookByCategory/{category}")
    public List<Book> findBookByCategory(@PathVariable String category) {
        logger.trace("Retrieved book in genre: " + category);
        return bookService.getBookByCategory(category);
    }

    @DeleteMapping("/deleteByID/{id}")
    public String deleteBookByID(@PathVariable Long id) {
        logger.trace("Deleted book by id: " + id);
        return bookService.deleteBookByID(id);
    }

    @DeleteMapping("/deleteByISBN/{ISBN}")
    @Transactional
    public String deleteBookByISBN(@PathVariable String ISBN) {
        logger.trace("Deleted book by ISBN: " + ISBN);
        return bookService.deleteBookByISBN(ISBN);
    }

    @PutMapping("/updateBook")
    public Book updateBook(@RequestBody Book book) {
        logger.trace("Updated book");
        return bookService.updateBook(book);
    }

    @PutMapping("/updateStock")
    public Book updateStock(@RequestBody Book book) {
        logger.trace("Updated stock");
        return bookService.updateStock(book);
    }

    @PostMapping("/createReport")
    public ResponseEntity createReport() {
        File file = new File("Book Report.csv");

        try {
            FileWriter outputFile = new FileWriter(file);
            CSVWriter writer = new CSVWriter(outputFile);

            List<Book> books = bookService.getBooks();
            List<String[]> dataList = new ArrayList<>();

            dataList.add(new String[] {"ID", "ISBN", "Title", "Author", "Category", "Store Owner", "Condition", "Page" +
                    " Count", "Price", "PayPal ID", "Stock"});

            for (Book book : books) {
                String[] data = {
                        String.valueOf(book.getId()),
                        book.getISBN(),
                        book.getTitle(),
                        book.getAuthor(),
                        book.getGenre(),
                        book.getStoreOwnerID(),
                        book.getCondition(),
                        String.valueOf(book.getPageCount()),
                        String.valueOf(book.getPrice()),
                        book.getPaypal_id(),
                        book.getStock()
                };
                dataList.add(data);
            }

            writer.writeAll(dataList);
            writer.close();

            logger.trace("Created Report");
            return new ResponseEntity(HttpStatus.CREATED);
        } catch (IOException e) {
            e.printStackTrace();
            logger.error("Failed to create report");
            return new ResponseEntity(HttpStatus.BAD_GATEWAY);
        }
    }
}
