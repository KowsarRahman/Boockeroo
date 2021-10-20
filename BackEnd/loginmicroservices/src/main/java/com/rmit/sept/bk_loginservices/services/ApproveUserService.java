package com.rmit.sept.bk_loginservices.services;

import com.rmit.sept.bk_loginservices.Repositories.ApproveUserRepository;
import com.rmit.sept.bk_loginservices.model.ApproveUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApproveUserService {

    @Autowired
    private ApproveUserRepository approveUserRepository;


    //Save the users into this category
    public ApproveUser saveApproveUser(ApproveUser approveUser) {
        return approveUserRepository.save(approveUser);
    }

    //Update
    public ApproveUser updateStatus(ApproveUser approveUser) {
        //Grab the id of that user
        ApproveUser current_user = approveUserRepository.findById(approveUser.getId()).orElse(null);
        return approveUserRepository.save(approveUser);
    }


    public ApproveUser getCustomerById(String customerid) {
        return approveUserRepository.findByCustomerId(customerid);
    }

}
