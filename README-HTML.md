# Chai Sutta Bar Website - HTML/CSS/JS/PHP Version

A complete conversion of the React-based Chai Sutta Bar website to vanilla HTML, CSS, JavaScript with PHP backend.

## Features

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Backend**: PHP with MySQL database
- **Responsive Design**: Mobile-first approach with Tailwind-inspired styling
- **User Authentication**: Login/signup with secure password hashing
- **Online Ordering**: Shopping cart and order management
- **Admin Panel**: Basic admin interface for managing orders
- **Contact System**: Contact form with database storage

## File Structure

```
chai-sutta-bar/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styles
├── js/
│   └── app.js             # JavaScript functionality
├── api/                   # PHP backend
│   ├── config/
│   │   └── database.php   # Database configuration
│   ├── auth.php           # Authentication endpoints
│   ├── orders.php         # Order management
│   ├── contact.php        # Contact form handler
│   └── menu.php           # Menu items API
├── admin/
│   └── index.php          # Admin panel
├── database/
│   └── schema.sql         # Database schema
├── .htaccess              # Apache configuration
└── Kulhad making.mp4      # Hero video
```

## Installation & Setup

### Prerequisites
- Web server (Apache/Nginx)
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Modern web browser

### Database Setup

1. **Create Database**:
   ```sql
   CREATE DATABASE chai_sutta_bar;
   ```

2. **Import Schema**:
   ```bash
   mysql -u username -p chai_sutta_bar < database/schema.sql
   ```

3. **Configure Database**:
   Edit `api/config/database.php`:
   ```php
   $host = 'localhost';
   $dbname = 'chai_sutta_bar';
   $username = 'your_username';
   $password = 'your_password';
   ```

### Web Server Setup

1. **Upload Files**: Copy all files to your web server directory
2. **Set Permissions**: Ensure PHP files have proper permissions
3. **Configure .htaccess**: Modify if needed for your server setup

### Local Development

Using PHP built-in server:
```bash
php -S localhost:8000
```

## API Endpoints

### Authentication
- `POST /api/auth.php` - Login/signup
  ```json
  {
    "action": "login",
    "email": "user@example.com",
    "password": "password"
  }
  ```

### Orders
- `POST /api/orders.php` - Place order
- `GET /api/orders.php?user_id=1` - Get user orders

### Menu
- `GET /api/menu.php` - Get all menu items
- `GET /api/menu.php?category=chai` - Get items by category

### Contact
- `POST /api/contact.php` - Submit contact form

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Menu Items Table
```sql
CREATE TABLE menu_items (
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
```

### Orders Table
```sql
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
    status ENUM('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Key Features

### Frontend JavaScript
- **Single Page Application**: Dynamic section switching
- **Shopping Cart**: Add/remove items, quantity management
- **User Authentication**: Login/signup modals
- **Responsive Design**: Mobile-friendly interface
- **Form Validation**: Client-side validation
- **Image Gallery**: Filterable gallery with modal view

### Backend PHP
- **Secure Authentication**: Password hashing with `password_hash()`
- **Prepared Statements**: SQL injection prevention
- **JSON API**: RESTful API endpoints
- **Error Handling**: Comprehensive error responses
- **CORS Support**: Cross-origin request handling

### Admin Panel
- **Order Management**: View and update order status
- **Contact Messages**: View customer inquiries
- **Statistics Dashboard**: Basic analytics
- **Responsive Interface**: Mobile-friendly admin panel

## Security Features

- **Password Hashing**: Secure password storage
- **Prepared Statements**: SQL injection prevention
- **Input Validation**: Server-side validation
- **CORS Headers**: Proper cross-origin handling
- **Error Handling**: Secure error messages

## Customization

### Styling
- Edit `css/style.css` for design changes
- Color scheme based on amber/orange palette
- Responsive breakpoints included

### Menu Items
- Update database directly or through admin panel
- Images use Pexels URLs (replace with your own)
- Categories: chai, coffee, snacks, beverages

### Business Information
- Update contact details in HTML
- Modify footer information
- Change business hours and locations

## Production Deployment

### Server Requirements
- PHP 7.4+
- MySQL 5.7+
- Apache/Nginx with mod_rewrite
- SSL certificate recommended

### Performance Optimization
- Enable gzip compression
- Set proper cache headers
- Optimize images
- Minify CSS/JS (optional)

### Security Checklist
- [ ] Change default database credentials
- [ ] Enable HTTPS
- [ ] Set proper file permissions
- [ ] Configure firewall rules
- [ ] Regular security updates

## Demo Credentials

**Frontend Login**:
- Email: `demo@chaisuttabar.com`
- Password: `password`

**Database Sample Data**:
- Pre-populated menu items
- Sample categories and pricing
- Realistic ratings and descriptions

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Common Issues

1. **Database Connection Failed**:
   - Check database credentials in `api/config/database.php`
   - Ensure MySQL service is running
   - Verify database exists

2. **API Endpoints Not Working**:
   - Check `.htaccess` configuration
   - Ensure mod_rewrite is enabled
   - Verify file permissions

3. **Images Not Loading**:
   - Check image URLs in database
   - Ensure internet connection for external images
   - Replace with local images if needed

4. **JavaScript Errors**:
   - Check browser console for errors
   - Ensure all files are properly uploaded
   - Verify file paths are correct

## Support

For technical support or questions:
- Check the troubleshooting section
- Review browser console for errors
- Ensure all files are properly configured
- Test with demo credentials first

---

**Note**: This is a complete HTML/CSS/JS/PHP conversion of the original React application, maintaining all functionality while using traditional web technologies.