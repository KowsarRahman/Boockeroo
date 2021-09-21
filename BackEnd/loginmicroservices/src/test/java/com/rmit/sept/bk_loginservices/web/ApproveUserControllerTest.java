package com.rmit.sept.bk_loginservices.web;

import com.rmit.sept.bk_loginservices.Repositories.ApproveUserRepository;
import com.rmit.sept.bk_loginservices.model.ApproveUser;
import com.rmit.sept.bk_loginservices.services.ApproveUserService;
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
public class ApproveUserControllerTest {

    @Autowired
    private ApproveUserRepository approveUserRepository;

    @MockBean
    public ApproveUserService approveUserService;

    @Test
    public void setApprovalTest() {
        //Test ApprovalUser 1
        ApproveUser testApproveUser1 = new ApproveUser();
        testApproveUser1.setId(9999L);
        testApproveUser1.setCustomerId("Test-Cus-ID");
        testApproveUser1.setStatus("no");

        approveUserService.saveApproveUser(testApproveUser1);
        when(approveUserRepository.save(testApproveUser1)).thenReturn(testApproveUser1);
        assertEquals(testApproveUser1, approveUserService.saveApproveUser(testApproveUser1));
    }

    @Test
    public void updateApprovalTest() {
        //Test ApprovalUser 1
        ApproveUser testApproveUser1 = new ApproveUser();
        testApproveUser1.setId(9999L);
        testApproveUser1.setCustomerId("Test-Cus-ID");
        testApproveUser1.setStatus("no");

        approveUserService.updateStatus(testApproveUser1);
        when(approveUserRepository.save(testApproveUser1)).thenReturn(testApproveUser1);
        assertEquals(testApproveUser1, approveUserService.updateStatus(testApproveUser1));

    }
}