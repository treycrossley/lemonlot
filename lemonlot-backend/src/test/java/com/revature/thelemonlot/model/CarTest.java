package com.revature.thelemonlot.model;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;

public class CarTest {

    @Test
    public void testCarGettersAndSetters() {
        // Given
        Car car = new Car();
        car.setId(1);
        car.setMake("Toyota");
        car.setModel("Camry");
        car.setModelYear(2021);
        car.setPrice(24000.00f);
        car.setColor("Blue");
        car.setMileage(15000.0f);
        car.setDescription("A reliable sedan.");
        car.setCreatedAt(LocalDate.now());
        car.setUpdatedAt(LocalDate.now());

        // When
        // Getters are called implicitly through assertions

        // Then
        assertThat(car.getId()).isEqualTo(1);
        assertThat(car.getMake()).isEqualTo("Toyota");
        assertThat(car.getModel()).isEqualTo("Camry");
        assertThat(car.getModelYear()).isEqualTo(2021);
        assertThat(car.getPrice()).isEqualTo(24000.00f);
        assertThat(car.getColor()).isEqualTo("Blue");
        assertThat(car.getMileage()).isEqualTo(15000.0f);
        assertThat(car.getDescription()).isEqualTo("A reliable sedan.");
        assertThat(car.getCreatedAt()).isNotNull();
        assertThat(car.getUpdatedAt()).isNotNull();
    }

    @Test
    public void testCarAllArgsConstructor() {
        // Given
        Car car = new Car(1, "Toyota", "Camry", 2021, 24000.00f, "Blue", 15000.0f, "A reliable sedan.", null,
                LocalDate.now(),
                LocalDate.now());

        // Then
        assertThat(car.getId()).isEqualTo(1);
        assertThat(car.getMake()).isEqualTo("Toyota");
        assertThat(car.getModel()).isEqualTo("Camry");
        assertThat(car.getModelYear()).isEqualTo(2021);
        assertThat(car.getPrice()).isEqualTo(24000.00f);
        assertThat(car.getColor()).isEqualTo("Blue");
        assertThat(car.getMileage()).isEqualTo(15000.0f);
        assertThat(car.getDescription()).isEqualTo("A reliable sedan.");
        assertThat(car.getCreatedAt()).isNotNull();
        assertThat(car.getUpdatedAt()).isNotNull();
    }
}
