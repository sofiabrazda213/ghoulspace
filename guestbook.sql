CREATE DATABASE guestbook;

USE guestbook;

CREATE TABLE notes (
    id int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    message TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);