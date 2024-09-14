# Herafy RESTful API

This repository contains the backend API for **Herafy**, a platform connecting clients and craftsmen. The API handles user authentication, job management, proposal submissions, and client reviews, supporting the core functionality of the platform.

## Features
- **User Authentication**: Secure registration and login for clients and craftsmen.
- **Job Management**: Clients can post and manage job listings.
- **Proposal Handling**: Craftsmen can submit proposals for client jobs.
- **Review System**: Clients can leave reviews after job completion.

## Technologies Used

The backend API is built using the following technologies:

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the RESTful API.
- **MongoDB**: NoSQL database for storing user, job, and proposal data.
- **Mongoose**: ODM library for MongoDB, used to model and interact with the database.
- **MongoDB Atlas**: Cloud-hosted MongoDB service for scalable and secure database management.

## Installation and Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/waseemazmy21/herafy-back-end
    ```
2. Navigate to the project directory:
    ```bash
    cd herafy-back-end
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables (create a `.env` file based on `.env.example`):
    ```plaintext
    PORT=7000
    MONGODB_URI=your_mongodb_uri
    JWTSEC=your_secret_key
    ```
5. Start the development server:
    ```bash
    npm run dev
    ```
6. Open your browser and go to `http://localhost:7000`
