package com.rmit.sept.booksmicroservices.Web;

import com.rmit.sept.booksmicroservices.Model.Book;
import com.rmit.sept.booksmicroservices.Repositories.BookRepository;
import com.rmit.sept.booksmicroservices.Services.BookService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;


@RunWith(SpringRunner.class)
@SpringBootTest
public class BookControllerTest {

    @Autowired
    private BookService bookService;

    @MockBean
    private BookRepository bookRepository;


    @Test
    public void createNewBookTest() {
        Book testBook4 = new Book();
        testBook4.setId(9997L);
        testBook4.setISBN("Bn99996");
        testBook4.setTitle("Test Book-4");
        testBook4.setAuthor("Author Test2");
        testBook4.setGenre("Test2");
        testBook4.setPrice("9999.99");
        testBook4.setPageCount(99999);
        testBook4.setStoreOwnerID("Test Owner");
        testBook4.setImageLink("testLink");

        bookService.saveBook(testBook4);
        when(bookRepository.save(testBook4)).thenReturn(testBook4);
        assertEquals(testBook4, bookService.saveBook(testBook4));
    }

    @Test
    public void findBooksTest() {
        //Test Book 1
        Book testBook1 = new Book();
        testBook1.setId(9999L);
        testBook1.setISBN("Bn99999");
        testBook1.setTitle("Test Book-1");
        testBook1.setAuthor("Author Test");
        testBook1.setGenre("Test");
        testBook1.setPrice("9999.99");
        testBook1.setPageCount(99999);
        testBook1.setStoreOwnerID("Test Owner");
        testBook1.setImageLink("testLink");

        //Test Book 2
        Book testBook2 = new Book();
        testBook2.setId(9998L);
        testBook2.setISBN("Bn99998");
        testBook2.setTitle("Test Book-2");
        testBook2.setAuthor("Author Test");
        testBook2.setGenre("Test");
        testBook2.setPrice("9999.99");
        testBook2.setPageCount(99999);
        testBook2.setStoreOwnerID("Test Owner");
        testBook2.setImageLink("testLink");

        //Test Book 3
        Book testBook3 = new Book();
        testBook2.setId(9997L);
        testBook2.setISBN("Bn99997");
        testBook2.setTitle("Test Book-3");
        testBook2.setAuthor("Author Test2");
        testBook2.setGenre("Test2");
        testBook2.setPrice("9999.99");
        testBook2.setPageCount(99999);
        testBook2.setStoreOwnerID("Test Owner");
        testBook2.setImageLink("testLink");

        when (bookRepository.findAll()).thenReturn(Stream
                .of(testBook1, testBook2, testBook3).collect(Collectors.toList()));
        assertEquals(3, bookService.getBooks().size());

    }

    @Test
    public void findBooksByCategoryTest() {
        //Test Book 1
        Book testBook1 = new Book();
        testBook1.setId(9999L);
        testBook1.setISBN("Bn99999");
        testBook1.setTitle("Test Book-1");
        testBook1.setAuthor("Author Test");
        testBook1.setGenre("Test");
        testBook1.setPrice("9999.99");
        testBook1.setPageCount(99999);
        testBook1.setStoreOwnerID("Test Owner");
        testBook1.setImageLink("testLink");

        //Test Book 2
        Book testBook2 = new Book();
        testBook2.setId(9998L);
        testBook2.setISBN("Bn99998");
        testBook2.setTitle("Test Book-2");
        testBook2.setAuthor("Author Test");
        testBook2.setGenre("Test");
        testBook2.setPrice("9999.99");
        testBook2.setPageCount(99999);
        testBook2.setStoreOwnerID("Test Owner");
        testBook2.setImageLink("testLink");

        String category = "Test";

        when(bookRepository.findAllByGenre(category)).thenReturn(Stream
                .of(testBook1, testBook2).collect(Collectors.toList()));
        assertEquals(2, bookService.getBookByCategory(category).size());
    }

    @Test
    public void findBooksByAuthorTest() {

        //Test Book 1
        Book testBook1 = new Book();
        testBook1.setId(9999L);
        testBook1.setISBN("Bn99999");
        testBook1.setTitle("Test Book-1");
        testBook1.setAuthor("Author Test");
        testBook1.setGenre("Test");
        testBook1.setPrice("9999.99");
        testBook1.setPageCount(99999);
        testBook1.setStoreOwnerID("Test Owner");
        testBook1.setImageLink("testLink");

        //Test Book 2
        Book testBook2 = new Book();
        testBook2.setId(9998L);
        testBook2.setISBN("Bn99998");
        testBook2.setTitle("Test Book-2");
        testBook2.setAuthor("Author Test");
        testBook2.setGenre("Test");
        testBook2.setPrice("9999.99");
        testBook2.setPageCount(99999);
        testBook2.setStoreOwnerID("Test Owner");
        testBook2.setImageLink("testLink");

        String author = "Author Test";

        when(bookRepository.findAllByGenre(author)).thenReturn(Stream
                .of(testBook1, testBook2).collect(Collectors.toList()));
        assertEquals(2, bookService.getBookByCategory(author).size());
    }

    @Test
    public void findBookByTitleTest() {
        //Test Book 1
        Book testBook1 = new Book();
        testBook1.setId(9999L);
        testBook1.setISBN("Bn99999");
        testBook1.setTitle("Test Book-1");
        testBook1.setAuthor("Author Test");
        testBook1.setGenre("Test");
        testBook1.setPrice("9999.99");
        testBook1.setPageCount(99999);
        testBook1.setStoreOwnerID("Test Owner");
        testBook1.setImageLink("testLink");

        String title = "Test Book-1";

        when(bookRepository.findByTitle(title)).thenReturn(testBook1);
        assertEquals(testBook1, bookService.getBookByTitle(title));
    }

    @Test
    public void findBookByISBNTest() {
        //Test Book 1
        Book testBook1 = new Book();
        testBook1.setId(9999L);
        testBook1.setISBN("Bn99999");
        testBook1.setTitle("Test Book-1");
        testBook1.setAuthor("Author Test");
        testBook1.setGenre("Test");
        testBook1.setPrice("9999.99");
        testBook1.setPageCount(99999);
        testBook1.setStoreOwnerID("Test Owner");
        testBook1.setImageLink("testLink");

        when(bookRepository.findByISBN("Bn99999")).thenReturn(testBook1);
        assertEquals(testBook1, bookService.getBookByISBN("Bn99999"));

    }

    @Test
    public void deleteByIdTest() {
        //Test Book 1
        Book testBook1 = new Book();
        testBook1.setId(9999L);
        testBook1.setISBN("Bn99999");
        testBook1.setTitle("Test Book-1");
        testBook1.setAuthor("Author Test");
        testBook1.setGenre("Test");
        testBook1.setPrice("9999.99");
        testBook1.setPageCount(99999);
        testBook1.setStoreOwnerID("Test Owner");
        testBook1.setImageLink("testLink");

        bookService.deleteBookByID(testBook1.getId());
        verify(bookRepository, times(1)).deleteById(testBook1.getId());
    }

}
