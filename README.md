# SpiritX_CripticHackers_01
# SecureConnect

SecureConnect is a secure and user-friendly authentication system designed for robust login and signup functionality. It ensures strong validation, secure authentication, and seamless user experience using a fully integrated frontend, backend, and database system.

## 🛠️ Features

### **Signup Page**
- Username input with real-time validation (minimum 8 characters, must be unique)
- Password input with strength indicator and live validation
- Password must contain:
  - At least one lowercase letter
  - At least one uppercase letter
  - At least one special character
- Confirm password validation
- Error messages displayed under each field
- Signup prevention if fields are empty or invalid
- Successful signup confirmation and auto-redirect to login page

### **Login Page**
- Username and password input fields with real-time validation
- Prevent login for incorrect credentials or empty fields
- Authentication errors displayed above the login button
- Successful login redirects to a landing page
- Display message: "Hello, <username>!"
- Session management to keep users logged in until they click "Logout"

### **Backend & Security**
- Uses **Node.js** and **Express.js** for API handling
- **MySQL** database for user data storage
- **bcrypt** for password hashing
- **JWT (JSON Web Tokens)** for authentication
- Secure API endpoints for signup, login, and username availability checking

## 📂 Project Structure
```
SecureConnect/
├── client/ (Frontend React app)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
├── server/ (Backend Node.js app)
│   ├── routes/
│   │   ├── auth.js
│   ├── db.js
│   ├── server.js
└── README.md
```
🚀 Instructions to Run the Project

1️⃣ Clone the Repository

git clone https://github.com/yourusername/SecureConnect.git
cd SecureConnect

2️⃣ Database Setup & Configuration

1. Create the MySQL Database

Log into MySQL and create a database:

CREATE DATABASE secureconnect;
USE secureconnect;

2. Import the Database Dump (Recommended)

Run the following command to import the database schema:

mysql -u your_user -p secureconnect < database_dump.sql

Alternatively, create the users table manually:

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

3️⃣ Setup Environment Variables

Create a .env file inside the server directory and add:

SECRET_KEY=your_secret_key
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=secureconnect


## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/SecureConnect.git
cd SecureConnect
```

### 2️⃣ Setup Environment Variables
Create a `.env` file inside the `server` directory and add:
```sh
SECRET_KEY=your_secret_key
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=your_database_name
```

### 3️⃣ Start the Project
#### Backend:
```sh
cd backend
npm start
```
#### Frontend:
```sh
cd frontend
npm start
```

🔍 Assumptions Made During Development

Username must be unique and at least 8 characters long.
Password must contain an uppercase letter, a lowercase letter, and a special character.
Users remain logged in until they manually log out.
The backend is connected to a MySQL database with a users table.

✨ Additional Features

Password Visibility Toggle: Users can show/hide their password while typing.
Live Password Strength Indicator: Password strength updates dynamically based on complexity.
Real-time Username Validation: Checks if a username is already taken before submission.
Session Management: Users stay logged in across sessions until they log out.

