package com.rmit.sept.bk_loginservices.web;

import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.services.UserService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;

@SpringBootTest
public class UserControllerTest {
    @Autowired
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    @BeforeEach
    public void setUp() {

        //Test User 1
        User testUser1 = new User();
        testUser1.setId(9999L);
        testUser1.setUsername("example1@gmail.com");
        testUser1.setFullName("Example Name");
        testUser1.setPassword("password1");
        testUser1.setConfirmPassword("password1");
        testUser1.setRole("tester");

        //Test User 2
        User testUser2 = new User();
        testUser1.setId(9998L);
        testUser1.setUsername("example2@gmail.com");
        testUser1.setFullName("Example Name");
        testUser1.setPassword("password1");
        testUser1.setConfirmPassword("password1");
        testUser1.setRole("tester");

        //Test User 3
        User testUser3 = new User();
        testUser1.setId(9997L);
        testUser1.setUsername("example3@gmail.com");
        testUser1.setFullName("Example Name");
        testUser1.setPassword("password1");
        testUser1.setConfirmPassword("password1");
        testUser1.setRole("tester");

        userRepository.save(testUser1);
        userRepository.save(testUser2);
        userRepository.save(testUser3);
    }

    //Testing adding new user
    @Test
    public void addNewUserTest() {
        //Test User 1
        User testUser1 = new User();
        testUser1.setId(9999L);
        testUser1.setUsername("example1@gmail.com");
        testUser1.setFullName("Example Name");
        testUser1.setPassword("password1");
        testUser1.setConfirmPassword("password1");
        testUser1.setRole("tester");

        userService.saveUser(testUser1);
        when(userRepository.save(testUser1)).thenReturn(testUser1);
        assertEquals(testUser1, userService.saveUser(testUser1));
    }

    //Testing getting user
    @Test
    public void getUserTest() {
        //Test User 1
        User testUser1 = new User();
        testUser1.setId(9999L);
        testUser1.setUsername("example1@gmail.com");
        testUser1.setFullName("Example Name");
        testUser1.setPassword("password1");
        testUser1.setConfirmPassword("password1");
        testUser1.setRole("tester");

        when(userRepository.getById(9999L)).thenReturn(testUser1);
        Assert.assertEquals(testUser1, userService.getUserById(9999L));
    }
}
