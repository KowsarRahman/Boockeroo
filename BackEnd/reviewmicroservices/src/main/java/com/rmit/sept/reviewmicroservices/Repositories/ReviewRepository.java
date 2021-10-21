package com.rmit.sept.reviewmicroservices.Repositories;

import com.rmit.sept.reviewmicroservices.Model.Review;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReviewRepository extends CrudRepository<Review, Long> {
    Review getById(Long Id);
    List<Review> findAllByUsername(String username);
    List<Review> findAllByISBN(String ISBN);
    List<Review> findAllByTitle(String title);
    List<Review> findAllByISBNAndScoreIsGreaterThanEqual(String ISBN, double score);
    int removeById(Long id);
}
