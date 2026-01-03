# E-Shop - A Self-Hosted eCommerce Platform

This is a full-stack eCommerce web application inspired by Flipkart, built to be fully self-hosted and locally deployable.

## Tech Stack

*   **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
*   **Backend:** Node.js / Express.js (within Next.js API Routes)
*   **Database:** MongoDB
*   **Authentication:** JWT (stored in HTTP-only cookies)

## Features

*   User registration and login
*   Admin and User roles
*   Product listing, search, and filtering
*   Product details page
*   Shopping cart
*   Checkout with Cash on Delivery (COD)
*   Admin panel for managing products, orders, and users

---

## Getting Started

Follow these steps to run the application on your local machine.

### Prerequisites

1.  **Node.js:** Make sure you have Node.js (version 18 or higher) installed.
2.  **MongoDB:** You must have a local MongoDB instance running. You can install it from the [official MongoDB website](https://www.mongodb.com/try/download/community).

### Installation and Setup

1.  **Install Dependencies:**
    Open your terminal in the project directory and run:
    ```bash
    npm install
    ```

2.  **Ensure MongoDB is Running:**
    Start your local MongoDB server. The application is configured to connect to `mongodb://127.0.0.1:27017/eshop`.

3.  **Run the Development Server:**
    Once MongoDB is running, start the application with:
    ```bash
    npm run dev
    ```

The application will now be running at `http://localhost:3000`.

The first time you start the server, it will automatically seed the database with default products and categories if the `eshop` database is empty.

### Default Admin User

An admin user is automatically created during the database seeding process. You can use these credentials to log into the admin panel:

*   **Email:** `admin@eshop.com`
*   **Password:** `admin123`

### Troubleshooting

**`ECONNREFUSED 127.0.0.1:27017` Error**

This error means the application could not connect to the MongoDB database. To fix this, ensure that your local MongoDB server is running **before** you start the application with `npm run dev`.
