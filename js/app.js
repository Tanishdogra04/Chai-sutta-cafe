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
        image: './assets/images/Khulhad-chai.jpg',
        category: 'chai',
        popular: true,
        rating: 4.8
    },
    {
        id: '2',
        name: 'Ginger Adrak Chai',
        description: 'Spicy ginger chai perfect for monsoons',
        price: 30,
        image: '/assets/images/adrak.webp',
        category: 'chai',
        popular: true,
        rating: 4.7
    },
    {
        id: '3',
        name: 'Cardamom Elaichi Chai',
        description: 'Aromatic cardamom infused premium chai',
        price: 35,
        image: '/assets/images/elichi.avif',
        category: 'chai',
        popular: false,
        rating: 4.6
    },
    {
        id: '4',
        name: 'Coffee',
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
        image: '/assets/images/samosa.jpeg',
        category: 'snacks',
        popular: true,
        rating: 4.4
    },
    {
        id: '6',
        name: 'Aloo Tikki',
        description: 'Crispy potato patties with chutneys',
        price: 35,
        image: '/assets/images/aloo-tiki.jpg',
        category: 'snacks',
        popular: false,
        rating: 4.3
    },
    {
        id: '7',
        name: 'Bread Pakora',
        description: 'Deep-fried bread slices with spiced filling',
        price: 25,
        image: '/assets/images/bread.jpeg',
        category: 'snacks',
        popular: false,
        rating: 4.2
    },
    {
        id: '8',
        name: 'Special Kulhad Lassi',
        description: 'Creamy yogurt drink served in clay cup',
        price: 45,
        image: '/assets/images/lassi.webp',
        category: 'beverages',
        popular: true,
        rating: 4.9
    },
     {
        id: '9',
        name: 'Rasmalai',
        description: 'Creamy yogurt served in clay cup',
        price: 45,
        image: '/assets/images/rasmalai.jpg',
        category: 'beverages',
        popular: true,
        rating: 4.9
    },
    {
         id: '10',
        name: 'cappuccino coffee',
        description: 'Rich filter coffee in traditional clay cup',
        price: 40,
        image: '/assets/images/cap2.jpeg',
        category: 'coffee',
        popular: false,
        rating: 4.5
    }
];

