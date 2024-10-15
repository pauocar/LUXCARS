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
  - `email`: The buyer email where the vendor can contact him
  - `message`: (optional) A message from the user.
    
### 4. Get image

- **Endpoint**: `GET /image/{id}`
- **Description**: Retrieves an image.
  
---

## Authentication

### 1. Login

- **Endpoint**: `POST /auth/login`
- **Description**: Authenticates a vendor and generates a JWT token.
- **Request Body**:
  - `email`: The vendor's email address.
  - `password`: The vendor's password.

### 2. Logout

- **Endpoint**: `POST /auth/logout`
- **Description**: Invalidates the vendor's JWT token.

---

## Vendor API

All of the Vendor API requiere the user to have auth.

### 1. Publish a Car

- **Endpoint**: `POST /vendors/cars`
- **Description**: Allows a vendor to publish a new car.
- **Request Body**:
  - `make`: The make of the car.
  - `model`: The model of the car.
  - `year`: The year of manufacture.
  - `price`: The price of the car.
  - `images`: List of images.
  - `description`: (optional) A description of the car.

### 2. Delete a Car

- **Endpoint**: `DELETE /vendors/cars/{id}`
- **Description**: Deletes a specific car from the vendor's listings.
- **Parameters**:
  - `id`: The unique identifier of the car.

### 3. Edit Car Details

- **Endpoint**: `PUT /vendors/cars/{id}`
- **Description**: Updates the details of a specific car.
- **Parameters**:
  - `id`: The unique identifier of the car.
- **Request Body**:
  - `make`: (optional) The make of the car.
  - `model`: (optional) The model of the car.
  - `year`: (optional) The year of manufacture.
  - `price`: (optional) The price of the car.
  - `images`: (optional) Lis of images.
  - `description`: (optional) A description of the car.

### 4. View All Cars

- **Endpoint**: `GET /vendors/cars`
- **Description**: Retrieves a list of all cars published by the vendor.

### 5. View Offers for a Specific Car

- **Endpoint**: `GET /vendors/cars/{id}/offers`
- **Description**: Retrieves all offers made for a specific car.
- **Parameters**:
  - `id`: The unique identifier of the car.

### 6. Fetch Offers for a Specific Car

- **Request**: `GET /vendors/cars/{id}/offers`
- **Description**: Retrieves all offers associated with the specified car.

  
### 7. Upload an image

- **Endpoint**: `PUT /vendors/image/`
- **Description**: Uploads an image.
- **Parameters**:
  - `image`: Uploads an image.
  - `name`: Image name.

### 8. Upload an image

- **Endpoint**: `GET /vendors/imagelist`
- **Description**: Lists all images uploaded by a vendor.

### 9. Delete an image

- **Endpoint**: `DELETE /vendors/image`
- **Description**: Deletes an image.
- **Parameters**
  - `id` image Id to delete
  
---

## Error Handling

- **400 Bad Request**: Invalid request parameters.
- **401 Unauthorized**: Authentication failed or token expired.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: Unexpected server error.
