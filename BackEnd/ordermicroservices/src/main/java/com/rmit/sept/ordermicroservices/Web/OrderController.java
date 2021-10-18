package com.rmit.sept.ordermicroservices.Web;

import com.opencsv.CSVWriter;
import com.rmit.sept.ordermicroservices.Model.Order;
import com.rmit.sept.ordermicroservices.Services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/order")
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

    @GetMapping("/findOrdersBeforeDate/{date}")
    public List<Order> findOrdersByDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return orderService.getOrdersBeforeDate(date);
    }

    @GetMapping("/findOrdersForRefund/{username}")
    public List<Order> findOrdersForRefund(@PathVariable String username) {
        Calendar c = Calendar.getInstance();
        Date referenceDate = new Date();
        c.setTime(referenceDate);
        c.add(Calendar.MONTH, -2);
        Date date = c.getTime();

        return orderService.getOrdersForRefund(date, username);
    }

    @PostMapping("/createReport")
    public ResponseEntity createReport() {
        File file = new File("Transaction Report.csv");

        try {
            FileWriter outputFile = new FileWriter(file);
            CSVWriter writer = new CSVWriter(outputFile);

            List<Order> orders = orderService.getOrders();
            List<String[]> dataList = new ArrayList<>();

            dataList.add(new String[] {"ID", "ISBN", "Date", "Price", "Status", "Title", "Username", "Seller"});
            for (int i = 0; i < orders.size(); i++) {
                SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd");
                String[] data = {
                        String.valueOf(orders.get(i).getId()),
                        orders.get(i).getISBN(),
                        ft.format(orders.get(i).getCreateAt()),
                        String.valueOf(orders.get(i).getPrice()),
                        orders.get(i).getStatus(),
                        orders.get(i).getTitle(),
                        orders.get(i).getUsername(),
                        orders.get(i).getSeller()
                };
                dataList.add(data);
            }

            writer.writeAll(dataList);

            writer.close();
            return new ResponseEntity(HttpStatus.CREATED);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.BAD_GATEWAY);
        }
    }

    @GetMapping("/findOrdersBySeller/{seller}")
    public List<Order> findOrdersBySeller(@PathVariable String seller) {
        return orderService.getOrdersBySeller(seller);
    }

    @GetMapping("/findOrdersByUsernameAndStatus/{username}/{status}")
    public List<Order> findOrdersByUsernameAndStatus(@PathVariable("username") String username,
                                                     @PathVariable("status") String status) {
        return orderService.getOrdersByUsernameAndStatus(username, status);
    }

    @DeleteMapping("/deleteById/{Id}")
    public String deleteOrderById(@PathVariable Long Id) {
        return orderService.deleteOrderById(Id);
    }

    @PutMapping("/updateOrder")
    public Order updateOrder(@RequestBody Order order) {
        return orderService.updateOrder(order);
    }

}