// Gallery items data
const galleryItems = [
    {
        id: 1,
        url: '/assets/images/Khulhad-chai.jpg',
        title: 'Authentic Khulhad Chai',
        category: 'drinks'
    },
    {
        id: 2,
        url: '/assets/images/traditional-tea.jpg',
        title: 'Traditional Tea Making',
        category: 'process'
    },
    {
        id: 3,
        url: '/assets/images/interior1.jpeg',
        title: 'Cozy Interior',
        category: 'ambiance'
    },
    {
        id: 4,
        url: '/assets/images/bread.jpeg',
        title: 'Fresh Snacks',
        category: 'food'
    },
    {
        id: 5,
        url: '/assets/images/customer.jpeg',
        title: 'Happy Customers',
        category: 'customers'
    },
    {
        id: 6,
        url: '/assets/images/elichi.avif',
        title: 'Masala Chai',
        category: 'drinks'
    },
    {
        id: 7,
        url: '/assets/images/tea-leaves.jpg',
        title: 'Tea Leaves',
        category: 'process'
    },
    {
        id: 8,
        url: '/assets/images/outdoor.jpeg',
        title: 'Outdoor Seating',
        category: 'ambiance'
    },
    {
        id: 9,
        url: '/assets/images/street.jpeg',
        title: 'Street Food',
        category: 'food'
    },
    {
    id: 10,
    url: '/assets/images/customer-2.avif',
    title: 'Happy Customer 2',
    category: 'customers'
},
{
    id: 11,
    url: '/assets/images/customer-3.avif',
    title: 'Customer Enjoying Chai',
    category: 'customers'
},
{
        id: 12,
        url: '/assets/images/outlet.avif',
        title: 'Beautiful Ambiance',
        category: 'ambiance'
    },
    
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

//* ===== Franchise modal + UI wiring (paste at end of app.js) ===== */

// Open franchise modal (creates it once)
function openFranchiseModal() {
  // If modal already present just show & focus
  let existing = document.getElementById('franchiseModal');
  if (existing) {
    existing.classList.add('show');
    const firstInput = existing.querySelector('input[name="name"]');
    firstInput?.focus();
    return;
  }

  const modal = document.createElement('div');
  modal.className = 'modal show';
  modal.id = 'franchiseModal';
  modal.innerHTML = `
    <div class="modal-inner" role="dialog" aria-modal="true" aria-labelledby="frModalTitle" style="max-width:700px; margin:4rem auto; background:white; padding:2rem; border-radius:8px; position:relative;">
      <button type="button" id="frModalCloseBtn" aria-label="Close" style="position:absolute; right:10px; top:10px; background:none; border:none; font-size:1.25rem; cursor:pointer;">&times;</button>
      <h3 id="frModalTitle">Apply for Franchise</h3>
      <p>Fill the quick form and our team will reach out.</p>
      <form id="franchiseModalForm" class="franchise-modal-form" novalidate>
        <div style="display:flex; gap:1rem; margin-bottom:0.75rem;">
          <input name="name" placeholder="Full name" required>
          <input name="email" type="email" placeholder="Email" required>
        </div>
        <div style="display:flex; gap:1rem; margin-bottom:0.75rem;">
          <input name="phone" placeholder="Phone" required>
          <input name="city" placeholder="City" required>
        </div>
        <textarea name="message" rows="4" placeholder="Message (optional)"></textarea>
        <div style="margin-top:0.75rem;">
          <button type="submit" class="btn-primary">Submit</button>
          <button type="button" class="btn-secondary" id="frModalCancelBtn">Cancel</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  // Focus first input
  modal.querySelector('input[name="name"]')?.focus();

  // Close handlers
  function close() {
    modal.remove();
    document.removeEventListener('keydown', onKeyDown);
  }

  document.getElementById('frModalCloseBtn')?.addEventListener('click', close);
  document.getElementById('frModalCancelBtn')?.addEventListener('click', close);

  // click outside to close
  modal.addEventListener('click', function(ev) {
    if (ev.target === modal) close();
  });

  // Esc to close
  function onKeyDown(e) {
    if (e.key === 'Escape') close();
  }
  document.addEventListener('keydown', onKeyDown);

  // submit handler
  const frm = document.getElementById('franchiseModalForm');
  if (frm) {
    frm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!frm.checkValidity()) {
        frm.reportValidity();
        return;
      }
      const data = Object.fromEntries(new FormData(frm).entries());
      console.log('Franchise modal application:', data);
      if (typeof showNotification === 'function') showNotification('Franchise application submitted! We will contact you soon.');
      else alert('Franchise application submitted! We will contact you soon.');
      close();
    });
  }
}

// Close franchise modal (helper if you need to call it externally)
function closeFranchiseModal() {
  const m = document.getElementById('franchiseModal');
  if (m) m.remove();
}

// Inline franchise form (section) handling + UI wiring
(function franchiseInit() {
  // Flipcard behaviour: click to toggle; keyboard toggle with Enter/Space; touch-friendly
  const flipcards = document.querySelectorAll('.flipcard');
  flipcards.forEach(card => {
    // click / tap
    card.addEventListener('click', () => card.classList.toggle('flipped'));

    // keyboard accessibility
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        card.classList.toggle('flipped');
      } else if (e.key === 'Escape') {
        card.classList.remove('flipped');
      }
    });

    // blur -> remove flipped after small delay
    card.addEventListener('blur', () => setTimeout(() => card.classList.remove('flipped'), 300));
  });

  // Request Kit button: prefill contact subject and activate contact section
  document.getElementById('requestKitBtn')?.addEventListener('click', () => {
    const subjectInput = document.getElementById('subject');
    if (subjectInput) subjectInput.value = 'franchise';
    if (typeof setActiveSection === 'function') setActiveSection('contact');
    else location.hash = '#contact';
  });

  // Open apply modal
  document.getElementById('openFranchiseApplyBtn')?.addEventListener('click', () => {
    if (typeof openFranchiseModal === 'function') openFranchiseModal();
    else if (typeof setActiveSection === 'function') setActiveSection('franchise');
  });

  // Reset button for inline form
  document.getElementById('frResetBtn')?.addEventListener('click', () => {
    document.getElementById('franchiseForm')?.reset();
  });

  // Inline franchise form submit (section form)
  const frForm = document.getElementById('franchiseForm');
  if (frForm) {
    frForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!frForm.checkValidity()) {
        frForm.reportValidity();
        return;
      }
      const data = Object.fromEntries(new FormData(frForm).entries());
      console.log('Franchise application (section):', data);
      if (typeof showNotification === 'function') showNotification('Application received! Our team will contact you shortly.');
      else alert('Application received! Our team will contact you shortly.');
      frForm.reset();
      // TODO: send to backend via fetch() if you have an API
    });
  }
})();

/* ===== Careers JS: job filters, search, apply modal ===== */
(function careersSetup() {
  // prepare jobs data (optional - can be remote)
  const jobsGrid = document.getElementById('jobsGrid');

  // job filter buttons
  const jobFilterBtns = document.querySelectorAll('.jobs-filter .filter-btn');
  jobFilterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      jobFilterBtns.forEach(b=>b.classList.remove('active'));
      this.classList.add('active');
      const role = this.getAttribute('data-role');
      filterJobs(role);
    });
  });

  // search
  const jobSearch = document.getElementById('jobSearch');
  jobSearch?.addEventListener('input', () => {
    const q = jobSearch.value.trim().toLowerCase();
    filterJobs(document.querySelector('.jobs-filter .filter-btn.active')?.getAttribute('data-role') || 'all', q);
  });

  function filterJobs(role='all', q='') {
    const cards = jobsGrid.querySelectorAll('.job-card');
    cards.forEach(card => {
      const cardRole = card.getAttribute('data-role') || 'all';
      const title = card.querySelector('.job-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.job-desc')?.textContent.toLowerCase() || '';
      const matchesRole = (role === 'all') || (cardRole === role);
      const matchesQuery = !q || title.includes(q) || desc.includes(q);
      card.style.display = (matchesRole && matchesQuery) ? '' : 'none';
    });
  }

  // Apply buttons -> open modal with job prefilled
  document.querySelectorAll('.apply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const jobTitle = btn.getAttribute('data-job') || 'Application';
      openJobApplyModal(jobTitle);
    });
  });

  // Function: open apply modal
  function openJobApplyModal(jobTitle) {
    // reuse franchise modal pattern but with job-specific form
    if (document.getElementById('jobApplyModal')) {
      document.getElementById('jobApplyModal').classList.add('show');
      return;
    }
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.id = 'jobApplyModal';
    modal.innerHTML = `
      <div class="modal-inner" role="dialog" aria-modal="true" style="max-width:720px; margin:4rem auto; background:white; padding:1.25rem; border-radius:8px; position:relative;">
        <button type="button" id="jobModalClose" aria-label="Close" style="position:absolute; right:10px; top:10px; background:none; border:none; font-size:1.25rem; cursor:pointer;">&times;</button>
        <h3>Apply for: ${jobTitle}</h3>
        <form id="jobApplyForm" class="job-apply-form" enctype="multipart/form-data" novalidate>
          <div style="display:flex; gap:1rem; margin-top:0.75rem;">
            <input name="name" placeholder="Full name" required>
            <input name="email" type="email" placeholder="Email" required>
          </div>
          <div style="display:flex; gap:1rem; margin-top:0.5rem;">
            <input name="phone" placeholder="Phone" required>
            <input name="city" placeholder="City" required>
          </div>
          <div style="margin-top:0.5rem;">
            <label>Upload CV (optional)</label>
            <input type="file" name="cv" accept=".pdf,.doc,.docx">
          </div>
          <div style="margin-top:0.5rem;">
            <textarea name="message" rows="3" placeholder="Anything we should know?"></textarea>
          </div>
          <div style="margin-top:0.75rem; display:flex; gap:0.5rem;">
            <button type="submit" class="btn-primary">Send Application</button>
            <button type="button" class="btn-secondary" id="jobApplyCancel">Cancel</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    // close handlers
    document.getElementById('jobModalClose')?.addEventListener('click', ()=> modal.remove());
    document.getElementById('jobApplyCancel')?.addEventListener('click', ()=> modal.remove());
    modal.addEventListener('click', (e)=> e.target === modal && modal.remove());
    document.addEventListener('keydown', function escClose(e){ if (e.key === 'Escape') { modal.remove(); document.removeEventListener('keydown', escClose); } });

    // submit handler
    const jForm = document.getElementById('jobApplyForm');
    jForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!jForm.checkValidity()) { jForm.reportValidity(); return; }
      const formData = new FormData(jForm);
      formData.append('position', jobTitle);
      // TODO: POST to your API: fetch('/api/apply', { method:'POST', body: formData })
      console.log('Job application:', Object.fromEntries(formData.entries()));
      if (typeof showNotification === 'function') showNotification('Application sent! We will contact you soon.');
      else alert('Application sent! We will contact you soon.');
      modal.remove();
    });
  }

  // small helper for View button (can be expanded)
  window.openJobDetails = function(title) {
    alert(title + '\\nDetailed job description can be added here or in a modal.');
  };
})();
