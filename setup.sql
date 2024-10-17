CREATE DATABASE IF NOT EXISTS arbeidskrav_adam_maltsagov;

USE arbeidskrav_adam_maltsagov;

CREATE TABLE IF NOT EXISTS adminUsers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* 
Get-Content .\setup.sql | mysql -u student -p"Rm61C64(ei(J"
 */