package com.revature.thelemonlot.repository;

import com.revature.thelemonlot.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    // You can define additional query methods here if needed
}

