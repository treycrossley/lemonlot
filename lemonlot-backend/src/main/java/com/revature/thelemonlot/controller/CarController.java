package com.revature.thelemonlot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.revature.thelemonlot.model.Car;
import com.revature.thelemonlot.service.CarService;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    @Autowired
    private CarService carService;

    // Get all Cars
    @GetMapping
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    @GetMapping("/make/{make}")
    public List<Car> getCarsByMake(@PathVariable String make) {
        return carService.getByMake(make);
    }

    @GetMapping("/model/{model}")
    public List<Car> getCarsByModel(@PathVariable String model) {
        return carService.getByModel(model);
    }

    @GetMapping("/price/{price}")
    public List<Car> getCarsByPrice(@PathVariable double price) {
        return carService.getByPriceLessThanEqual(price);
    }

    @GetMapping("/color/{color}")
    public List<Car> getCarsByColor(@PathVariable String color) {
        return carService.getByColor(color);
    }
}
