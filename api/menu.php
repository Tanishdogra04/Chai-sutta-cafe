<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include 'config/database.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $category = $_GET['category'] ?? 'all';
    
    try {
        if ($category === 'all') {
            $stmt = $pdo->prepare("SELECT * FROM menu_items ORDER BY popular DESC, name ASC");
            $stmt->execute();
        } else {
            $stmt = $pdo->prepare("SELECT * FROM menu_items WHERE category = ? ORDER BY popular DESC, name ASC");
            $stmt->execute([$category]);
        }
        
        $menuItems = $stmt->fetchAll();
        
        echo json_encode([
            'success' => true,
            'items' => $menuItems
        ]);
    } catch(PDOException $e) {
        echo json_encode([
            'success' => false, 
            'message' => 'Database error: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>