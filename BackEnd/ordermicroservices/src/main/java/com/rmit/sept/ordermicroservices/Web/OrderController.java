package com.rmit.sept.ordermicroservices.Web;

import com.opencsv.CSVWriter;
import com.rmit.sept.ordermicroservices.Model.Order;
import com.rmit.sept.ordermicroservices.Services.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    Logger logger = LoggerFactory.getLogger(OrderController.class);

    @PostMapping("/addOrder")
    public ResponseEntity<Order> createNewBook(@RequestBody Order order) {
        Order order1 = orderService.saveOrder(order);
        logger.trace("Added new order");
        return new ResponseEntity<>(order1, HttpStatus.CREATED);
    }

    @PostMapping("/addOrders")
    public ResponseEntity<List<Order>> createNewBooks(@RequestBody List<Order> newOrders) {
        List<Order> newOrders1 = orderService.saveOrders(newOrders);
        logger.trace("Added a list of orders");
        return new ResponseEntity<>(newOrders1, HttpStatus.CREATED);
    }

    @GetMapping("/findOrders")
    public List<Order> findOrders() {
        List<Order> returnList = orderService.getOrders();
        Collections.reverse(returnList);
        logger.trace("Retrieved all orders");
        return returnList;
    }

    @GetMapping("/findOrdersById/{Id}")
    public Order findOrdersById(@PathVariable Long Id) {
        return orderService.getOrderById(Id);
    }

    @GetMapping("/findOrdersByUsername/{username}")
    public List<Order> findOrdersByUsername(@PathVariable String username) {
        List<Order> returnList = orderService.getOrdersByUsername(username);
        Collections.reverse(returnList);
        logger.trace("Retrieved orders by user: " + username);
        return returnList;
    }

    @GetMapping("/findOrdersByStatus/{status}")
    public List<Order> findOrdersByStatus(@PathVariable String status) {
        logger.trace("Retrieved orders with status: " + status);
        return orderService.getOrdersByStatus(status);
    }

    @GetMapping("/findOrdersByISBN/{ISBN}")
    public List<Order> findOrdersByISBN(@PathVariable String ISBN) {
        logger.trace("Retrieved orders with ISBN: " + ISBN);
        return orderService.getOrdersByISBN(ISBN);
    }

    @GetMapping("/findOrdersBeforeDate/{date}")
    public List<Order> findOrdersByDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        logger.trace("Retrieved orders by date: " + date);
        return orderService.getOrdersBeforeDate(date);
    }

    @GetMapping("/findOrdersForRefund/{username}")
    public List<Order> findOrdersForRefund(@PathVariable String username) {
        Calendar c = Calendar.getInstance();
        Date referenceDate = new Date();
        c.setTime(referenceDate);
        c.add(Calendar.HOUR, -2);
        Date date = c.getTime();

        List<Order> returnList = orderService.getOrdersForRefund(date, username);
        Collections.reverse(returnList);
        logger.trace("Retrieved orders that are available for refund: " + date);
        return returnList;
    }

    @GetMapping("/createReport")
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
                Date orderDate = new Date(orders.get(i).getCreateAt().getTime());
                String[] data = {
                        String.valueOf(orders.get(i).getId()),
                        orders.get(i).getISBN(),
                        ft.format(orderDate),
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

            //Downloading the file
            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition",
                    String.format("attachment; filename=\"%s\"", file.getName()));
            headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
            headers.add("Pragma", "no-cache");
            headers.add("Expires", "0");

            ResponseEntity<Object> responseEntity = ResponseEntity.ok().headers(headers)
                    .contentLength(file.length())
                    .contentType(MediaType.parseMediaType("application/txt")).body(resource);

            logger.trace("Transaction Report created");
            return responseEntity;

        } catch (IOException e) {
            e.printStackTrace();
            logger.error("Transaction Report failed to create");
            return new ResponseEntity(HttpStatus.BAD_GATEWAY);
        }
    }

    @GetMapping("/findOrdersBySeller/{seller}")
    public List<Order> findOrdersBySeller(@PathVariable String seller) {
        logger.trace("Retrieved orders by seller: " + seller);
        List<Order> getOrderBySeller = orderService.getOrdersBySeller(seller);
        Collections.reverse(getOrderBySeller);
        return getOrderBySeller;
    }

    @GetMapping("/findOrdersByUsernameAndStatus/{username}/{status}")
    public List<Order> findOrdersByUsernameAndStatus(@PathVariable("username") String username,
                                                     @PathVariable("status") String status) {
        logger.trace("Retrieved orders by username and status: " + username + ", " + status);
        return orderService.getOrdersByUsernameAndStatus(username, status);
    }

    @DeleteMapping("/deleteById/{Id}")
    public String deleteOrderById(@PathVariable Long Id) {
        logger.trace("Deleted order: " + Id);
        return orderService.deleteOrderById(Id);
    }

    @PutMapping("/updateOrder")
    public Order updateOrder(@RequestBody Order order) {
        logger.trace("Updated order");
        return orderService.updateOrder(order);
    }

}
