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
    $action = $input['action'] ?? '';
    
    if ($action === 'login') {
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';
        
        if (empty($email) || empty($password)) {
            echo json_encode(['success' => false, 'message' => 'Email and password are required']);
            exit;
        }
        
        try {
            $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch();
            
            if ($user && password_verify($password, $user['password'])) {
                // Remove password from response
                unset($user['password']);
                echo json_encode([
                    'success' => true, 
                    'user' => $user,
                    'message' => 'Login successful'
                ]);
            } else {
                echo json_encode([
                    'success' => false, 
                    'message' => 'Invalid email or password'
                ]);
            }
        } catch(PDOException $e) {
            echo json_encode([
                'success' => false, 
                'message' => 'Database error: ' . $e->getMessage()
            ]);
        }
    }
    
    elseif ($action === 'signup') {
        $name = $input['name'] ?? '';
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';
        
        if (empty($name) || empty($email) || empty($password)) {
            echo json_encode(['success' => false, 'message' => 'All fields are required']);
            exit;
        }
        
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['success' => false, 'message' => 'Invalid email format']);
            exit;
        }
        
        if (strlen($password) < 6) {
            echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters']);
            exit;
        }
        
        try {
            // Check if email already exists
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            if ($stmt->fetch()) {
                echo json_encode(['success' => false, 'message' => 'Email already exists']);
                exit;
            }
            
            // Create new user
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())");
            
            if ($stmt->execute([$name, $email, $hashedPassword])) {
                $userId = $pdo->lastInsertId();
                echo json_encode([
                    'success' => true,
                    'user' => [
                        'id' => $userId,
                        'name' => $name,
                        'email' => $email
                    ],
                    'message' => 'Account created successfully'
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to create account']);
            }
        } catch(PDOException $e) {
            echo json_encode([
                'success' => false, 
                'message' => 'Database error: ' . $e->getMessage()
            ]);
        }
    }
    
    else {
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>