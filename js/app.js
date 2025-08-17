// Global variables
let currentUser = null;
let cart = [];
let isLoginMode = true;

// Menu items data
const menuItems = [
    {
        id: '1',
        name: 'Classic Khulhad Chai',
        description: 'Traditional masala chai served in authentic clay cup',
        price: 25,
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        category: 'chai',
        popular: true,
        rating: 4.8
    },
    {
        id: '2',
        name: 'Ginger Adrak Chai',
        description: 'Spicy ginger chai perfect for monsoons',
        price: 30,
        image: 'https://images.pexels.com/photos/1475554/pexels-photo-1475554.jpeg',
        category: 'chai',
        popular: true,
        rating: 4.7
    },
    {
        id: '3',
        name: 'Cardamom Elaichi Chai',
        description: 'Aromatic cardamom infused premium chai',
        price: 35,
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        category: 'chai',
        popular: false,
        rating: 4.6
    },
    {
        id: '4',
        name: 'Kulhad Coffee',
        description: 'Rich filter coffee in traditional clay cup',
        price: 40,
        image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
        category: 'coffee',
        popular: false,
        rating: 4.5
    },
    {
        id: '5',
        name: 'Samosa (2 pcs)',
        description: 'Crispy triangular pastry with spiced potato filling',
        price: 30,
        image: 'https://images.pexels.com/photos/14737/pexels-photo.jpg',
        category: 'snacks',
        popular: true,
        rating: 4.4
    },
    {
        id: '6',
        name: 'Aloo Tikki',
        description: 'Crispy potato patties with chutneys',
        price: 35,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
        category: 'snacks',
        popular: false,
        rating: 4.3
    },
    {
        id: '7',
        name: 'Bread Pakora',
        description: 'Deep-fried bread slices with spiced filling',
        price: 25,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
        category: 'snacks',
        popular: false,
        rating: 4.2
    },
    {
        id: '8',
        name: 'Special Kulhad Lassi',
        description: 'Creamy yogurt drink served in clay cup',
        price: 45,
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        category: 'beverages',
        popular: true,
        rating: 4.9
    }
];

// Gallery items data
const galleryItems = [
    {
        id: 1,
        url: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        title: 'Authentic Khulhad Chai',
        category: 'drinks'
    },
    {
        id: 2,
        url: 'https://images.pexels.com/photos/1475554/pexels-photo-1475554.jpeg',
        title: 'Traditional Tea Making',
        category: 'process'
    },
    {
        id: 3,
        url: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
        title: 'Cozy Interior',
        category: 'ambiance'
    },
    {
        id: 4,
        url: 'https://images.pexels.com/photos/14737/pexels-photo.jpg',
        title: 'Fresh Snacks',
        category: 'food'
    },
    {
        id: 5,
        url: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
        title: 'Happy Customers',
        category: 'customers'
    },
    {
        id: 6,
        url: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        title: 'Masala Chai',
        category: 'drinks'
    },
    {
        id: 7,
        url: 'https://images.pexels.com/photos/1475554/pexels-photo-1475554.jpeg',
        title: 'Tea Leaves',
        category: 'process'
    },
    {
        id: 8,
        url: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
        title: 'Outdoor Seating',
        category: 'ambiance'
    },
    {
        id: 9,
        url: 'https://images.pexels.com/photos/14737/pexels-photo.jpg',
        title: 'Street Food',
        category: 'food'
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize application
function initializeApp() {
    setupNavigation();
    loadMenuItems();
    loadGalleryItems();
    setupEventListeners();
    updateCartDisplay();
    updateAuthDisplay();
}

// Navigation setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            setActiveSection(section);
            
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            mobileMenu.classList.remove('show');
        });
    });
}

// Set active section
function setActiveSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionName) {
            link.classList.add('active');
        }
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn i');
    
    mobileMenu.classList.toggle('show');
    
    if (mobileMenu.classList.contains('show')) {
        menuBtn.className = 'fas fa-times';
    } else {
        menuBtn.className = 'fas fa-bars';
    }
}

