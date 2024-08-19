package com.revature.thelemonlot.service;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.revature.thelemonlot.model.User;
import com.revature.thelemonlot.repository.UserRepository;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testExistsByUsername_UserExists() {
        String username = "testuser";
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(createUser(username)));

        assertTrue(userService.existsByUsername(username));
    }

    @Test
    void testExistsByUsername_UserDoesNotExist() {
        String username = "nonexistentuser";
        when(userRepository.findByUsername(username)).thenReturn(Optional.empty());

        assertFalse(userService.existsByUsername(username));
    }

    @Test
    void testSave_UserAlreadyExists() {
        String username = "existinguser";
        User user = createUser(username);

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));

        RuntimeException thrown = assertThrows(RuntimeException.class, () -> userService.save(user));
        assertEquals("User already exists with the provided username.", thrown.getMessage());
    }

    @Test
    void testSave_UserSavedSuccessfully() {
        User user = new User();
        user.setUsername("newuser");
        user.setPassword("password");

        when(userRepository.findByUsername("newuser")).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenReturn(user);

        User savedUser = userService.save(user);
        assertNotNull(savedUser);
        assertEquals("newuser", savedUser.getUsername());
    }

    @Test
    void testGetUserById_UserExists() {
        int userId = 1;
        User user = createUser("user");
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        Optional<User> result = userService.getUserById(userId);
        assertTrue(result.isPresent());
        assertEquals(user, result.get());
    }

    @Test
    void testGetUserById_UserDoesNotExist() {
        int userId = 999;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        Optional<User> result = userService.getUserById(userId);
        assertFalse(result.isPresent());
    }

    @Test
    void testLoadUserByUsername_UserFound() {
        String username = "testuser";
        User user = createUser(username);
        user.setPassword("encodedpassword");

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));

        UserDetails userDetails = userService.loadUserByUsername(username);
        assertNotNull(userDetails);
        assertEquals(username, userDetails.getUsername());
        assertEquals("encodedpassword", userDetails.getPassword());
        assertTrue(userDetails.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("USER")));
    }

    @Test
    void testLoadUserByUsername_UserNotFound() {
        String username = "unknownuser";

        when(userRepository.findByUsername(username)).thenReturn(Optional.empty());

        UsernameNotFoundException thrown = assertThrows(UsernameNotFoundException.class,
                () -> userService.loadUserByUsername(username));
        assertEquals("User not found with username: " + username, thrown.getMessage());
    }

    private User createUser(String username) {
        User user = new User();
        user.setUsername(username);
        user.setPassword("encodedpassword"); // Set default password
        user.setRole("USER"); // Default role
        return user;
    }
}
