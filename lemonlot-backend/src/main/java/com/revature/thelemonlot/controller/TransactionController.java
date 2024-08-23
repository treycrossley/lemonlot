package com.revature.thelemonlot.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.revature.thelemonlot.model.Transaction;
import com.revature.thelemonlot.service.TransactionService;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        return transactionService.createTransaction(transaction);
    }

    @GetMapping
    public @ResponseBody ResponseEntity<List<Transaction>> findAllTransactions() {
        return ResponseEntity.status(200).body(transactionService.findAllTransaction());
    }

    @GetMapping("/{id}")
    public @ResponseBody ResponseEntity<Transaction> findTransactionById(@PathVariable int id) {
        return ResponseEntity.status(200).body(transactionService.findTransactionById(id));
    }

    @PutMapping("/update/{id}")
    public @ResponseBody ResponseEntity<Integer> updateTransaction(@RequestBody Transaction transaction, @PathVariable int id)
    {
        transactionService.updateTransaction(transaction, id);
        return ResponseEntity.status(200).body(1);
    }

    @PatchMapping("/{id}")
    public @ResponseBody ResponseEntity<Transaction> updateTransactionStatus(
            @PathVariable int id,
            @RequestBody Map<String, Object> updates) {
        // Extract status from the request body
        String status = (String) updates.get("status");

        // Ensure status is not null
        if (status == null) {
            return ResponseEntity.badRequest().build();
        }

        // Update the transaction status
        Transaction updatedTransaction = transactionService.updateTransactionStatus(id, status);
        return ResponseEntity.status(200).body(updatedTransaction);
    }

    @DeleteMapping("/{id}")
    public @ResponseBody ResponseEntity<Integer> deleteTransaction(@PathVariable int id)
    {
        return ResponseEntity.status(200).body(transactionService.deleteTransactionByID(id));
    }
}
