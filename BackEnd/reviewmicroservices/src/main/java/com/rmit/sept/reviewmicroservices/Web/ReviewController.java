package com.rmit.sept.reviewmicroservices.Web;

import com.rmit.sept.reviewmicroservices.Model.Review;
import com.rmit.sept.reviewmicroservices.Services.ReviewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/review")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    Logger logger = LoggerFactory.getLogger(ReviewController.class);

    @PostMapping("/addReview")
    public ResponseEntity<Review> createNewReview(@RequestBody Review review) {
        Review newReview = reviewService.saveReview(review);
        logger.trace("Created new review");
        return new ResponseEntity<>(newReview, HttpStatus.CREATED);
    }

    @PostMapping("/addReviews")
    public ResponseEntity<List<Review>> createNewReviews(@RequestBody List<Review> newReviews) {
        List<Review> newReviews1 = reviewService.saveReviews(newReviews);
        logger.trace("Create a list of new reviews");
        return new ResponseEntity<>(newReviews1, HttpStatus.CREATED);
    }

    @GetMapping("/findReviews")
    public List<Review> findReviews() {
        List<Review> returnList = reviewService.getReviews();
        Collections.reverse(returnList);
        logger.trace("Retrieved all reviews");
        return returnList;
    }

    @GetMapping("/findReviewsById/{Id}")
    public Review findReviewsById(@PathVariable Long Id) {
        logger.trace("Retrieved review with id: " + Id);
        return reviewService.getReviewById(Id);
    }

    @GetMapping("/findReviewsByUsername/{username}")
    public List<Review> findReviewsByUsername(@PathVariable String username) {
        List<Review> returnList = reviewService.getReviewsByUsername(username);
        Collections.reverse(returnList);
        logger.trace("Retrieved all reviews by user: " + username);
        return returnList;
    }

    @GetMapping("/findReviewsByISBN/{ISBN}")
    public List<Review> findReviewsByISBN(@PathVariable String ISBN) {
        List<Review> getreviews = reviewService.getReviewsByISBN(ISBN);
        Collections.reverse(getreviews);
        logger.trace("Retrieved all reviews with ISBN: " + ISBN);
        return getreviews;
    }

    @GetMapping("/findReviewsByTitle/{title}")
    public List<Review> findReviewsByTitle(@PathVariable String title) {
        logger.trace("Retrieved all reviews with Title: " + title);
        return reviewService.getReviewsByTitle(title);
    }

    @GetMapping("/findReviewsAboveScore/{ISBN}/{score}")
    public List<Review> findReviewsAboveScore(@PathVariable("ISBN") String ISBN,
                                              @PathVariable("score") double score) {
        logger.trace("Retrieved all reviews with ISBN: " + ISBN + " and score above: " + score);
        return reviewService.getReviewsForBookAboveScore(ISBN, score);
    }

    @DeleteMapping("/deleteById/{id}")
    public String deleteReviewById(@PathVariable Long id) {
        logger.trace("Deleted review with ID: " + id);
        return reviewService.deleteReviewById(id);
    }

    @PutMapping("/updateReview")
    public Review updateReview(@RequestBody Review review) {
        logger.trace("Updated review");
        return reviewService.updateReview(review);
    }
}
