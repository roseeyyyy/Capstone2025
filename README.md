# Leave Form System

A web application to manage employee leave requests, track leave balances, and streamline leave approval workflows.

## Features

- User login authentication by PIN
- Submit, view, and manage leave requests
- Leave approval and status updates (approved, disapproved, pending)
- View detailed leave balances including entitlements, used leave, remaining leave, and unpaid leave
- Role-based dashboards (Admin, Manager, FOH, BOH)
- Responsive design with Bootstrap
- RESTful API backend built with Node.js, Express, and MySQL

## Technologies Used

- **Frontend:** React, React Router, Bootstrap Icons
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Others:** Axios for API calls, CORS, Body-parser

## Getting Started

### Prerequisites

- Node.js installed
- MySQL installed and running
- Git installed

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/leave-form-system.git
cd leave-form-system

2. Backend setup
```bash
cd backend
npm install

3. Configure your MySQL database connection in backend/models/db.js

4. Run the backend server
```bash
cd backend
node server.js

5. Frontend setup
```bash
cd frontend
npm install
npm start

6. Access the app in your browser at http://localhost:3000

