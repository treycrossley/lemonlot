package com.revature.thelemonlot.Model;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;

import com.revature.thelemonlot.model.Transaction;

public class TransactionTest {

    @Test
    public void testTransactionGettersAndSetters() {
        // Given
        Transaction transaction = new Transaction();
        transaction.setTransaction_id(1);
        transaction.setUser_id(123);
        transaction.setSalesperson_id(456);
        transaction.setCar_id(789);
        transaction.setDate(LocalDate.now());
        transaction.setAmount(15000.00f);
        transaction.setStatus("Completed");
        transaction.setPayment_method("Credit Card");
        transaction.setOffer_amount(14000.00f);
        transaction.setComments("Customer is happy with the purchase.");
        transaction.setCreatedAt(LocalDate.now());
        transaction.setUpdatedAt(LocalDate.now());

        // When
        // Getters are called implicitly through assertions

        // Then
        assertThat(transaction.getTransaction_id()).isEqualTo(1);
        assertThat(transaction.getUser_id()).isEqualTo(123);
        assertThat(transaction.getSalesperson_id()).isEqualTo(456);
        assertThat(transaction.getCar_id()).isEqualTo(789);
        assertThat(transaction.getDate()).isNotNull();
        assertThat(transaction.getAmount()).isEqualTo(15000.00f);
        assertThat(transaction.getStatus()).isEqualTo("Completed");
        assertThat(transaction.getPayment_method()).isEqualTo("Credit Card");
        assertThat(transaction.getOffer_amount()).isEqualTo(14000.00f);
        assertThat(transaction.getComments()).isEqualTo("Customer is happy with the purchase.");
        assertThat(transaction.getCreatedAt()).isNotNull();
        assertThat(transaction.getUpdatedAt()).isNotNull();
    }

    @Test
    public void testTransactionAllArgsConstructor() {
        // Given
        Transaction transaction = new Transaction(1, 123, 456, 789, LocalDate.now(),
                15000.00f, "Completed", "Credit Card", 14000.00f,
                "Customer is happy with the purchase.", LocalDate.now(), LocalDate.now());

        // Then
        assertThat(transaction.getTransaction_id()).isEqualTo(1);
        assertThat(transaction.getUser_id()).isEqualTo(123);
        assertThat(transaction.getSalesperson_id()).isEqualTo(456);
        assertThat(transaction.getCar_id()).isEqualTo(789);
        assertThat(transaction.getDate()).isNotNull();
        assertThat(transaction.getAmount()).isEqualTo(15000.00f);
        assertThat(transaction.getStatus()).isEqualTo("Completed");
        assertThat(transaction.getPayment_method()).isEqualTo("Credit Card");
        assertThat(transaction.getOffer_amount()).isEqualTo(14000.00f);
        assertThat(transaction.getComments()).isEqualTo("Customer is happy with the purchase.");
        assertThat(transaction.getCreatedAt()).isNotNull();
        assertThat(transaction.getUpdatedAt()).isNotNull();
    }
}
