package com.revature.thelemonlot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.thelemonlot.model.Car;
import com.revature.thelemonlot.service.CarService;

@RestController
@RequestMapping("/api/Cars")
public class CarController {

    @Autowired
    private CarService carService;

    // Get all Cars
    @GetMapping
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }
}