// Load menu items
function loadMenuItems(category = 'all') {
    const menuGrid = document.getElementById('menuGrid');
    const filteredItems = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);
    
    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item" data-category="${item.category}">
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}">
                ${item.popular ? '<div class="popular-badge">Popular</div>' : ''}
                <button class="favorite-btn" onclick="toggleFavorite('${item.id}')">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-title">${item.name}</h3>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <span>${item.rating}</span>
                    </div>
                </div>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-footer">
                    <div class="menu-item-price">₹${item.price}</div>
                    <button class="add-to-cart-btn" onclick="addToCart('${item.id}')">
                        <i class="fas fa-plus"></i>
                        Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Setup menu filter buttons
    setupMenuFilters();
}

// Setup menu filters
function setupMenuFilters() {
    const filterBtns = document.querySelectorAll('.menu-filters .filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter menu items
            const category = this.getAttribute('data-category');
            loadMenuItems(category);
        });
    });
}

// Load gallery items
function loadGalleryItems(category = 'all') {
    const galleryGrid = document.getElementById('galleryGrid');
    const filteredItems = category === 'all' ? galleryItems : galleryItems.filter(item => item.category === category);
    
    galleryGrid.innerHTML = filteredItems.map(item => `
        <div class="gallery-item" data-category="${item.category}" onclick="openImageModal('${item.url}')">
            <img src="${item.url}" alt="${item.title}">
            <div class="gallery-overlay">
                <div class="gallery-info">
                    <h3>${item.title}</h3>
                    <p>${item.category}</p>
                </div>
            </div>
        </div>
    `).join('');
    
    // Setup gallery filter buttons
    setupGalleryFilters();
}

// Setup gallery filters
function setupGalleryFilters() {
    const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter gallery items
            const category = this.getAttribute('data-category');
            loadGalleryItems(category);
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Auth form
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', handleAuthForm);
    }
    
    // Order form
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderForm);
    }
    
    // Delivery type change
    const deliveryInputs = document.querySelectorAll('input[name="deliveryType"]');
    deliveryInputs.forEach(input => {
        input.addEventListener('change', updateDeliveryFee);
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
}

// Toggle favorite
function toggleFavorite(itemId) {
    const favoriteBtn = event.target.closest('.favorite-btn');
    favoriteBtn.classList.toggle('active');
}

// Add to cart
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (!item) return;
    
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showNotification(`${item.name} added to cart!`);
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Update auth display
function updateAuthDisplay() {
    const authBtn = document.querySelector('.auth-btn span');
    if (currentUser) {
        authBtn.textContent = `Welcome, ${currentUser.name}`;
        authBtn.parentElement.onclick = logout;
    } else {
        authBtn.textContent = 'Login';
        authBtn.parentElement.onclick = openAuthModal;
    }
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #16a34a;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Modal functions
function openAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.add('show');
    updateAuthModalMode();
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.remove('show');
    resetAuthForm();
}

function openCartModal() {
    const modal = document.getElementById('cartModal');
    modal.classList.add('show');
    updateCartModal();
}

function closeCartModal() {
    const modal = document.getElementById('cartModal');
    modal.classList.remove('show');
}

function openOrderModal() {
    if (!currentUser) {
        showNotification('Please login to place an order');
        openAuthModal();
        return;
    }
    
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }
    
    const modal = document.getElementById('orderModal');
    modal.classList.add('show');
    updateOrderModal();
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    modal.classList.remove('show');
}

function openSuccessModal() {
    const modal = document.getElementById('successModal');
    const orderIdNumber = document.getElementById('orderIdNumber');
    orderIdNumber.textContent = Date.now().toString().slice(-6);
    modal.classList.add('show');
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.classList.remove('show'));
}

// Auth functions
function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    updateAuthModalMode();
}

function updateAuthModalMode() {
    const title = document.getElementById('authTitle');
    const nameGroup = document.getElementById('nameGroup');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
    const submitBtn = document.getElementById('authSubmitBtn');
    const toggleText = document.getElementById('authToggleText');
    const toggleBtn = document.getElementById('authToggleBtn');
    
    if (isLoginMode) {
        title.textContent = 'Welcome Back!';
        nameGroup.style.display = 'none';
        confirmPasswordGroup.style.display = 'none';
        submitBtn.textContent = 'Sign In';
        toggleText.innerHTML = `Don't have an account? <button type="button" id="authToggleBtn" onclick="toggleAuthMode()">Sign Up</button>`;
    } else {
        title.textContent = 'Join Us';
        nameGroup.style.display = 'block';
        confirmPasswordGroup.style.display = 'block';
        submitBtn.textContent = 'Sign Up';
        toggleText.innerHTML = `Already have an account? <button type="button" id="authToggleBtn" onclick="toggleAuthMode()">Sign In</button>`;
    }
}

