package com.revature.thelemonlot.repository;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.revature.thelemonlot.model.Car;

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
