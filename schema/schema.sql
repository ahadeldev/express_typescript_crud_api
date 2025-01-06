-- create database
CREATE DATABASE ts_crud;

-- create table in the database
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- create user for the api
CREATE USER ts_user WITH PASSWORD 'ts_pass';

-- give users permissions to interact with the database and its tables
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public to ts_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public to ts_user;
GRANT USAGE ON SCHEMA public TO ts_user;
GRANT CREATE ON SCHEMA public TO ts_user;
