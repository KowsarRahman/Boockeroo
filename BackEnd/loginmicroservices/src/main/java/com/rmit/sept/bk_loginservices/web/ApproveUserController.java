package com.rmit.sept.bk_loginservices.web;


import com.rmit.sept.bk_loginservices.model.ApproveUser;
import com.rmit.sept.bk_loginservices.services.ApproveUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class ApproveUserController {

    @Autowired
    private ApproveUserService approveUserService;

    @PostMapping("/setApproval")
    public ApproveUser addApproval(@RequestBody ApproveUser approveUser) {

        return approveUserService.saveApproveUser(approveUser);
    }

    @GetMapping("/getApproval/{customerId}")
    public ApproveUser getApproval(@PathVariable String customerId) {
        return approveUserService.getCustomerById(customerId);
    }
//
    @PutMapping("/updateApproval/{customerId}")
    public ApproveUser updateApproval(@RequestBody ApproveUser approveUser) {
        return approveUserService.updateStatus(approveUser);
    }


}