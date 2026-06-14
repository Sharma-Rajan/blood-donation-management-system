-- Blood Donation Management System database script
-- Database name: blood_donation_db

CREATE DATABASE IF NOT EXISTS blood_donation_db;
USE blood_donation_db;

CREATE TABLE IF NOT EXISTS donors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  blood_group VARCHAR(5) NOT NULL,
  city VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Default admin account
-- Username: admin
-- Password: admin123
INSERT INTO admin (id, username, password)
VALUES (
  1,
  'admin',
  'pbkdf2$100000$blood-donation-admin-salt$e7bb24572b98354af4bd56efd44ba0515800fed05e7d36bb971b158a646813ffadf6d168a5e048dacefd37bfe1ba2152a047a3245754a13b5cfc7f2d6385ff1b'
)
ON DUPLICATE KEY UPDATE
  username = VALUES(username),
  password = VALUES(password);

-- Sample donor records for demonstration and viva explanation
INSERT INTO donors (name, email, phone, blood_group, city)
SELECT 'Aman Kumar', 'aman@example.com', '9876543210', 'O+', 'Patna'
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM donors WHERE email = 'aman@example.com');

INSERT INTO donors (name, email, phone, blood_group, city)
SELECT 'Priya Singh', 'priya@example.com', '9123456789', 'A+', 'Delhi'
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM donors WHERE email = 'priya@example.com');

INSERT INTO donors (name, email, phone, blood_group, city)
SELECT 'Rahul Verma', 'rahul@example.com', '9988776655', 'B+', 'Lucknow'
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM donors WHERE email = 'rahul@example.com');
