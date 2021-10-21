package com.rmit.sept.ordermicroservices.Services;

import com.rmit.sept.ordermicroservices.Model.Order;
import com.rmit.sept.ordermicroservices.Repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public Order saveOrder(Order newOrder) {
        return orderRepository.save(newOrder);
    }

    public List<Order> saveOrders(Iterable<Order> newOrders) {
        return (List<Order>) orderRepository.saveAll(newOrders);
    }

    public List<Order> getOrders() {
        return (List<Order>) orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.getById(id);
    }

    public List<Order> getOrdersByUsername(String username) {
        return orderRepository.findAllByUsername(username);
    }

    public List<Order> getOrdersByStatus(String status) {
        return orderRepository.findAllByStatus(status);
    }

    public List<Order> getOrdersByISBN(String ISBN) {
        return orderRepository.findAllByISBN(ISBN);
    }

    public List<Order> getOrdersBeforeDate(Date date) {
        return orderRepository.findAllByCreateAtBefore(date);
    }

    public List<Order> getOrdersForRefund(Date date, String username) {
        List<Order> returnList = orderRepository.findAllByCreateAtAfterAndUsernameAndStatus(date, username, "Order Placed");
        returnList.addAll(orderRepository.findAllByCreateAtAfterAndUsernameAndStatus(date, username, "Shipped"));
        return returnList;
    }

    public List<Order> getOrdersBySeller(String seller) {
        return orderRepository.findAllBySeller(seller);
    }

    public List<Order> getOrdersByUsernameAndStatus(String username, String status) {
        return orderRepository.findAllByUsernameAndStatus(username, status);
    }

    public String deleteOrderById(Long id) {
        orderRepository.removeById(id);
        return "Order Removed. ID: " + id;
    }

    public Order updateOrder(Order order) {
        Order existingOrder = orderRepository.getById(order.getId());

        existingOrder.setId(order.getId());
//        existingOrder.setISBN(order.getISBN());
//        existingOrder.setTitle(order.getTitle());
//        existingOrder.setUsername(order.getUsername());
          existingOrder.setStatus(order.getStatus());
//        existingOrder.setPrice(order.getPrice());

        return orderRepository.save(existingOrder);
    }

}
