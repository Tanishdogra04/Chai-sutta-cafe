<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include 'config/database.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $name = $input['name'] ?? '';
    $email = $input['email'] ?? '';
    $phone = $input['phone'] ?? '';
    $subject = $input['subject'] ?? '';
    $message = $input['message'] ?? '';
    
    // Validation
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'Name, email, subject, and message are required']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        exit;
    }
    
    try {
        $stmt = $pdo->prepare("
            INSERT INTO contact_messages (name, email, phone, subject, message, created_at) 
            VALUES (?, ?, ?, ?, ?, NOW())
        ");
        
        if ($stmt->execute([$name, $email, $phone, $subject, $message])) {
            // Here you could also send an email notification
            // mail($email, "Thank you for contacting Chai Sutta Bar", "We have received your message and will get back to you soon.");
            
            echo json_encode([
                'success' => true,
                'message' => 'Thank you for contacting us! We will get back to you soon.'
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to send message']);
        }
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