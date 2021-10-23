package com.rmit.sept.reviewmicroservices.Web;

import com.rmit.sept.reviewmicroservices.Model.Review;
import com.rmit.sept.reviewmicroservices.Repositories.ReviewRepository;
import com.rmit.sept.reviewmicroservices.Services.ReviewService;
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
public class ReviewControllerTest {
    @Autowired
    private ReviewService reviewService;

    @MockBean
    private ReviewRepository reviewRepository;

    @Test
    public void createNewReviewTest() {
        Review testReview = new Review();
        testReview.setId(99L);
        testReview.setISBN("Bn99934");
        testReview.setTitle("Test Review Book");
        testReview.setUsername("test@example.com");
        testReview.setScore(4.5);
        testReview.setDesc("test review text");

        reviewService.saveReview(testReview);
        when(reviewRepository.save(testReview)).thenReturn(testReview);
        assertEquals(testReview, reviewService.saveReview(testReview));
    }

    @Test
    public void findReviewsTest() {
        Review testReview1 = new Review();
        testReview1.setId(99L);
        testReview1.setISBN("Bn99934");
        testReview1.setTitle("Test Review Book");
        testReview1.setUsername("test@example.com");
        testReview1.setScore(4.5);
        testReview1.setDesc("test review text");

        Review testReview2 = new Review();
        testReview2.setId(98L);
        testReview2.setISBN("Bn99934");
        testReview2.setTitle("Test Review Book");
        testReview2.setUsername("test@example.com");
        testReview2.setScore(4.5);
        testReview2.setDesc("test review text");

        when(reviewRepository.findAll()).thenReturn(Stream
                .of(testReview1, testReview2).collect(Collectors.toList()));
        assertEquals(2, reviewService.getReviews().size());
    }
}
