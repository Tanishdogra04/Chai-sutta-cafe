<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include 'config/database.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $user_id = $input['user_id'] ?? '';
    $items = $input['items'] ?? [];
    $total = $input['total'] ?? 0;
    $delivery_type = $input['delivery_type'] ?? 'delivery';
    $address = $input['address'] ?? '';
    $phone = $input['phone'] ?? '';
    $payment_method = $input['payment_method'] ?? 'online';
    $instructions = $input['instructions'] ?? '';
    
    // Validation
    if (empty($user_id) || empty($items) || $total <= 0 || empty($phone)) {
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
        exit;
    }
    
    if ($delivery_type === 'delivery' && empty($address)) {
        echo json_encode(['success' => false, 'message' => 'Address is required for delivery']);
        exit;
    }
    
    try {
        // Start transaction
        $pdo->beginTransaction();
        
        // Insert order
        $stmt = $pdo->prepare("
            INSERT INTO orders (user_id, items, total, delivery_type, address, phone, payment_method, instructions, status, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
        ");
        
        $itemsJson = json_encode($items);
        
        if ($stmt->execute([$user_id, $itemsJson, $total, $delivery_type, $address, $phone, $payment_method, $instructions])) {
            $order_id = $pdo->lastInsertId();
            
            // Insert order items for better tracking
            $stmt = $pdo->prepare("
                INSERT INTO order_items (order_id, menu_item_id, quantity, price, created_at) 
                VALUES (?, ?, ?, ?, NOW())
            ");
            
            foreach ($items as $item) {
                $stmt->execute([$order_id, $item['id'], $item['quantity'], $item['price']]);
            }
            
            // Commit transaction
            $pdo->commit();
            
            echo json_encode([
                'success' => true, 
                'order_id' => $order_id,
                'message' => 'Order placed successfully'
            ]);
        } else {
            $pdo->rollBack();
            echo json_encode(['success' => false, 'message' => 'Failed to place order']);
        }
    } catch(PDOException $e) {
        $pdo->rollBack();
        echo json_encode([
            'success' => false, 
            'message' => 'Database error: ' . $e->getMessage()
        ]);
    }
}

elseif ($method === 'GET') {
    $user_id = $_GET['user_id'] ?? '';
    
    if (empty($user_id)) {
        echo json_encode(['success' => false, 'message' => 'User ID is required']);
        exit;
    }
    
    try {
        $stmt = $pdo->prepare("
            SELECT o.*, u.name as user_name, u.email as user_email 
            FROM orders o 
            JOIN users u ON o.user_id = u.id 
            WHERE o.user_id = ? 
            ORDER BY o.created_at DESC
        ");
        $stmt->execute([$user_id]);
        $orders = $stmt->fetchAll();
        
        // Decode items JSON for each order
        foreach ($orders as &$order) {
            $order['items'] = json_decode($order['items'], true);
        }
        
        echo json_encode([
            'success' => true, 
            'orders' => $orders
        ]);
    } catch(PDOException $e) {
        echo json_encode([
            'success' => false, 
            'message' => 'Database error: ' . $e->getMessage()
        ]);
    }
}

else {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>