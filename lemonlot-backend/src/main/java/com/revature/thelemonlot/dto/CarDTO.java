package com.revature.thelemonlot.dto;

public class CarDTO {
    private String make;
    private String model;
    private Integer modelYear;
    private float price;
    private String color;
    private Integer mileage;
    private String description;
    private int sellerId; // Use Long if seller_id is of type Long

    // Default constructor
    public CarDTO() {
    }

    // Parameterized constructor
    public CarDTO(String make, String model, Integer modelYear, float price, String color, Integer mileage,
            String description, int sellerId) {
        this.make = make;
        this.model = model;
        this.modelYear = modelYear;
        this.price = price;
        this.color = color;
        this.mileage = mileage;
        this.description = description;
        this.sellerId = sellerId;
    }

    // Getters and setters
    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getModelYear() {
        return modelYear;
    }

    public void setModelYear(Integer modelYear) {
        this.modelYear = modelYear;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Integer getMileage() {
        return mileage;
    }

    public void setMileage(Integer mileage) {
        this.mileage = mileage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getSellerId() {
        return sellerId;
    }

    public void setSellerId(int sellerId) {
        this.sellerId = sellerId;
    }

    @Override
    public String toString() {
        return "CarDTO{" +
                "make='" + make + '\'' +
                ", model='" + model + '\'' +
                ", modelYear=" + modelYear +
                ", price=" + price +
                ", color='" + color + '\'' +
                ", mileage=" + mileage +
                ", description='" + description + '\'' +
                ", sellerId=" + sellerId +
                '}';
    }
}
