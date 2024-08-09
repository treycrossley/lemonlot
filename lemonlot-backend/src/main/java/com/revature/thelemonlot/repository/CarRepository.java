package com.revature.thelemonlot.repository;

import com.revature.thelemonlot.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {
    List<Car> findByMake(String make);
    List<Car> findByMakeAndModel(String make, String model);
}
