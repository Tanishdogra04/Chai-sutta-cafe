/*
  # Chai Sutta Bar Database Schema

  1. New Tables
    - `users` - User accounts and authentication
      - `id` (int, primary key, auto increment)
      - `name` (varchar, user's full name)
      - `email` (varchar, unique, user's email)
      - `password` (varchar, hashed password)
      - `created_at` (timestamp, account creation date)
    
    - `menu_items` - Restaurant menu items
      - `id` (int, primary key, auto increment)
      - `name` (varchar, item name)
      - `description` (text, item description)
      - `price` (decimal, item price)
      - `category` (varchar, item category)
      - `image_url` (varchar, item image URL)
      - `popular` (boolean, is popular item)
      - `rating` (decimal, item rating)
      - `created_at` (timestamp, item creation date)
    
    - `orders` - Customer orders
      - `id` (int, primary key, auto increment)
      - `user_id` (int, foreign key to users)
      - `items` (json, ordered items)
      - `total` (decimal, order total)
      - `delivery_type` (enum, delivery or pickup)
      - `address` (text, delivery address)
      - `phone` (varchar, contact phone)
      - `payment_method` (varchar, payment method)
      - `instructions` (text, special instructions)
      - `status` (enum, order status)
      - `created_at` (timestamp, order date)
    
    - `order_items` - Individual order items for tracking
      - `id` (int, primary key, auto increment)
      - `order_id` (int, foreign key to orders)
      - `menu_item_id` (varchar, menu item identifier)
      - `quantity` (int, item quantity)
      - `price` (decimal, item price at time of order)
      - `created_at` (timestamp, creation date)
    
    - `contact_messages` - Contact form submissions
      - `id` (int, primary key, auto increment)
      - `name` (varchar, sender name)
      - `email` (varchar, sender email)
      - `phone` (varchar, sender phone)
      - `subject` (varchar, message subject)
      - `message` (text, message content)
      - `created_at` (timestamp, submission date)

  2. Sample Data
    - Pre-populated menu items with authentic Indian chai and snacks
    - Categories: chai, coffee, snacks, beverages
    - Realistic pricing and ratings

  3. Security
    - Password hashing for user accounts
    - Input validation and sanitization
    - Prepared statements to prevent SQL injection
*/

-- Create database
CREATE DATABASE IF NOT EXISTS chai_sutta_bar;
USE chai_sutta_bar;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu items table
CREATE TABLE IF NOT EXISTS menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    popular BOOLEAN DEFAULT FALSE,
    rating DECIMAL(2,1) DEFAULT 4.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    items JSON NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    delivery_type ENUM('delivery', 'pickup') DEFAULT 'delivery',
    address TEXT,
    phone VARCHAR(20) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'online',
    instructions TEXT,
    status ENUM('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Order items table for better tracking
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_item_id VARCHAR(50) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample menu items
INSERT INTO menu_items (name, description, price, category, image_url, popular, rating) VALUES
('Classic Khulhad Chai', 'Traditional masala chai served in authentic clay cup', 25.00, 'chai', 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg', true, 4.8),
('Ginger Adrak Chai', 'Spicy ginger chai perfect for monsoons', 30.00, 'chai', 'https://images.pexels.com/photos/1475554/pexels-photo-1475554.jpeg', true, 4.7),
('Cardamom Elaichi Chai', 'Aromatic cardamom infused premium chai', 35.00, 'chai', 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg', false, 4.6),
('Kulhad Coffee', 'Rich filter coffee in traditional clay cup', 40.00, 'coffee', 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg', false, 4.5),
('Samosa (2 pcs)', 'Crispy triangular pastry with spiced potato filling', 30.00, 'snacks', 'https://images.pexels.com/photos/14737/pexels-photo.jpg', true, 4.4),
('Aloo Tikki', 'Crispy potato patties with chutneys', 35.00, 'snacks', 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg', false, 4.3),
('Bread Pakora', 'Deep-fried bread slices with spiced filling', 25.00, 'snacks', 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg', false, 4.2),
('Special Kulhad Lassi', 'Creamy yogurt drink served in clay cup', 45.00, 'beverages', 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg', true, 4.9),
('Masala Buttermilk', 'Spiced buttermilk with fresh herbs', 25.00, 'beverages', 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg', false, 4.3),
('Kachori (2 pcs)', 'Flaky pastry filled with spiced lentils', 35.00, 'snacks', 'https://images.pexels.com/photos/14737/pexels-photo.jpg', false, 4.5),
('Kulhad Kulfi', 'Traditional Indian ice cream in clay cup', 50.00, 'beverages', 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg', true, 4.8),
('Pani Puri (6 pcs)', 'Crispy shells with spiced water and fillings', 40.00, 'snacks', 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg', true, 4.6);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_menu_items_category ON menu_items(category);
CREATE INDEX idx_menu_items_popular ON menu_items(popular);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);