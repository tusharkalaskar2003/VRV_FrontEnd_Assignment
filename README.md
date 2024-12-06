# Project Title: Task Management System

## Introduction

The **Task Management System** is a web-based application that helps manage projects and tasks among different user roles: **Admin**, **Manager**, and **Normal User**. The system is designed to streamline the assignment, monitoring, and status tracking of tasks within a project. 

### Features
1. **Admin**:
   - Add users to a project.
   - Remove users from a project.
2. **Manager**:
   - Assign tasks to users within a project.
3. **Normal User**:
   - Change the status of tasks assigned to them.

This project is built using **Flask** for the backend with a file-based system serving as a dummy database, and **React** for the frontend to provide an interactive and responsive user interface.

---

## Tech Stack

1. **Backend**: Flask (Python)
2. **Frontend**: React (JavaScript)
3. **Database**: File system as a dummy storage

---

## Steps to Run the Project

### 1. Backend Setup
1. Open the terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Activate the virtual environment:
   - For Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - For macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
3. Install all required libraries from `requirements.txt`:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Flask server:
   ```bash
   python app.py
   ```
   The backend server will start running on `http://127.0.0.1:5000`.

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend application will run on `http://localhost:5173`.

---

## Usage

### Admin
- Can log in to the system and manage users by:
  - Adding users to projects.
  - Removing users from projects.

### Manager
- Can log in and:
  - Assign tasks to users within a project.

### Normal User
- Can log in to:
  - View assigned tasks.
  - Update the status of their tasks (e.g., Completed, In Progress).

---

## File Structure
```
/backend
    ├── app.py               # Main Flask application
    ├── routes.py            # API routes
    ├── dummy_data.json      # File-based storage (dummy database)
    ├── requirements.txt     # Backend dependencies
    └── venv/                # Virtual environment
/frontend
    ├── src/
    ├── package.json         # Frontend dependencies
    └── public/
```

---

## Future Enhancements
- Replace file-based storage with a relational database like PostgreSQL.
- Add user authentication and authorization using JWT.
- Implement advanced task tracking features like notifications and reminders.

---

## Credits
- **Backend Developer**: Flask with Python
- **Frontend Developer**: React with JavaScript

Enjoy managing tasks effortlessly! 🚀
