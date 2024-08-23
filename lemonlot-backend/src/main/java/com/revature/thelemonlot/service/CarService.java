package com.revature.thelemonlot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.thelemonlot.model.Car;
import com.revature.thelemonlot.repository.CarRepository;

@Service
public class CarService {
    @Autowired
    private CarRepository carRepository;

    public List<Car> getAllCars() { 
        return carRepository.findAll();
    }

    public List<Car> getByMake(String make) {
        return carRepository.findByMakeContainingIgnoreCase(make);
    }

    public List<Car> getByModel(String model) {
        return carRepository.findByModelContainingIgnoreCase(model);
    }

    public List<Car> getByPriceLessThanEqual(double price) {
        return carRepository.findByPriceLessThanEqual(price);
    }

    public List<Car> getByColor(String color) {
        return carRepository.findByColorContainingIgnoreCase(color);
    }

    public List<Car> searchCars(String make, String model, double minPrice, double maxPrice, String color) {
        return carRepository.findByMakeContainingIgnoreCaseAndModelContainingIgnoreCaseAndPriceBetweenAndColorContainingIgnoreCase(
                make, model, minPrice, maxPrice, color);
    }
}
