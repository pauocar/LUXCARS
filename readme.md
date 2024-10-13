# LUXCARS API Documentation

## Overview

This API provides functionalities for both public users and vendors to interact with a car marketplace. Public users can view cars and make offers, while vendors can manage their car listings and offers.

## Actors

- **Public User**: Can view all cars, view details of a specific car, and create offers.
- **Vendor**: Can authenticate, manage their car listings, and view offers for their cars.

---

## Public API

### 1. View All Cars

- **Endpoint**: `GET /cars`
- **Description**: Retrieves a list of all available cars.

### 2. View Car Details

- **Endpoint**: `GET /cars/{id}`
- **Description**: Retrieves detailed information about a specific car.
- **Parameters**:
  - `id`: The unique identifier of the car.

### 3. Create an Offer

- **Endpoint**: `POST /offers`
- **Description**: Allows a public user to create a new offer for a car.
- **Request Body**:
  - `carId`: The ID of the car for which the offer is being made.
  - `amount`: The amount of the offer.
  - `message`: (optional) A message from the user.

---

## Vendor API

### 1. Login

- **Endpoint**: `POST /auth/login`
- **Description**: Authenticates a vendor and generates a JWT token.
- **Request Body**:
  - `email`: The vendor's email address.
  - `password`: The vendor's password.

### 2. Logout

- **Endpoint**: `POST /auth/logout`
- **Description**: Invalidates the vendor's JWT token.

### 3. Publish a Car

- **Endpoint**: `POST /vendors/cars`
- **Description**: Allows a vendor to publish a new car.
- **Request Body**:
  - `make`: The make of the car.
  - `model`: The model of the car.
  - `year`: The year of manufacture.
  - `price`: The price of the car.
  - `description`: (optional) A description of the car.

### 4. Delete a Car

- **Endpoint**: `DELETE /vendors/cars/{id}`
- **Description**: Deletes a specific car from the vendor's listings.
- **Parameters**:
  - `id`: The unique identifier of the car.

### 5. Edit Car Details

- **Endpoint**: `PUT /vendors/cars/{id}`
- **Description**: Updates the details of a specific car.
- **Parameters**:
  - `id`: The unique identifier of the car.
- **Request Body**:
  - `make`: (optional) The make of the car.
  - `model`: (optional) The model of the car.
  - `year`: (optional) The year of manufacture.
  - `price`: (optional) The price of the car.
  - `description`: (optional) A description of the car.

### 6. View All Cars

- **Endpoint**: `GET /vendors/cars`
- **Description**: Retrieves a list of all cars published by the vendor.

### 7. View Offers for a Specific Car

- **Endpoint**: `GET /vendors/cars/{id}/offers`
- **Description**: Retrieves all offers made for a specific car.
- **Parameters**:
  - `id`: The unique identifier of the car.

---

## Authentication

### 1. Login

- **Request**: `POST /auth/login`
- **Response**: Generates a JWT token for authenticated vendors.

### 2. Logout

- **Request**: `POST /auth/logout`
- **Response**: Invalidates the JWT token.

---

## Car Management

### 1. Add New Car

- **Request**: `POST /vendors/cars`
- **Database Operation**: Adds a new car entry to the database.

### 2. Remove Car

- **Request**: `DELETE /vendors/cars/{id}`
- **Database Operation**: Removes the specified car from the database.

### 3. Update Car Details

- **Request**: `PUT /vendors/cars/{id}`
- **Database Operation**: Updates the details of the specified car in the database.

### 4. Fetch Vendor's Cars

- **Request**: `GET /vendors/cars`
- **Database Operation**: Retrieves all cars listed by the vendor.

---

## Offers Management

### 1. Create New Offer

- **Request**: `POST /offers`
- **Database Operation**: Creates a new offer in the database.

### 2. Fetch Offers for a Specific Car

- **Request**: `GET /vendors/cars/{id}/offers`
- **Database Operation**: Retrieves all offers associated with the specified car.

---

## Error Handling

Standard error responses should include:

- **400 Bad Request**: Invalid request parameters.
- **401 Unauthorized**: Authentication failed or token expired.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: Unexpected server error.

---

## Conclusion

This API enables a seamless interaction between public users and vendors in a car marketplace, providing essential functionalities for viewing, managing, and offering cars.
