# Deployment Guide

## 1. Prerequisites
- Node.js 18 or higher
- MySQL 8 or compatible server
- A Vercel account
- Git installed locally

## 2. Local Setup
1. Clone or open the project folder.
2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env` and update the values.
4. Create the database using the SQL script in `database/blood_donation_db.sql`.
5. Start the application:

```bash
npm run dev
```

6. Open `http://localhost:3000`.

## 3. Environment Variables
Use the following values in `.env`:

- `PORT`: Local port number, usually `3000`
- `SESSION_SECRET`: A long random string for session security
- `DB_HOST`: MySQL host
- `DB_USER`: MySQL user
- `DB_PASSWORD`: MySQL password
- `DB_NAME`: `blood_donation_db`
- `DB_PORT`: MySQL port, usually `3306`

Example:

```env
PORT=3000
SESSION_SECRET=blood-donation-mini-project-secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=blood_donation_db
DB_PORT=3306
```

## 4. MySQL Connection Steps
1. Open MySQL Workbench or the MySQL CLI.
2. Run the SQL file:

```sql
SOURCE /absolute/path/to/database/blood_donation_db.sql;
```

3. Verify that both `donors` and `admin` tables are created.
4. Confirm the admin row is inserted with username `admin`.

## 5. Vercel Deployment
This project is prepared for Vercel using `api/index.js` and `vercel.json`.

### Steps
1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Set the environment variables in the Vercel dashboard.
4. Add the production MySQL host, username, password, and database name.
5. Deploy the project.

### Important Note
Vercel runs the Express app as a serverless function. The app is suitable for a B.Tech mini project demonstration, but for large production use, a persistent session store such as Redis should be used instead of memory sessions.

## 6. Production Deployment Steps
1. Test the app locally with the production-like `.env` values.
2. Ensure the database is reachable from Vercel or the hosting provider.
3. Replace any local-only credentials with hosted MySQL credentials.
4. Redeploy after every major code change.
5. Keep the SQL backup and `.env.example` in the project submission.

## 7. Default Login Credentials
- Username: `admin`
- Password: `admin123`

## 8. Troubleshooting
- If the app does not start, confirm that MySQL is running.
- If the login fails, verify that the admin hash in the SQL script was imported correctly.
- If search results are empty, insert sample donor data or register a new donor.
