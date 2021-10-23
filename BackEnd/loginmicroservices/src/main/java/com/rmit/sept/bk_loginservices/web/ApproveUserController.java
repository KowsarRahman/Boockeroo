package com.rmit.sept.bk_loginservices.web;


import com.rmit.sept.bk_loginservices.model.ApproveUser;
import com.rmit.sept.bk_loginservices.services.ApproveUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class ApproveUserController {

    @Autowired
    private ApproveUserService approveUserService;

    Logger logger = LoggerFactory.getLogger(ApproveUserController.class);

    @PostMapping("/setApproval")
    public ApproveUser addApproval(@RequestBody ApproveUser approveUser) {
        logger.trace("Approved User");
        return approveUserService.saveApproveUser(approveUser);
    }

    @GetMapping("/getApproval/{customerId}")
    public ApproveUser getApproval(@PathVariable String customerId) {
        logger.trace("Checked approval of user");
        return approveUserService.getCustomerById(customerId);
    }

    @GetMapping("/getApprovals/")
    public List<ApproveUser> getApprovals() {
        logger.trace("Retrieved approval");
        return approveUserService.getAllApplications();
    }
//
    @PutMapping("/updateApproval")
    public ApproveUser updateApproval(@RequestBody ApproveUser approveUser) {
        logger.trace("Updated approval");
        return approveUserService.updateStatus(approveUser);
    }


}
