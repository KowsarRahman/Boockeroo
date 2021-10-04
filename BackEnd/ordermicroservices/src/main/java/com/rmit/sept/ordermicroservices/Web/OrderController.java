package com.rmit.sept.ordermicroservices.Web;

import com.rmit.sept.ordermicroservices.Model.Order;
import com.rmit.sept.ordermicroservices.Services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/Order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/addOrder")
    public ResponseEntity<Order> createNewBook(@RequestBody Order order) {
        Order order1 = orderService.saveOrder(order);
        return new ResponseEntity<Order>(order1, HttpStatus.CREATED);
    }

    @PostMapping("/addOrders")
    public ResponseEntity<List<Order>> createNewBooks(@RequestBody List<Order> newOrders) {
        List<Order> newOrders1 = orderService.saveOrders(newOrders);
        return new ResponseEntity<>(newOrders1, HttpStatus.CREATED);
    }

    @GetMapping("/findOrders")
    public List<Order> findOrders() {
        return orderService.getOrders();
    }

    @GetMapping("/findOrdersById/{Id}")
    public Order findOrdersById(@PathVariable Long Id) {
        return orderService.getOrderById(Id);
    }

    @GetMapping("/findOrdersByUsername/{username}")
    public List<Order> findOrdersByUsername(@PathVariable String username) {
        return orderService.getOrdersByUsername(username);
    }

    @GetMapping("/findOrdersByStatus/{status}")
    public List<Order> findOrdersByStatus(@PathVariable String status) {
        return orderService.getOrdersByStatus(status);
    }

    @GetMapping("/findOrdersByISBN/{ISBN}")
    public List<Order> findOrdersByISBN(@PathVariable String ISBN) {
        return orderService.getOrdersByISBN(ISBN);
    }

//    @GetMapping("/findOrdersByDate/{date}")
//    public List<Order> findOrdersByDate(@PathVariable Date date) {
//        return orderService.getOrdersByDate(date);
//    }

    @DeleteMapping("/deleteById/{Id}")
    public String deleteOrderById(@PathVariable Long Id) {
        return orderService.deleteOrderById(Id);
    }

    @PutMapping("/updateOrder")
    public Order updateOrder(@RequestBody Order order) {
        return orderService.updateOrder(order);
    }

}
