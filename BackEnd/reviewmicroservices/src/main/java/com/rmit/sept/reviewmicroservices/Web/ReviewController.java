package com.rmit.sept.reviewmicroservices.Web;

import com.rmit.sept.reviewmicroservices.Model.Review;
import com.rmit.sept.reviewmicroservices.Services.ReviewService;
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

    @PostMapping("/addReview")
    public ResponseEntity<Review> createNewReview(@RequestBody Review review) {
        Review newReview = reviewService.saveReview(review);
        return new ResponseEntity<>(newReview, HttpStatus.CREATED);
    }

    @PostMapping("/addReviews")
    public ResponseEntity<List<Review>> createNewReviews(@RequestBody List<Review> newReviews) {
        List<Review> newReviews1 = reviewService.saveReviews(newReviews);
        return new ResponseEntity<>(newReviews1, HttpStatus.CREATED);
    }

    @GetMapping("/findReviews")
    public List<Review> findReviews() {
        List<Review> returnList = reviewService.getReviews();
        Collections.reverse(returnList);
        return returnList;
    }

    @GetMapping("/findReviewsById/{Id}")
    public Review findReviewsById(@PathVariable Long Id) {
        return reviewService.getReviewById(Id);
    }

    @GetMapping("/findReviewsByUsername/{username}")
    public List<Review> findReviewsByUsername(@PathVariable String username) {
        List<Review> returnList = reviewService.getReviewsByUsername(username);
        Collections.reverse(returnList);
        return returnList;
    }

    @GetMapping("/findReviewsByISBN/{ISBN}")
    public List<Review> findReviewsByISBN(@PathVariable String ISBN) {
        List<Review> getreviews = reviewService.getReviewsByISBN(ISBN);
        Collections.reverse(getreviews);
        return getreviews;
    }

    @GetMapping("/findReviewsByTitle/{title}")
    public List<Review> findReviewsByTitle(@PathVariable String title) {
        return reviewService.getReviewsByTitle(title);
    }

    @GetMapping("/findReviewsAboveScore/{ISBN}/{score}")
    public List<Review> findReviewsAboveScore(@PathVariable("ISBN") String ISBN,
                                              @PathVariable("score") double score) {
        return reviewService.getReviewsForBookAboveScore(ISBN, score);
    }

    @DeleteMapping("/deleteById/{id}")
    public String deleteReviewById(@PathVariable Long id) {
        return reviewService.deleteReviewById(id);
    }

    @PutMapping("/updateReview")
    public Review updateReview(@RequestBody Review review) {
        return reviewService.updateReview(review);
    }
}
