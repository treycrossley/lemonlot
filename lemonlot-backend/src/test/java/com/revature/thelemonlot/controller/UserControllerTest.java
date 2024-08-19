package com.revature.thelemonlot.controller;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.thelemonlot.model.User;
import com.revature.thelemonlot.service.UserService;
import com.revature.thelemonlot.util.JwtUtil;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

        @InjectMocks
        private UserController userController;

        @Mock
        private UserService userService;
        @Mock
        private JwtUtil jwtUtil;
        @Mock
        private BCryptPasswordEncoder passwordEncoder;

        private User user;
        private MockMvc mockMvc;
        private ObjectMapper objectMapper;

        @BeforeEach
        public void setUp() {
                user = new User();
                user.setUsername("john.doe");
                user.setPassword("password123");
                user.setEmail("johndoe@example.com");
                user.setRole("USER");
                user.setFirstName("John");
                user.setLastName("Doe");
                user.setPhoneNumber("1234567890");

                objectMapper = new ObjectMapper();
                mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
        }

        @Test
        void testGetAllUsers() throws Exception {
                // Arrange
                List<User> users = List.of(
                                new User(1, "john.doe", "password123", "johndoe@example.com", "USER", "John", "Doe",
                                                "1234567890", null,
                                                null, null, null),
                                new User(2, "jane.doe", "password123", "janedoe@example.com", "USER", "Jane", "Doe",
                                                "0987654321", null,
                                                null, null, null));
                Mockito.when(userService.getAllUsers()).thenReturn(users);

                ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.get("/api/users"));

                // Assert
                resultActions.andExpect(status().isOk())
                                .andExpect(content().json(objectMapper.writeValueAsString(users)));
        }

        @Test
        void testRegisterUser_Success() throws Exception {
                // Arrange
                String userJson = objectMapper.writeValueAsString(user);

                Mockito.when(userService.existsByUsername(user.getUsername())).thenReturn(false);
                Mockito.when(userService.save(user)).thenReturn(user);

                ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.post("/api/users/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(userJson));

                // Assert
                resultActions.andExpect(status().isCreated())
                                .andExpect(content().json(userJson));
        }

        @Test
        void testRegisterUser_UserAlreadyExists() throws Exception {
                // Arrange
                String userJson = objectMapper.writeValueAsString(user);

                Mockito.when(userService.existsByUsername(user.getUsername())).thenReturn(true);

                ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.post("/api/users/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(userJson));

                // Assert
                resultActions.andExpect(status().isConflict())
                                .andExpect(content().string("User already exists: john.doe"));
        }

        @Test
        void testRegisterUser_BadRequest() throws Exception {
                // Arrange
                User invalidUser = new User(); // Assuming no username, email, etc.
                String invalidUserJson = objectMapper.writeValueAsString(invalidUser);

                ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.post("/api/users/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(invalidUserJson));

                // Assert
                resultActions.andExpect(status().isBadRequest());

                // TODO Add more assertions to check the response body
        }

        @Test
        void testLoginUser_Success() throws Exception {
                // Arrange
                String userJson = objectMapper.writeValueAsString(user);
                String token = "mocked_token";
                String rawPassword = "password123"; // This is the password provided in the test

                // Mock the UserService to return the user when loading by username
                when(userService.loadUserByUsername("john.doe")).thenReturn(user);

                // Mock the PasswordEncoder to return true when passwords match
                when(passwordEncoder.matches(rawPassword, user.getPassword())).thenReturn(true);

                // Mock the JWT utility to return a sample token
                when(jwtUtil.generateToken("john.doe", "USER")).thenReturn(token);

                ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.post("/api/users/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(userJson));

                // Assert
                resultActions.andExpect(status().isOk())
                                .andExpect(jsonPath("$.accessToken").value("Bearer " + token))
                                .andExpect(jsonPath("$.tokenType").value("Bearer"));
        }

        @Test
        void testLoginUser_InvalidUsername() throws Exception {
                // Arrange
                String userJson = objectMapper.writeValueAsString(user);

                // Mock the UserService to throw UsernameNotFoundException when the user is not
                // found
                when(userService.loadUserByUsername("john.doe"))
                                .thenThrow(new UsernameNotFoundException("User not found with username: john.doe"));

                ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.post("/api/users/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(userJson));

                // Assert
                resultActions.andExpect(status().isUnauthorized())
                                .andExpect(jsonPath("$.message").value("Invalid username or password"));
        }

        @Test
        void testLoginUser_InvalidPassword() throws Exception {
                // Arrange
                String rawPassword = "wrongpassword"; // This is the incorrect password provided in the test
                User userWithWrongPassword = new User();
                userWithWrongPassword.setUsername("john.doe");
                userWithWrongPassword.setPassword(rawPassword);

                // Mock the UserService to return the user with the correct username
                when(userService.loadUserByUsername("john.doe")).thenReturn(user);

                // Mock the PasswordEncoder to return false when the password does not match
                when(passwordEncoder.matches(rawPassword, user.getPassword())).thenReturn(false);

                ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.post("/api/users/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(userWithWrongPassword)));

                // Assert
                resultActions.andExpect(status().isUnauthorized())
                                .andExpect(jsonPath("$.message").value("Invalid username or password"));
        }

}