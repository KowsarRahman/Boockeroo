package com.rmit.sept.bk_loginservices.Repositories;

import com.rmit.sept.bk_loginservices.model.ApproveUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApproveUserRepository extends CrudRepository<ApproveUser, Long> {
    ApproveUser findById(long id);
    //ApproveUser findByCustomerId(String customer_id);
    ApproveUser findByCustomerId(String customerId);
}
