package com.revature.thelemonlot.model;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;

public class UserTest {

    @Test
    public void testUserGettersAndSetters() {
        // Given
        User user = new User();
        user.setId(1);
        user.setUsername("johndoe");
        user.setPassword("password123");
        user.setEmail("johndoe@example.com");
        user.setRole("Customer");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setPhoneNumber("1234567890");
        user.setAddress("123 Main St, Anytown, USA");
        user.setPreferences("None");

        // Manually set createdAt and updatedAt for testing
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        // When
        // Getters are called implicitly through assertions

        // Then
        assertThat(user.getId()).isEqualTo(1);
        assertThat(user.getUsername()).isEqualTo("johndoe");
        assertThat(user.getPassword()).isEqualTo("password123");
        assertThat(user.getEmail()).isEqualTo("johndoe@example.com");
        assertThat(user.getRole()).isEqualTo("Customer");
        assertThat(user.getFirstName()).isEqualTo("John");
        assertThat(user.getLastName()).isEqualTo("Doe");
        assertThat(user.getPhoneNumber()).isEqualTo("1234567890");
        assertThat(user.getAddress()).isEqualTo("123 Main St, Anytown, USA");
        assertThat(user.getPreferences()).isEqualTo("None");
        assertThat(user.getCreatedAt()).isNotNull();
        assertThat(user.getUpdatedAt()).isNotNull();
    }

    @Test
    public void testUserAllArgsConstructor() {
        // Given
        User user = new User(1, "johndoe", "password123", "johndoe@example.com",
                "Customer", "John", "Doe", "1234567890",
                "123 Main St, Anytown, USA", "None", LocalDateTime.now(), LocalDateTime.now());
        // Then
        assertThat(user.getId()).isEqualTo(1);
        assertThat(user.getUsername()).isEqualTo("johndoe");
        assertThat(user.getPassword()).isEqualTo("password123");
        assertThat(user.getEmail()).isEqualTo("johndoe@example.com");
        assertThat(user.getRole()).isEqualTo("Customer");
        assertThat(user.getFirstName()).isEqualTo("John");
        assertThat(user.getLastName()).isEqualTo("Doe");
        assertThat(user.getPhoneNumber()).isEqualTo("1234567890");
        assertThat(user.getAddress()).isEqualTo("123 Main St, Anytown, USA");
        assertThat(user.getPreferences()).isEqualTo("None");
        assertThat(user.getCreatedAt()).isNotNull();
        assertThat(user.getUpdatedAt()).isNotNull();
    }
}
