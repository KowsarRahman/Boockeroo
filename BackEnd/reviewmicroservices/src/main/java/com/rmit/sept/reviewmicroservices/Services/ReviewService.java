package com.rmit.sept.reviewmicroservices.Services;

import com.rmit.sept.reviewmicroservices.Model.Review;
import com.rmit.sept.reviewmicroservices.Repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public Review saveReview(Review newReview) {
        return reviewRepository.save(newReview);
    }

    public List<Review> saveReviews(Iterable<Review> newReviews) {
        return (List<Review>) reviewRepository.saveAll(newReviews);
    }

    public List<Review> getReviews() {
        return (List<Review>) reviewRepository.findAll();
    }

    public Review getReviewById(Long id) {
        return reviewRepository.getById(id);
    }

    public List<Review> getReviewsByUsername(String username) {
        return reviewRepository.findAllByUsername(username);
    }

    public List<Review> getReviewsByISBN(String ISBN) {
        return reviewRepository.findAllByISBN(ISBN);
    }

    public List<Review> getReviewsByTitle(String title) {
        return reviewRepository.findAllByTitle(title);
    }

    public List<Review> getReviewsForBookAboveScore(String ISBN, double score) {
        return reviewRepository.findAllByISBNAndScoreIsGreaterThanEqual(ISBN, score);
    }

    public String deleteReviewById(Long id) {
        reviewRepository.removeById(id);
        return "Review Removed. ID: " + id;
    }

    public Review updateReview(Review review) {
        Review existingReview = reviewRepository.getById(review.getId());
        existingReview.setId(review.getId());
        existingReview.setUsername(review.getUsername());
        existingReview.setISBN(review.getISBN());
        existingReview.setTitle(review.getTitle());
        existingReview.setScore(review.getScore());
        existingReview.setDesc(review.getDesc());

        return reviewRepository.save(existingReview);
    }

}
