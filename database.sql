CREATE DATABASE user_database;

--\c into user_database

CREATE TABLE client (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password CHAR(255),
    fName VARCHAR(255),
    lName VARCHAR(255),
    gender VARCHAR(255),
    date DATE,
    postCode INT
);
