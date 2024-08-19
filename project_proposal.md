# Car Dealership Management System

## Entities

### 1. User
- **Attributes:**
  - `user_id`: Unique identifier for each user.
  - `username`: Username chosen by the user.
  - `password`: Encrypted password.
  - `email`: User's email address.
  - `role`: Role of the user (e.g., Customer, Salesperson, Admin).
  - `first_name`: User's first name.
  - `last_name`: User's last name.
  - `phone_number`: User's contact number.
  - `address`: User's address (optional).
  - `preferences`: User preferences (e.g., Dark Mode).
  - `created_at`: Date and time when the account was created.
  - `updated_at`: Date and time when the account was last updated.

### 2. Inventory
- **Attributes:**
  - `car_id`: Unique identifier for each car.
  - `make`: Car manufacturer (e.g., Toyota, Honda).
  - `model`: Car model (e.g., Corolla, Civic).
  - `year`: Year of manufacture.
  - `price`: Price of the car.
  - `color`: Color of the car.
  - `mileage`: Mileage of the car (if applicable).
  - `status`: Availability status (e.g., Available, Sold, Reserved).
  - `inventory_count`: Number of available units.
  - `description`: Detailed description of the car.
  - `image_url`: URL to an image of the car (optional).
  - `created_at`: Date and time when the car was added to the inventory.
  - `updated_at`: Date and time when the car details were last updated.

### 3. Transaction
- **Attributes:**
  - `transaction_id`: Unique identifier for each transaction.
  - `user_id`: Identifier of the customer involved in the transaction.
  - `salesperson_id`: Identifier of the salesperson (if applicable).
  - `car_id`: Identifier of the car involved in the transaction.
  - `transaction_date`: Date and time of the transaction.
  - `amount`: Amount involved in the transaction.
  - `status`: Status of the transaction (e.g., PENDING, COMPLETED, CANCELLED).
  - `payment_method`: Method of payment (if applicable, e.g., Credit Card, PayPal).
  - `offer_amount`: Amount offered by the customer (if applicable).
  - `comments`: Additional comments or notes related to the transaction.
  - `created_at`: Date and time when the transaction was created.
  - `updated_at`: Date and time when the transaction details were last updated.

### 4. Wishlist (Optional)
- **Attributes:**
  - `wishlist_id`: Unique identifier for each wishlist entry.
  - `user_id`: Identifier of the user who created the wishlist.
  - `car_id`: Identifier of the car added to the wishlist.
  - `added_at`: Date and time when the car was added to the wishlist.

### 5. User Preferences (Optional)
- **Attributes:**
  - `user_id`: Identifier of the user.
  - `preference_key`: Key for the preference (e.g., "theme").
  - `preference_value`: Value for the preference (e.g., "Dark Mode").

## User Stories

### User Registration
- **As a:** New user  
  **I want to:** Register an account  
  **So that:** I can access the car dealership application with my personal credentials.

### User Login
- **As a:** Registered user  
  **I want to:** Log in with my account credentials  
  **So that:** I can access my personalized dashboard and manage my activities.

### Password Reset
- **As a:** User who has forgotten their password  
  **I want to:** Reset my password using my email address  
  **So that:** I can regain access to my account.

### Order and Transaction Management
- **As a:** Customer  
  **I want to:** View and manage my orders and past transactions  
  **So that:** I can keep track of my purchase history and make any necessary changes.

### Car Search and Filter
- **As a:** Customer  
  **I want to:** Search for available cars and filter results by price, color, and model  
  **So that:** I can easily find a car that matches my preferences.

### Order Management
- **As a:** Customer  
  **I want to:** Place, view, edit, cancel orders, and make offers on cars  
  **So that:** I can manage my purchases and negotiate prices effectively.

### Inventory Management
- **As a:** Salesperson  
  **I want to:** View and edit the inventory portal, including adding, deleting, and editing car information and count  
  **So that:** I can keep the inventory up to date and accurate.

### Order Processing
- **As a:** Salesperson  
  **I want to:** Process customer orders by accepting, denying, or requesting more information  
  **So that:** I can manage customer interactions and fulfill their orders correctly.

### User Account Management
- **As a:** Administrator  
  **I want to:** Manage and update user account information  
  **So that:** I can ensure the accuracy and security of user data.

### Inventory Alerts
- **As a:** Salesperson or Administrator  
  **I want to:** Receive alerts when inventory levels fall below a certain threshold  
  **So that:** I can reorder stock and prevent inventory shortages.

### User Profile Management
- **As a:** User  
  **I want to:** Update my personal information such as name, email, and phone number  
  **So that:** My account information is current and accurate.

### Wishlist and Save for Later
- **As a:** Customer  
  **I want to:** Add cars to a wishlist or save them for later  
  **So that:** I can easily find and consider cars I'm interested in purchasing in the future.

## Stretch Goals

### Salesperson Performance Metrics
- **As an:** Administrator  
  **I want to:** Track salesperson performance metrics such as sales volume and customer satisfaction  
  **So that:** I can recognize and reward top performers and identify areas for improvement.

### Customization Options
- **As a:** User  
  **I want to:** Customize my account settings, including themes like Dark Mode  
  **So that:** I can personalize my user experience to my liking.
