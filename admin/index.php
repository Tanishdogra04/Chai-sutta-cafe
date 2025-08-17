<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chai Sutta Bar - Admin Panel</title>
    <link rel="stylesheet" href="../css/style.css">
    <style>
        .admin-container {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 1rem;
        }
        
        .admin-header {
            background: #92400e;
            color: white;
            padding: 2rem;
            border-radius: 1rem;
            margin-bottom: 2rem;
            text-align: center;
        }
        
        .admin-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .stat-card {
            background: white;
            padding: 1.5rem;
            border-radius: 1rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            text-align: center;
        }
        
        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            color: #d97706;
            margin-bottom: 0.5rem;
        }
        
        .stat-label {
            color: #6b7280;
            font-weight: 500;
        }
        
        .admin-sections {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .admin-section {
            background: white;
            border-radius: 1rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .section-header {
            background: #fef7e7;
            padding: 1rem 1.5rem;
            border-bottom: 1px solid #fbbf24;
        }
        
        .section-header h3 {
            color: #92400e;
            margin: 0;
        }
        
        .section-content {
            padding: 1.5rem;
            max-height: 400px;
            overflow-y: auto;
        }
        
        .order-item, .message-item {
            padding: 1rem;
            border-bottom: 1px solid #e5e7eb;
            margin-bottom: 1rem;
        }
        
        .order-item:last-child, .message-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        
        .order-status {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .status-pending {
            background: #fef3c7;
            color: #92400e;
        }
        
        .status-confirmed {
            background: #dbeafe;
            color: #1e40af;
        }
        
        .status-delivered {
            background: #dcfce7;
            color: #166534;
        }
        
        .btn-small {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
            border-radius: 0.5rem;
            border: none;
            cursor: pointer;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
        }
        
        .btn-success {
            background: #16a34a;
            color: white;
        }
        
        .btn-warning {
            background: #d97706;
            color: white;
        }
        
        .btn-danger {
            background: #dc2626;
            color: white;
        }
    </style>
</head>
<body>
    <div class="admin-container">
        <div class="admin-header">
            <h1>Chai Sutta Bar - Admin Panel</h1>
            <p>Manage your restaurant operations</p>
        </div>
        
        <div class="admin-stats" id="adminStats">
            <!-- Stats will be loaded here -->
        </div>
        
        <div class="admin-sections">
            <div class="admin-section">
                <div class="section-header">
                    <h3>Recent Orders</h3>
                </div>
                <div class="section-content" id="recentOrders">
                    <!-- Orders will be loaded here -->
                </div>
            </div>
            
            <div class="admin-section">
                <div class="section-header">
                    <h3>Contact Messages</h3>
                </div>
                <div class="section-content" id="contactMessages">
                    <!-- Messages will be loaded here -->
                </div>
            </div>
            
            <div class="admin-section">
                <div class="section-header">
                    <h3>Menu Management</h3>
                </div>
                <div class="section-content">
                    <p>Menu items can be managed through the database or by creating a dedicated menu management interface.</p>
                    <button class="btn-primary" onclick="alert('Feature coming soon!')">Add New Item</button>
                    <button class="btn-secondary" onclick="alert('Feature coming soon!')">Edit Menu</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Load admin data
        document.addEventListener('DOMContentLoaded', function() {
            loadAdminStats();
            loadRecentOrders();
            loadContactMessages();
        });

        function loadAdminStats() {
            // This would typically fetch from your API
            const stats = [
                { label: 'Total Orders', value: '156', icon: 'fas fa-shopping-cart' },
                { label: 'Total Users', value: '89', icon: 'fas fa-users' },
                { label: 'Revenue Today', value: '₹2,450', icon: 'fas fa-rupee-sign' },
                { label: 'Pending Orders', value: '12', icon: 'fas fa-clock' }
            ];
            
            const statsContainer = document.getElementById('adminStats');
            statsContainer.innerHTML = stats.map(stat => `
                <div class="stat-card">
                    <div class="stat-number">${stat.value}</div>
                    <div class="stat-label">${stat.label}</div>
                </div>
            `).join('');
        }

        function loadRecentOrders() {
            // This would typically fetch from your orders API
            const orders = [
                {
                    id: 'CSB001',
                    customer: 'John Doe',
                    total: 125,
                    status: 'pending',
                    time: '10 mins ago'
                },
                {
                    id: 'CSB002',
                    customer: 'Jane Smith',
                    total: 85,
                    status: 'confirmed',
                    time: '25 mins ago'
                },
                {
                    id: 'CSB003',
                    customer: 'Mike Johnson',
                    total: 200,
                    status: 'delivered',
                    time: '1 hour ago'
                }
            ];
            
            const ordersContainer = document.getElementById('recentOrders');
            ordersContainer.innerHTML = orders.map(order => `
                <div class="order-item">
                    <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
                        <strong>Order #${order.id}</strong>
                        <span class="order-status status-${order.status}">${order.status}</span>
                    </div>
                    <div style="color: #6b7280; font-size: 0.875rem;">
                        Customer: ${order.customer}<br>
                        Total: ₹${order.total}<br>
                        ${order.time}
                    </div>
                    <div style="margin-top: 0.5rem;">
                        <button class="btn-small btn-success" onclick="updateOrderStatus('${order.id}', 'confirmed')">Confirm</button>
                        <button class="btn-small btn-warning" onclick="updateOrderStatus('${order.id}', 'preparing')">Preparing</button>
                        <button class="btn-small btn-danger" onclick="updateOrderStatus('${order.id}', 'cancelled')">Cancel</button>
                    </div>
                </div>
            `).join('');
        }

        function loadContactMessages() {
            // This would typically fetch from your contact API
            const messages = [
                {
                    id: 1,
                    name: 'Sarah Wilson',
                    email: 'sarah@email.com',
                    subject: 'Franchise Inquiry',
                    time: '2 hours ago'
                },
                {
                    id: 2,
                    name: 'David Brown',
                    email: 'david@email.com',
                    subject: 'Catering Services',
                    time: '5 hours ago'
                },
                {
                    id: 3,
                    name: 'Lisa Davis',
                    email: 'lisa@email.com',
                    subject: 'Feedback',
                    time: '1 day ago'
                }
            ];
            
            const messagesContainer = document.getElementById('contactMessages');
            messagesContainer.innerHTML = messages.map(message => `
                <div class="message-item">
                    <div style="margin-bottom: 0.5rem;">
                        <strong>${message.name}</strong>
                        <div style="color: #6b7280; font-size: 0.875rem;">${message.email}</div>
                    </div>
                    <div style="color: #92400e; font-weight: 500; margin-bottom: 0.25rem;">
                        ${message.subject}
                    </div>
                    <div style="color: #6b7280; font-size: 0.875rem;">
                        ${message.time}
                    </div>
                </div>
            `).join('');
        }

        function updateOrderStatus(orderId, status) {
            // This would typically send a request to your API
            alert(`Order ${orderId} status updated to: ${status}`);
            // Reload orders after update
            loadRecentOrders();
        }
    </script>
</body>
</html>