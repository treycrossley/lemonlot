package com.revature.thelemonlot.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.revature.thelemonlot.dto.UpdateUserRequest;
import com.revature.thelemonlot.model.User;
import com.revature.thelemonlot.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public boolean existsByUsername(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    private void validateRole(String role) {
        // Add your role validation logic here, for example:
        Set<String> validRoles = Set.of("USER", "ADMIN", "SELLER"); // Example valid roles
        if (!validRoles.contains(role)) {
            throw new RuntimeException("Invalid role provided");
        }
    }

    @Transactional
    public User save(User user) {
        if (existsByUsername(user.getUsername())) {
            throw new RuntimeException("User already exists with the provided username.");
        }

        if (user.getRole() == null || user.getRole().trim().isEmpty()) {
            user.setRole("USER"); // Default role
        } else {
            validateRole(user.getRole()); // Validate the role
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User createUser(User user) {
        if (existsByUsername(user.getUsername())) {
            throw new RuntimeException("User already exists with the provided username.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encode the password

        if (user.getRole() == null || user.getRole().trim().isEmpty()) {
            user.setRole("USER"); // Default role
        } else {
            validateRole(user.getRole());
        }

        return userRepository.save(user); // Save the user
    }

    @Transactional
    public User updateUser(int id, UpdateUserRequest updateRequest) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (updateRequest.getOldPassword() != null
                && !passwordEncoder.matches(updateRequest.getOldPassword(), existingUser.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        if (updateRequest.getNewPassword() != null && !updateRequest.getNewPassword().trim().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(updateRequest.getNewPassword()));
        }
        if (updateRequest.getUsername() != null) {
            if (existsByUsername(updateRequest.getUsername())) {
                throw new RuntimeException("Username already in use");
            }
            existingUser.setUsername(updateRequest.getUsername());
        }
        if (updateRequest.getEmail() != null) {
            existingUser.setEmail(updateRequest.getEmail());
        }
        if (updateRequest.getFirstName() != null) {
            existingUser.setFirstName(updateRequest.getFirstName());
        }
        if (updateRequest.getLastName() != null) {
            existingUser.setLastName(updateRequest.getLastName());
        }
        if (updateRequest.getPhoneNumber() != null) {
            existingUser.setPhoneNumber(updateRequest.getPhoneNumber());
        }
        if (updateRequest.getRole() != null && !updateRequest.getRole().trim().isEmpty()) {
            validateRole(updateRequest.getRole()); // Validate the role
            existingUser.setRole(updateRequest.getRole());
        }

        return userRepository.save(existingUser);
    }

    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    @Transactional
    public boolean deleteUser(int id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        return user;
    }
}
