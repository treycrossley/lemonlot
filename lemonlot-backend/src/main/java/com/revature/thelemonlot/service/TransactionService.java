package com.revature.thelemonlot.service;


import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.revature.thelemonlot.model.Transaction;
import com.revature.thelemonlot.repository.TransactionRepository;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    public TransactionService(TransactionRepository transactionRepository)
    {
        this.transactionRepository = transactionRepository;
    }

    public Transaction findTransactionById(int transactionId)
    {
        Optional<Transaction> optionalTransactions = transactionRepository.findById(transactionId);
        if(optionalTransactions.isPresent())
        {
            return optionalTransactions.get();
        }
        return null;
    }

    public List<Transaction> findAllTransaction()
    {
        return transactionRepository.findAll();
    }

    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public void updateTransaction(Transaction transaction, int id) {
        Optional<Transaction> optionalTransaction = transactionRepository.findById(id);
        if (optionalTransaction.isPresent()) {
            Transaction existingTransaction = optionalTransaction.get();

            // Update all fields of the existing transaction
            existingTransaction.setCarId(transaction.getCarId());
            existingTransaction.setDate(transaction.getDate());
            existingTransaction.setAmount(transaction.getAmount());
            existingTransaction.setStatus(transaction.getStatus());
            existingTransaction.setPayment_method(transaction.getPayment_method());
            existingTransaction.setComments(transaction.getComments());
            existingTransaction.setUpdatedAt(transaction.getUpdatedAt());

            // Save the updated transaction
            transactionRepository.save(existingTransaction);
        } else {
            throw new RuntimeException("Transaction not found");
        }
    }

    public Transaction updateTransactionStatus(int id, String status) {
        Optional<Transaction> optionalTransaction = transactionRepository.findById(id);
        if (optionalTransaction.isPresent()) {
            Transaction transaction = optionalTransaction.get();
            transaction.setStatus(status);
            return transactionRepository.save(transaction);
        } else {
            throw new RuntimeException("Transaction not found");
        }
    }

    public Integer deleteTransactionByID(int id)
    {
        Optional<Transaction> optionalTransaction = transactionRepository.findById(id);
        if(optionalTransaction.isPresent())
        {
            transactionRepository.delete(optionalTransaction.get());
            return 1;
        }
        return null;
    }
    
}

