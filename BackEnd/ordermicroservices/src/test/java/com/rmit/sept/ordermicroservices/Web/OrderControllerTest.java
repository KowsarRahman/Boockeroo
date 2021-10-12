package com.rmit.sept.ordermicroservices.Web;

import com.rmit.sept.ordermicroservices.Model.Order;
import com.rmit.sept.ordermicroservices.Repositories.OrderRepository;
import com.rmit.sept.ordermicroservices.Services.OrderService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class OrderControllerTest {
    @Autowired
    private OrderService orderService;

    @MockBean
    private OrderRepository orderRepository;

    @Test
    public void createNewOrderTest() {
        //Test Order
        Order testOrder = new Order();
        testOrder.setId(999L);
        testOrder.setISBN("Bn99996");
        testOrder.setTitle("Test Book");
        testOrder.setUsername("test@example.com");
        testOrder.setSeller("Test Seller");
        testOrder.setStatus("Testing");
        testOrder.setPrice((float) 999.99);

        orderService.saveOrder(testOrder);
        when(orderRepository.save(testOrder)).thenReturn(testOrder);
        assertEquals(testOrder, orderService.saveOrder(testOrder));
    }

    @Test
    public void findOrdersTest() {
        //Test Order 1
        Order testOrder1 = new Order();
        testOrder1.setId(999L);
        testOrder1.setISBN("Bn99996");
        testOrder1.setTitle("Test Book");
        testOrder1.setUsername("test@example.com");
        testOrder1.setSeller("Test Seller");
        testOrder1.setStatus("Testing");
        testOrder1.setPrice((float) 999.99);

        //Test Order 2
        Order testOrder2 = new Order();
        testOrder2.setId(998L);
        testOrder2.setISBN("Bn99995");
        testOrder2.setTitle("Test Book-2");
        testOrder2.setUsername("test@example.com");
        testOrder2.setSeller("Test Seller");
        testOrder2.setStatus("Testing");
        testOrder2.setPrice((float) 999.99);

        //Test Order 3
        Order testOrder3 = new Order();
        testOrder3.setId(997L);
        testOrder3.setISBN("Bn99994");
        testOrder3.setTitle("Test Book");
        testOrder3.setUsername("test@example.com");
        testOrder3.setSeller("Test Seller");
        testOrder3.setStatus("Testing");
        testOrder3.setPrice((float) 999.99);

        when(orderRepository.findAll()).thenReturn(Stream
                .of(testOrder1, testOrder2, testOrder3).collect(Collectors.toList()));
        assertEquals(3, orderService.getOrders().size());
    }

    @Test
    public void findOrderByIdTest() {
        //Test Order
        Order testOrder = new Order();
        testOrder.setId(999L);
        testOrder.setISBN("Bn99996");
        testOrder.setTitle("Test Book");
        testOrder.setUsername("test@example.com");
        testOrder.setSeller("Test Seller");
        testOrder.setStatus("Testing");
        testOrder.setPrice((float) 999.99);

        when(orderRepository.getById(999L)).thenReturn(testOrder);
        assertEquals(testOrder, orderService.getOrderById(999L));
    }

    @Test
    public void findOrdersByUsername() {
        //Test Order 1
        Order testOrder1 = new Order();
        testOrder1.setId(999L);
        testOrder1.setISBN("Bn99996");
        testOrder1.setTitle("Test Book");
        testOrder1.setUsername("test@example.com");
        testOrder1.setSeller("Test Seller");
        testOrder1.setStatus("Testing");
        testOrder1.setPrice((float) 999.99);

        //Test Order 2
        Order testOrder2 = new Order();
        testOrder2.setId(998L);
        testOrder2.setISBN("Bn99995");
        testOrder2.setTitle("Test Book-2");
        testOrder2.setUsername("test@example.com");
        testOrder2.setSeller("Test Seller");
        testOrder2.setStatus("Testing");
        testOrder2.setPrice((float) 999.99);

        String username = "test@example.com";

        when(orderRepository.findAllByUsername(username)).thenReturn(Stream
                .of(testOrder1, testOrder2).collect(Collectors.toList()));
        assertEquals(2, orderService.getOrdersByUsername(username).size());
    }

    @Test
    public void findOrdersByStatus() {
        //Test Order 1
        Order testOrder1 = new Order();
        testOrder1.setId(999L);
        testOrder1.setISBN("Bn99996");
        testOrder1.setTitle("Test Book");
        testOrder1.setUsername("test@example.com");
        testOrder1.setSeller("Test Seller");
        testOrder1.setStatus("Testing");
        testOrder1.setPrice((float) 999.99);

        //Test Order 2
        Order testOrder2 = new Order();
        testOrder2.setId(998L);
        testOrder2.setISBN("Bn99995");
        testOrder2.setTitle("Test Book-2");
        testOrder2.setUsername("test@example.com");
        testOrder2.setSeller("Test Seller");
        testOrder2.setStatus("Testing");
        testOrder2.setPrice((float) 999.99);

        String status = "Testing";

        when(orderRepository.findAllByStatus(status)).thenReturn(Stream
                .of(testOrder1, testOrder2).collect(Collectors.toList()));
        assertEquals(2, orderService.getOrdersByStatus(status).size());
    }

    @Test
    public void deleteOrderByIdTest() {
        //Test Order 1
        Order testOrder1 = new Order();
        testOrder1.setId(999L);
        testOrder1.setISBN("Bn99996");
        testOrder1.setTitle("Test Book");
        testOrder1.setUsername("test@example.com");
        testOrder1.setSeller("Test Seller");
        testOrder1.setStatus("Testing");
        testOrder1.setPrice((float) 999.99);

        orderService.deleteOrderById(testOrder1.getId());
        verify(orderRepository, times(1)).removeById(testOrder1.getId());
    }

}
