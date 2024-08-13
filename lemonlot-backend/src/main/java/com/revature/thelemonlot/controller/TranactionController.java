package com.revature.thelemonlot.controller;

import com.revature.thelemonlot.model.Transaction;
import com.revature.thelemonlot.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Transactions")
public class TranactionController {
    TransactionService transactionService;
    @Autowired
    public TranactionController(TransactionService transactionService)
    {
        this.transactionService = transactionService;
    }

    @GetMapping
    public @ResponseBody ResponseEntity<List<Transaction>> findAllTransactions()
    {
        return ResponseEntity.status(200).body(transactionService.findAllTransaction());
    }

    @GetMapping("/{id}")
    public @ResponseBody ResponseEntity<Transaction> findTransactionById(@PathVariable int id)
    {
        return ResponseEntity.status(200).body(transactionService.findTransactionById(id));
    }
}
