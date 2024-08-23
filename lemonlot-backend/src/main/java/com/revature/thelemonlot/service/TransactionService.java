package com.revature.thelemonlot.service;


import com.revature.thelemonlot.model.Transaction;
import com.revature.thelemonlot.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    private TransactionRepository transactionRepository;
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

    public void updateTransaction(Transaction transaction, int id)
    {
        Optional<Transaction> optionalTransaction = transactionRepository.findById(id);
        if(optionalTransaction.isPresent())
        {
            Transaction temp = optionalTransaction.get();
            temp = transaction;
            transactionRepository.save(temp);
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