function resetAuthForm() {
    const form = document.getElementById('authForm');
    form.reset();
    isLoginMode = true;
}

function handleAuthForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');
    const confirmPassword = formData.get('confirmPassword');
    
    if (isLoginMode) {
        // Login logic
        if (email === 'demo@chaisuttabar.com' && password === 'password') {
            currentUser = { id: '1', name: 'Demo User', email: email };
            updateAuthDisplay();
            closeAuthModal();
            showNotification('Login successful!');
        } else {
            showNotification('Invalid credentials. Try demo@chaisuttabar.com / password');
        }
    } else {
        // Signup logic
        if (password !== confirmPassword) {
            showNotification('Passwords do not match');
            return;
        }
        
        currentUser = { id: Date.now().toString(), name: name, email: email };
        updateAuthDisplay();
        closeAuthModal();
        showNotification('Account created successfully!');
    }
}

function logout() {
    currentUser = null;
    updateAuthDisplay();
    showNotification('Logged out successfully');
}

// Cart functions
function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; color: #d1d5db; margin-bottom: 1rem;"></i>
                <h3 style="color: #6b7280; margin-bottom: 0.5rem;">Your cart is empty</h3>
                <p style="color: #9ca3af; font-size: 0.875rem;">Add some delicious items from our menu!</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total;
}

function updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(itemId);
        return;
    }
    
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        updateCartDisplay();
        updateCartModal();
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
    updateCartModal();
}

function clearCart() {
    cart = [];
    updateCartDisplay();
    updateCartModal();
    showNotification('Cart cleared');
}

function proceedToCheckout() {
    closeCartModal();
    openOrderModal();
}

// Order functions
function updateOrderModal() {
    const orderEmail = document.getElementById('orderEmail');
    const orderItemCount = document.getElementById('orderItemCount');
    const orderSubtotal = document.getElementById('orderSubtotal');
    
    if (currentUser) {
        orderEmail.value = currentUser.email;
    }
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    orderItemCount.textContent = totalItems;
    orderSubtotal.textContent = subtotal;
    
    updateDeliveryFee();
}

function updateDeliveryFee() {
    const deliveryType = document.querySelector('input[name="deliveryType"]:checked').value;
    const deliveryFeeRow = document.getElementById('deliveryFeeRow');
    const deliveryFee = document.getElementById('deliveryFee');
    const orderTotal = document.getElementById('orderTotal');
    const orderTotalBtn = document.getElementById('orderTotalBtn');
    const addressSection = document.getElementById('addressSection');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let fee = 0;
    
    if (deliveryType === 'delivery') {
        fee = 20;
        deliveryFeeRow.style.display = 'flex';
        addressSection.style.display = 'block';
        document.getElementById('orderAddress').required = true;
    } else {
        fee = 0;
        deliveryFeeRow.style.display = 'none';
        addressSection.style.display = 'none';
        document.getElementById('orderAddress').required = false;
    }
    
    deliveryFee.textContent = fee;
    const total = subtotal + fee;
    orderTotal.textContent = total;
    orderTotalBtn.textContent = total;
}

function handleOrderForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const orderData = {
        user_id: currentUser.id,
        items: cart,
        total: parseInt(document.getElementById('orderTotal').textContent),
        delivery_type: formData.get('deliveryType'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        payment_method: formData.get('paymentMethod'),
        instructions: formData.get('instructions')
    };
    
    // Simulate order processing
    setTimeout(() => {
        closeOrderModal();
        openSuccessModal();
        clearCart();
    }, 1000);
    
    showNotification('Processing your order...');
}

// Contact form
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Thank you for contacting us! We will get back to you soon.');
        e.target.reset();
    }, 1000);
    
    showNotification('Sending message...');
}

// Image modal (for gallery)
function openImageModal(imageUrl) {
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
        <div style="position: relative; max-width: 90%; max-height: 90%; margin: auto;">
            <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 2rem; cursor: pointer;">
                <i class="fas fa-times"></i>
            </button>
            <img src="${imageUrl}" style="max-width: 100%; max-height: 100%; border-radius: 0.5rem;" alt="Gallery Image">
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;
document.head.appendChild(style);