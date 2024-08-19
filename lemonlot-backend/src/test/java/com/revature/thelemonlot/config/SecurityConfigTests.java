package com.revature.thelemonlot.config;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1",
        "spring.datasource.username=sa",
        "spring.datasource.password="
})
public class SecurityConfigTests {

    @Autowired
    private SecurityFilterChain securityFilterChain;

    @Test
    public void testSecurityFilterChainBean() {
        assertNotNull(securityFilterChain, "SecurityFilterChain bean should not be null");
    }
}
