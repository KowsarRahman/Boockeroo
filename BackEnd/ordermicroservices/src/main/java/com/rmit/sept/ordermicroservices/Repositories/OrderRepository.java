package com.rmit.sept.ordermicroservices.Repositories;

import com.rmit.sept.ordermicroservices.Model.Order;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface OrderRepository extends CrudRepository<Order, Long> {
    Order getById(Long Id);
    List<Order> findAllByUsername(String username);
    List<Order> findAllByStatus(String status);
    List<Order> findAllByUsernameAndStatus(String username, String status);
    List<Order> findAllBySeller(String seller);
    List<Order> findAllByISBN(String ISBN);
    List<Order> findAllByCreateAtBefore(Date date);
    List<Order> findAllByCreateAtAfterAndUsernameAndStatus(Date date, String username, String status);
    int removeById(Long id);
}
