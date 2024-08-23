package com.revature.thelemonlot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.thelemonlot.model.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {
    List<Car> findByMakeContainingIgnoreCase(String make);
    List<Car> findByModelContainingIgnoreCase(String model);
    List<Car> findByPriceLessThanEqual(double price);
    List<Car> findByPriceBetween(Double minPrice, Double maxPrice);
    List<Car> findByColorContainingIgnoreCase(String color);
    List<Car> findByMakeContainingIgnoreCaseAndModelContainingIgnoreCaseAndPriceBetweenAndColorContainingIgnoreCase(String make, String model, double minPrice, double maxPrice, String color);
}
