package com.revature.thelemonlot.dto;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

public class LoginRequestTest {

    private final ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    private final Validator validator = factory.getValidator();

    @Test
    void testDefaultConstructor() {
        LoginRequest loginRequest = new LoginRequest();
        assertNotNull(loginRequest);
    }

    @Test
    void testParameterizedConstructor() {
        LoginRequest loginRequest = new LoginRequest("user", "password123");
        assertEquals("user", loginRequest.getUsername());
        assertEquals("password123", loginRequest.getPassword());
    }

    @Test
    void testGettersAndSetters() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("user");
        loginRequest.setPassword("password123");

        assertEquals("user", loginRequest.getUsername());
        assertEquals("password123", loginRequest.getPassword());
    }

    @Test
    void testValidationSuccess() {
        LoginRequest loginRequest = new LoginRequest("user", "password123");
        Set<ConstraintViolation<LoginRequest>> violations = validator.validate(loginRequest);
        assertEquals(0, violations.size(), "There should be no validation errors.");
    }

    @Test
    public void testLoginRequestValidation() {
        LoginRequest loginRequest = new LoginRequest("", "short");
        Set<ConstraintViolation<LoginRequest>> violations = validator.validate(loginRequest);

        // Expected: 2 violations (username and password)
        assertEquals(3, violations.size(), "There should be validation errors.");

        // Flags to check if all expected violations are present
        boolean usernameBlankErrorFound = false;
        boolean usernameLengthErrorFound = false;
        boolean passwordLengthErrorFound = false;

        for (ConstraintViolation<LoginRequest> violation : violations) {
            if (violation.getPropertyPath().toString().equals("username")) {
                if (violation.getMessage().equals("Username cannot be blank")) {
                    usernameBlankErrorFound = true;
                } else if (violation.getMessage().equals("Username must be between 2 and 50 characters")) {
                    usernameLengthErrorFound = true;
                }
            } else if (violation.getPropertyPath().toString().equals("password")) {
                if (violation.getMessage().equals("Password must be at least 8 characters long")) {
                    passwordLengthErrorFound = true;
                }
            }
        }

        // Ensure all expected errors were found
        assertTrue(usernameBlankErrorFound, "Username blank error should be present.");
        assertTrue(passwordLengthErrorFound, "Password length error should be present.");
        assertTrue(usernameLengthErrorFound, "Username length error should be present with empty username.");
    }

    @Test
    void testToString() {
        LoginRequest loginRequest = new LoginRequest("user", "password123");
        String expected = "LoginRequest{username='user', password='password123'}";
        assertEquals(expected, loginRequest.toString());
    }
}
