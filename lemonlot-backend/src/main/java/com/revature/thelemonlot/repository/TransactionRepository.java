package com.revature.thelemonlot.repository;


import com.revature.thelemonlot.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    public List<Transaction> findByUserId(int userId);
    public List<Transaction> findBySalespersonId(int salespersonId);
    public List<Transaction> findByCarId(int carId);
    public List<Transaction> findByTransactionDate(LocalDate date);
    public List<Transaction> findByAmount(double amount);
    public List<Transaction> findByStatus(String status);
    public List<Transaction> findByPaymentMethod(String paymentMethod);
    public List<Transaction> findByOfferAmount(double offerAmount);
    public List<Transaction> findByCreatedAt(LocalDate createdAt);
    public List<Transaction> findByUpdatedAt(LocalDate updatedAt);

}
