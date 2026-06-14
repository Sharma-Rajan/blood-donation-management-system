# Blood Donation Management System

A complete academic project built with HTML5, CSS3, Vanilla JavaScript, Node.js, Express.js, and MySQL. The application supports donor registration, donor search, secure admin login, admin dashboard management, and responsive UI design.

## Phase 1: Project Overview

### Modules
- Home Page
- Donor Registration
- Search Donor
- Admin Login
- Admin Dashboard

### Technology Stack
- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js, Express.js
- Database: MySQL
- Deployment: Vercel

### Folder Structure
```text
project-root/
├── api/
├── config/
├── controllers/
├── database/
├── docs/
├── models/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── routes/
├── views/
├── app.js
├── package.json
├── vercel.json
└── README.md
```

## Phase 2: Database Script
- See [database/blood_donation_db.sql](database/blood_donation_db.sql)

## Phase 3: Backend Source Code
- `app.js`
- `config/db.js`
- `controllers/`
- `models/`
- `routes/`
- `api/index.js`

## Phase 4: Frontend Source Code
- `views/`
- `public/css/style.css`
- `public/js/main.js`

## Phase 5: Deployment Guide
- See [docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)

## Phase 6: Project Report
- See [docs/PROJECT_REPORT.md](docs/PROJECT_REPORT.md)

## Quick Start
1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`.
3. Import the database script into MySQL.
4. Run `npm run dev`.
5. Open `http://localhost:3000`.

## Default Admin Login
- Username: `admin`
- Password: `admin123`
