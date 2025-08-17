-- --------------------------------------------------
-- Chai Sutta Bar : Database Schema + Seed Data
-- --------------------------------------------------
-- Works with MySQL 5.7+ or MariaDB 10.2+ (JSON supported)
-- --------------------------------------------------

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- Clean up if tables exist
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- USERS table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- MENU ITEMS table
CREATE TABLE menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    popular BOOLEAN DEFAULT FALSE,
    rating DECIMAL(2,1) DEFAULT 4.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_popular (popular)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ORDERS table
-- Note: JSON type requires MySQL 5.7+ or MariaDB 10.2+
-- If your server is older, replace `items JSON` with `items LONGTEXT`
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    items JSON NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    delivery_type ENUM('delivery', 'pickup') DEFAULT 'delivery',
    address TEXT,
    phone VARCHAR(20) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'online',
    instructions TEXT,
    status ENUM('pending','confirmed','preparing','ready','delivered','cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_status_created (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------
-- Seed Data
-- --------------------------------------------------

-- Demo User (email: demo@chaisuttabar.com / password: password)
INSERT INTO users (name, email, password) VALUES
('Demo User', 'demo@chaisuttabar.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9JJrczQ.8IW3j5IrYOE4a');

-- Menu Items
INSERT INTO menu_items (name, description, price, category, image_url, popular, rating) VALUES
('Kulhad Chai', 'Classic masala chai served in a clay kulhad.', 29.00, 'chai', 'https://images.pexels.com/photos/302902/pexels-photo-302902.jpeg', TRUE, 4.7),
('Adrak Elaichi Chai', 'Ginger & cardamom infused strong chai.', 35.00, 'chai', 'https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg', TRUE, 4.6),
('Iced Coffee', 'Chilled coffee with a smooth finish.', 79.00, 'coffee', 'https://images.pexels.com/photos/976186/pexels-photo-976186.jpeg', FALSE, 4.3),
('Paneer Puff', 'Flaky pastry stuffed with spiced paneer.', 49.00, 'snacks', 'https://images.pexels.com/photos/4109103/pexels-photo-4109103.jpeg', TRUE, 4.5);

-- Example Test Order
INSERT INTO orders (user_id, items, total, delivery_type, address, phone, payment_method, instructions, status)
VALUES (
    (SELECT id FROM users WHERE email='demo@chaisuttabar.com'),
    JSON_ARRAY(JSON_OBJECT('id', 1, 'qty', 2), JSON_OBJECT('id', 4, 'qty', 1)),
    107.00,
    'pickup',
    'Store Pickup - Main Street',
    '9999999999',
    'online',
    'No sugar in chai.',
    'confirmed'
);
