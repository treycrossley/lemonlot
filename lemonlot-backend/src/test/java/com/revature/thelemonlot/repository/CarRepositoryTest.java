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

    @Test
    public void testFindByMake() {
        // Given
        Car car1 = new Car(0, "Toyota", "Camry", 2020, 24000.00f, "Blue", 15000, "Available", 10, null, null, null,
                null);
        Car car2 = new Car(0, "Toyota", "Corolla", 2021, 22000.00f, "Red", 10000, "Available", 5, null, null, null,
                null);
        Car car3 = new Car(0, "Honda", "Civic", 2019, 21000.00f, "Black", 20000, "Available", 8, null, null, null,
                null);

        carRepository.save(car1);
        carRepository.save(car2);
        carRepository.save(car3);

        // When
        List<Car> toyotaCars = carRepository.findByMake("Toyota");

        // Then
        assertThat(toyotaCars).hasSize(2);
        assertThat(toyotaCars).extracting(Car::getModel).containsExactlyInAnyOrder("Camry", "Corolla");
    }

    @Test
    public void testFindByMakeAndModel() {
        // Given
        Car car1 = new Car(0, "Toyota", "Camry", 2020, 24000.00f, "Blue", 15000, "Available", 10, null, null, null,
                null);
        Car car2 = new Car(0, "Toyota", "Corolla", 2021, 22000.00f, "Red", 10000, "Available", 5, null, null, null,
                null);

        carRepository.save(car1);
        carRepository.save(car2);

        // When
        List<Car> camryCars = carRepository.findByMakeAndModel("Toyota", "Camry");

        // Then
        assertThat(camryCars).hasSize(1);
        assertThat(camryCars.get(0).getModel()).isEqualTo("Camry");
    }
}
