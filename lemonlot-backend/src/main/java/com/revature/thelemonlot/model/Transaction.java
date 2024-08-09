package com.revature.thelemonlot.model;

import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.*;
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
    private int transaction_id;

    @Column(name = "user_id", nullable = false)
    private int user_id;

    @Column(name = "salesperson_id")
    private int salesperson_id;

    @Column(name = "car_id", nullable = false)
    private int car_id;

    @Column(name = "transaction_date", nullable = false)
    private Date date;

    @Column(name = "amount", columnDefinition = "numeric(10,2)", nullable = false)
    private float amount;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "payment_method", nullable = false)
    private String payment_method;

    @Column(name = "offer_amount", columnDefinition = "numeric(10,2)")
    private float offer_amount;

    @Column(name = "comments", nullable = false)
    private String comments;

    @Column(name = "created_at", nullable = false)
    private Date create_at;

    @Column(name = "updated_at", nullable = false)
    private Date updated_at;

}
