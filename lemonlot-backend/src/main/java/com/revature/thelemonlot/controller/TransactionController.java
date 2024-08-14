package com.revature.thelemonlot.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.revature.thelemonlot.model.Transaction;
import com.revature.thelemonlot.service.TransactionService;

@RestController
@RequestMapping("/api/Transactions")
public class TransactionController {
    TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public @ResponseBody ResponseEntity<List<Transaction>> findAllTransactions() {
        return ResponseEntity.status(200).body(transactionService.findAllTransaction());
    }

    @GetMapping("/{id}")
    public @ResponseBody ResponseEntity<Transaction> findTransactionById(@PathVariable int id) {
        return ResponseEntity.status(200).body(transactionService.findTransactionById(id));
    }
}
