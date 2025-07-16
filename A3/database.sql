-- Create the database
CREATE DATABASE IF NOT EXISTS `library`;

-- Use the database
USE `library`;

-- Create the users table
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL
);

-- Create the books table
CREATE TABLE IF NOT EXISTS `books` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `author` VARCHAR(255) NOT NULL,
    `genre` VARCHAR(255) NOT NULL,
    `year` INT NOT NULL,
    `user_id` INT,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

-- Insert users
INSERT INTO `users` (`username`) VALUES
('dorsa'),
('testuser'),
('anotheruser');

-- Insert books
INSERT INTO `books` (`title`, `author`, `genre`, `year`, `user_id`) VALUES
('Neuromancer', 'William Gibson', 'Sci-Fi', 1984, 1),
('Sapiens', 'Yuval Noah Harari', 'History', 2011, 1),
('1984', 'George Orwell', 'Dystopian', 1949, 1),
('Anne Shirley', 'Lucy Maud', 'Fiction', 1908, 1),
('The Lord of the Rings', 'J.R.R. Tolkien', 'Fiction', 1954, 2),
('Dune', 'Frank Herbert', 'Sci-Fi', 1965, 2),
('A Brief History of Time', 'Stephen Hawking', 'History', 1988, 3);
