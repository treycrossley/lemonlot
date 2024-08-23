package com.revature.thelemonlot.repository;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class CarRepositoryTest {

    @Autowired
    private CarRepository carRepository;

    @BeforeEach
    public void setUp() {
        // Clear the repository before each test
        carRepository.deleteAll();
    }
}
