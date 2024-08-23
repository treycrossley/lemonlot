package com.revature.thelemonlot.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.thelemonlot.dto.CarDTO;
import com.revature.thelemonlot.model.Car;
import com.revature.thelemonlot.model.User;
import com.revature.thelemonlot.repository.CarRepository;
import com.revature.thelemonlot.repository.UserRepository;

@Service
public class CarService {
    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Optional<Car> getCarById(int id) {
        return carRepository.findById(id);
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
        return carRepository
                .findByMakeContainingIgnoreCaseAndModelContainingIgnoreCaseAndPriceBetweenAndColorContainingIgnoreCase(
                        make, model, minPrice, maxPrice, color);
    }

    public Car createCar(CarDTO carDTO) {
        Car car = convertToEntity(carDTO);
        return carRepository.save(car);
    }

    public Car updateCar(int id, CarDTO carDTO) {
        // Find the existing Car entity
        return carRepository.findById(id)
                .map(existingCar -> {
                    // Update and return the Car entity
                    return updateCarFromDTO(existingCar, carDTO);
                })
                .orElse(null); // Return null if the car with the given ID is not found
    }

    public boolean deleteCar(int id) {
        if (carRepository.existsById(id)) {
            carRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private Car convertToEntity(CarDTO carDTO) {
        Car car = new Car();
        car.setMake(carDTO.getMake());
        car.setModel(carDTO.getModel());
        car.setModelYear(carDTO.getModelYear());
        car.setPrice(carDTO.getPrice());
        car.setColor(carDTO.getColor());
        car.setMileage(carDTO.getMileage());
        car.setDescription(carDTO.getDescription());

        // Find the User by ID inside the conversion method
        int sellerId = carDTO.getSellerId();
        System.out.println("Seller ID: " + sellerId);
        System.out.println("Car DTO: " + carDTO);
        User seller = userRepository.findById(sellerId)
                .orElseThrow(() -> new NoSuchElementException("User with ID " + carDTO.getSellerId() + " not found"));

        car.setSeller(seller);

        return car;
    }

    private Car updateCarFromDTO(Car car, CarDTO carDTO) {
        // Update fields of the Car entity with the values from CarDTO
        car.setMake(carDTO.getMake());
        car.setModel(carDTO.getModel());
        car.setPrice(carDTO.getPrice());
        car.setColor(carDTO.getColor());
        car.setMileage(carDTO.getMileage());
        car.setDescription(carDTO.getDescription());

        // Find the User by ID and update the seller
        User seller = userRepository.findById(carDTO.getSellerId())
                .orElseThrow(() -> new NoSuchElementException("User with ID " + carDTO.getSellerId() + " not found"));
        car.setSeller(seller);

        // Save the updated Car entity and return it
        return carRepository.save(car);
    }
}
