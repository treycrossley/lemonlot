package com.revature.thelemonlot.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id", updatable = false)
    private int transactionId;

    @Column(name = "user_id", nullable = false)
    private int userId;

    @Column(name = "salesperson_id")
    private int salespersonId;

    @Column(name = "car_id", nullable = false)
    private int carId;

    @Column(name = "transaction_date", nullable = false)
    private LocalDate date;

    @Column(name = "amount", nullable = false)
    private float amount;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "payment_method", nullable = false)
    private String payment_method;

    @Column(name = "comments", nullable = false)
    private String comments;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public void setStatus(String status) {
        this.status = status;
    }

}
