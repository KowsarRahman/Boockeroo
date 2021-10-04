package com.rmit.sept.ordermicroservices.Repositories;

import com.rmit.sept.ordermicroservices.Model.Order;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface OrderRepository extends CrudRepository<Order, Long> {
    Order getById(Long Id);
    List<Order> findAllByUsername(String username);
    List<Order> findAllByStatus(String status);
    List<Order> findAllByISBN(String ISBN);
    List<Order> findAllByCreateAt(Date date);

    int removeById(Long id);
}
