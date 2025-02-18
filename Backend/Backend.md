![Drivo Logo](assets/logo.png)

# DRIVO RIDES A RIDE BOOKING PLATFORM
# User Registration Endpoint

## Endpoint
POST
/users/register`

## Description
This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

## Request Body
The request body should be a JSON object containing the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required): The user's first name. Must be at least 3 characters long.
  - `lastname` (string, optional): The user's last name. Must be at least 3 characters long if provided.
- `email` (string, required): The user's email address. Must be a valid email format.
- `password` (string, required): The user's password. Must be at least 6 characters long.

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
Responses
Success
Status Code: 201 Created
Body: A JSON object containing the user's authentication token and user details.
Example:{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
Validation Errors
Status Code: 400 Bad Request
Body: A JSON object containing validation error messages.
Example:{
  "errors": [
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
Server Error
Status Code: 500 Internal Server Error
Body: A JSON object containing an error message.
Example:{
  "error": "Server error"
}
User Login Endpoint
Endpoint
POST /users/login

Description
This endpoint is used to log in an existing user. It requires the user's email and password.

Request Body
The request body should be a JSON object containing the following fields:
email (string, required): The user's email address. Must be a valid email format.
password (string, required): The user's password. Must be at least 6 characters long.
Example:
{
  "email": "john.doe@example.com",
  "password": "password123"
}
Responses
Success
Status Code: 200 OK
Body: A JSON object containing the user's authentication token and user details.
Example:{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
Validation Errors
Status Code: 400 Bad Request
Body: A JSON object containing validation error messages.
Example:{
  "errors": [
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
Invalid Credentials
Status Code: 401 Unauthorized
Body: A JSON object containing an error message.
Example:

{
  "error": "Invalid credentials"
}
Server Error
Status Code: 500 Internal Server Error
Body: A JSON object containing an error message.
Example:

{
  "error": "Server error"
}
User Profile Endpoint
Endpoint
GET /users/profile

Description
This endpoint is used to get the profile of the logged-in user. It requires the user's authentication token.

Request Headers
Authorization: Bearer token
Responses
Success
Status Code: 200 OK
Body: A JSON object containing the user's details.{
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
Unauthorized
Status Code: 401 Unauthorized
Body: A JSON object containing an error message.
Example:{
  "error": "Unauthorized"
}
Server Error
Status Code: 500 Internal Server Error
Body: A JSON object containing an error message.
Example:{
  "error": "Server error"
}
User Logout Endpoint
Endpoint
GET /users/logout

Description
This endpoint is used to log out the logged-in user. It requires the user's authentication token.

Request Headers
Authorization: Bearer token
Responses
Success
Status Code: 200 OK
Body: A JSON object containing a success message.
Example:

{
  "message": "Logout successful"
}
Unauthorized
Status Code: 401 Unauthorized
Body: A JSON object containing an error message.
Example:{
  "error": "Unauthorized"
}
Unauthorized
Status Code: 401 Unauthorized
Body: A JSON object containing an error message.
Example:{
  "error": "Server error"
}
Captain Registration Endpoint
Endpoint
POST /captains/register

Description
This endpoint is used to register a new captain. It requires the captain's first name, last name, email, password, and vehicle details.

Request Body
The request body should be a JSON object containing the following fields:

fullname: An object containing:
firstname (string, required): The captain's first name. Must be at least 3 characters long.
lastname (string, optional): The captain's last name. Must be at least 3 characters long if provided.
email (string, required): The captain's email address. Must be a valid email format.
password (string, required): The captain's password. Must be at least 6 characters long.
vehicle: An object containing:
color (string, required): The vehicle's color. Must be at least 3 characters long.
plate (string, required): The vehicle's plate number. Must be at least 3 characters long.
capacity (number, required): The vehicle's capacity. Must be between 1 and 4.
vehicleType (string, required): The type of vehicle. Must be one of motorcycle, car, van, or auto.
Example:
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
Responses
Success
Status Code: 201 Created
Body: A JSON object containing the captain's authentication token and captain details.
Example:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
Validation Errors
Status Code: 400 Bad Request
Body: A JSON object containing validation error messages.
Example:
{
  "errors": [
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Color must be at least 3 characters long",
      "param": "vehicle.color",
      "location": "body"
    },
    {
      "msg": "Plate must be at least 3 characters long",
      "param": "vehicle.plate",
      "location": "body"
    },
    {
      "msg": "Capacity must be between 1 and 4",
      "param": "vehicle.capacity",
      "location": "body"
    },
    {
      "msg": "Invalid vehicle type",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
Server Error
Status Code: 500 Internal Server Error
Body: A JSON object containing an error message.
Example:
{
  "error": "Server error"
}
Captain Login Endpoint
Endpoint
POST /captains/login

Description
This endpoint is used to log in an existing captain. It requires the captain's email and password.

Request Body
The request body should be a JSON object containing the following fields:

email (string, required): The captain's email address. Must be a valid email format.
password (string, required): The captain's password. Must be at least 6 characters long.
Example:
{
  "email": "jane.doe@example.com",
  "password": "password123"
}
Responses
Success
Status Code: 200 OK
Body: A JSON object containing the captain's authentication token and captain details.
Example:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
Validation Errors
Status Code: 400 Bad Request
Body: A JSON object containing validation error messages.
Example:
{
  "errors": [
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
Invalid Credentials
Status Code: 401 Unauthorized
Body: A JSON object containing an error message.
Example:
{
  "error": "Invalid credentials"
}
Server Error
Status Code: 500 Internal Server Error
Body: A JSON object containing an error message.
Example:
{
  "error": "Server error"
}
Captain Profile Endpoint
Endpoint
GET /captains/profile

Description
This endpoint is used to get the profile of the logged-in captain. It requires the captain's authentication token.

Request Headers
Authorization: Bearer token
Responses
Success
Status Code: 200 OK
Body: A JSON object containing the captain's details.
Example:
{
  "captain": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
Unauthorized
Status Code: 401 Unauthorized
Body: A JSON object containing an error message.
Example:
{
  "error": "Unauthorized"
}
Server Error
Status Code: 500 Internal Server Error
Body: A JSON object containing an error message.
Example:
{
  "error": "Server error"
}
Captain Logout Endpoint
Endpoint
GET /captains/logout

Description
This endpoint is used to log out the logged-in captain. It requires the captain's authentication token.

Request Headers
Authorization: Bearer token
Responses
Success
Status Code: 200 OK
Body: A JSON object containing a success message.
Example:
{
  "message": "Logout successful"
}
Unauthorized
Status Code: 401 Unauthorized
Body: A JSON object containing an error message.
Example:
{
  "error": "Unauthorized"
}
Server Error
Status Code: 500 Internal Server Error
Body: A JSON object containing an error message.
Example:
{
  "error": "Server error"
}
