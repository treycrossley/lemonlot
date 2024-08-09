package com.revature.thelemonlot.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "Transaction")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id", updatable = false)
    private int transaction_id;

    @Column(name = "user_id", nullable = false)
    private int user_id;

    @Column(name = "salesperson_id")
    private int salesperson_id;

    @Column(name = "car_id", nullable = false)
    private int car_id;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "amount", nullable = false)
    private double amount;

    @Column(name = "status",  nullable = false)
    private String status;

    @Column(name = "payment_method", nullable = false)
    private String payment_method;

    @Column(name = "offer_amount")
    private double offer_amount;

    @Column(name = "comments", nullable = false)
    private String comments;

    @Column(name = "create_at", nullable = false)
    private LocalDate create_at;

    @Column(name = "updated_at", nullable = false)
    private LocalDate updated_at;

}
