# Car Dealership Management System

## Description

The **Car Dealership Management System** is a comprehensive application built with React for the frontend and Spring Boot for the backend. It provides functionalities to manage users, inventory, transactions, and more in a car dealership setting. The system supports various user roles including Customers, Salespersons, and Administrators, each with specific permissions and features.

## Features

- **User Registration and Login**: Users can register, log in, and manage their accounts.
- **Password Reset**: Users can reset their passwords using their email address.
- **Order and Transaction Management**: Customers can view, manage, and track their orders and transactions.
- **Car Search and Filter**: Customers can search for cars and filter results by attributes like price, color, and model.
- **Order Management**: Customers can place, view, edit, cancel orders, and make offers on cars.
- **Inventory Management**: Salespersons can manage the inventory, including adding, deleting, and editing car details.
- **Order Processing**: Salespersons can process customer orders, manage interactions, and fulfill orders.
- **User Account Management**: Administrators can manage and update user account information.
- **Inventory Alerts**: Salespersons and Administrators receive alerts for low inventory levels.
- **User Profile Management**: Users can update their personal information.
- **Wishlist and Save for Later**: Customers can add cars to a wishlist for future consideration.

## Stretch Goals

- **Salesperson Performance Metrics**: Administrators can track performance metrics such as sales volume and customer satisfaction.
- **Customization Options**: Users can customize their account settings, including themes like Dark Mode.

## Entities

### User

- `user_id`: Unique identifier
- `username`: Chosen username
- `password`: Encrypted password
- `email`: User’s email address
- `role`: Role of the user (Customer, Salesperson, Admin)
- `first_name`: User’s first name
- `last_name`: User’s last name
- `phone_number`: User’s contact number
- `address`: User’s address (optional)
- `preferences`: User preferences (e.g., Dark Mode)
- `created_at`: Account creation date and time
- `updated_at`: Last account update date and time

### Inventory

- `car_id`: Unique identifier
- `make`: Car manufacturer
- `model`: Car model
- `year`: Year of manufacture
- `price`: Price
- `color`: Color
- `mileage`: Mileage (if applicable)
- `status`: Availability status (Available, Sold, Reserved)
- `inventory_count`: Number of units
- `description`: Detailed description
- `image_url`: URL to an image (optional)
- `created_at`: Date and time added
- `updated_at`: Last update date and time

### Transaction

- `transaction_id`: Unique identifier
- `user_id`: Customer involved
- `salesperson_id`: Salesperson involved (if applicable)
- `car_id`: Car involved
- `transaction_date`: Date and time
- `amount`: Amount
- `status`: Status (PENDING, COMPLETED, CANCELLED)
- `payment_method`: Payment method (e.g., Credit Card, PayPal)
- `offer_amount`: Amount offered (if applicable)
- `comments`: Additional comments
- `created_at`: Date and time created
- `updated_at`: Last update date and time

### Wishlist (Optional)

- `wishlist_id`: Unique identifier
- `user_id`: User who created the wishlist
- `car_id`: Car added
- `added_at`: Date and time added

### User Preferences (Optional)

- `user_id`: User identifier
- `preference_key`: Key for preference (e.g., "theme")
- `preference_value`: Value for preference (e.g., "Dark Mode")

## User Stories

- **User Registration**: As a new user, I want to register an account so that I can access the car dealership application with my personal credentials.
- **User Login**: As a registered user, I want to log in with my account credentials so that I can access my personalized dashboard and manage my activities.
- **Password Reset**: As a user who has forgotten their password, I want to reset my password using my email address so that I can regain access to my account.
- **Order and Transaction Management**: As a customer, I want to view and manage my orders and past transactions so that I can keep track of my purchase history and make any necessary changes.
- **Car Search and Filter**: As a customer, I want to search for available cars and filter results by price, color, and model so that I can easily find a car that matches my preferences.
- **Order Management**: As a customer, I want to place, view, edit, cancel orders, and make offers on cars so that I can manage my purchases and negotiate prices effectively.
- **Inventory Management**: As a salesperson, I want to view and edit the inventory portal, including adding, deleting, and editing car information and count so that I can keep the inventory up to date and accurate.
- **Order Processing**: As a salesperson, I want to process customer orders by accepting, denying, or requesting more information so that I can manage customer interactions and fulfill their orders correctly.
- **User Account Management**: As an administrator, I want to manage and update user account information so that I can ensure the accuracy and security of user data.
- **Inventory Alerts**: As a salesperson or administrator, I want to receive alerts when inventory levels fall below a certain threshold so that I can reorder stock and prevent inventory shortages.
- **User Profile Management**: As a user, I want to update my personal information such as name, email, and phone number so that my account information is current and accurate.
- **Wishlist and Save for Later**: As a customer, I want to add cars to a wishlist or save them for later so that I can easily find and consider cars I'm interested in purchasing in the future.

## Stretch Goals

- **Salesperson Performance Metrics**: As an administrator, I want to track salesperson performance metrics such as sales volume and customer satisfaction so that I can recognize and reward top performers and identify areas for improvement.
- **Customization Options**: As a user, I want to customize my account settings, including themes like Dark Mode so that I can personalize my user experience to my liking.

## Setup and Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/car-dealership-management-system.git
   cd car-dealership-management-system
