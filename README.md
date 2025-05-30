# Drivo - Uber Clone

Drivo is a modern ride-hailing application designed to provide a seamless and efficient way for users to book rides and for drivers to find passengers. This project is inspired by the functionality of Uber and aims to replicate essential features with added customizations for learning purposes.

## Features

- **User Authentication**: User and driver login/sign-up with authentication.
- **Real-time Location Tracking**: Users and drivers can see real-time locations of each other.
- **Ride Booking**: Users can request rides, view nearby available drivers, and choose from various ride options.

- **Ride History**: Users can view their past rides and payment details.
- **Driver Dashboard**: Drivers can see incoming ride requests, accept or reject them, and navigate to the user's location.
- **Ratings and Reviews**: Users and drivers can rate each other after every trip.
- **Payment Integration**: Users can pay for their rides through secure payment gateways.

## Tech Stack

- **Frontend**: React, Tailwind
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Real-time Communication**: Socket.io
- **Payment Gateway**: Cahfree (or any other payment provider)
- **Maps**: Leaflet Maps API (for location tracking and navigation)

## Getting Started

To get started with the Drivo project, follow the steps below:

### Prerequisites

1. **Node.js** installed on your machine.
2. **MongoDB** running locally or use a cloud database (MongoDB Atlas).
3. **Google Maps API Key** for location-based services.
4. **Stripe API Key** for payment processing (if applicable).

### Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/your-username/drivo.git
    ```

2. Navigate into the project directory:

    ```bash
    cd drivo
    ```

3. Install dependencies for both frontend and backend:

    For **backend**:

    ```bash
    cd backend
    npm install
    ```

    For **frontend**:

    ```bash
    cd ../frontend
    npm install
    ```

4. Set up the environment variables for both frontend and backend:
    - Backend: Create a `.env` file in the backend folder and add your MongoDB URI, JWT secret, Google Maps API key, Stripe API key, etc.
    - Frontend: Create a `.env` file in the frontend folder and add API keys and other configuration settings.

### Running the Application

- **Backend**: Navigate to the backend folder and run:

    ```bash
    npm start
    ```

- **Frontend**: Navigate to the frontend folder and run:

    ```bash
    npm start
    ```

    This will start the React Native application, and you can run it on an emulator or physical device.

## Folder Structure

