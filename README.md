

# 🩺 DocBook - Doctor Appointment Booking System

**DocBook** is a full-stack web application designed for clinics and hospitals to manage doctor appointments efficiently. It supports three user roles: **Admin**, **Doctor**, and **Patient**. This project is built using the **MERN stack** and styled with **Tailwind CSS**. Authentication is secured using **JWT** and **bcrypt**. Cloudinary is used for secure image/file handling.

---

## 📚 Table of Contents

- [🌟 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
- [🌐 Live Demo](#-live-demo)
- [🧪 Demo Credentials](#-demo-credentials)
- [🙋‍♀️ Author](#️-author)

---

## 🌟 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control for Admin, Doctor, and Patient

### 👨‍⚕️ Admin Panel
- Secure login for admin
- Add and manage doctors
- View all appointments
- Manage user data

### 🩺 Doctor Dashboard
- Login and view own dashboard
- View appointments
- Cancel appointments
- Update profile, availability, appointment fee, and address

### 👤 Patient Features
- Register and login
- Book appointments with doctors
- Cancel appointments
- Update personal profile

### ☁️ File Handling
- Profile image and document uploads via **Cloudinary**

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt
- **Image/File Uploads**: Cloudinary
- **Other Tools**: Axios, React Router, dotenv

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB (local or cloud)
- Cloudinary account (for file uploads)

### Environment Variables

Create a `.env` file in your **backend directory** and add the following:

```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
````

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/docbook.git
cd docbook
```

2. Install backend dependencies

```bash
cd backend
npm install
npm start
```

3. Install frontend dependencies

```bash
cd ../frontend
npm install
npm start
```

---

## 🌐 Live Demo

Click the links below to explore the live version of **DocBook**:

* 🔒 **Admin Demo**: [http://docbook-production-e5c7.up.railway.app](http://docbook-production-e5c7.up.railway.app)
* 👤 **User Demo (Doctor/Patient)**: [https://docbook-production.up.railway.app/](https://docbook-production.up.railway.app/)

---

## 🧪 Demo Credentials

### 🔑 Admin Login

```bash
Email: dummy@example.com
Password: demo123
```

### 🩺 Doctor Login

```bash
Email: gayani@gmail.com
Password: 12345678
```

### 👤 Patient Login

You can register a new account using the registration form on the website.

---

## 🙋‍♀️ Developer

**D.P. Prabodha Harshani**
Software Engineering Undergraduate
Sabaragamuwa University of Sri Lanka
🔗 [LinkedIn]([https://www.linkedin.com/in/prabodha-harshani](https://www.linkedin.com/in/prabodhahdev/))


