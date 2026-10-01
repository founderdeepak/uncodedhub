<?php
// Prevent unauthorized caching
header("Content-Type: application/json; charset=UTF-8");
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Team-PIN");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// PIN Verification: 2026
$provided_pin = $_GET['pin'] ?? $_SERVER['HTTP_X_TEAM_PIN'] ?? '';
$json_input = file_get_contents('php://input');
$body = json_decode($json_input, true) ?? [];
if (empty($provided_pin) && !empty($body['pin'])) {
    $provided_pin = $body['pin'];
}

$CORRECT_PIN = '2026';
if ($provided_pin !== $CORRECT_PIN) {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Invalid or missing team PIN"]);
    exit;
}

$dataFile = __DIR__ . '/dispatches.json';

// Initialize data store if missing
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode([
        "dispatches" => new stdClass(),
        "stats" => [
            "total" => 0,
            "deepak" => 0,
            "geetha" => 0
        ],
        "last_updated" => date('c')
    ], JSON_PRETTY_PRINT), LOCK_EX);
}

// Read current data
$data = json_decode(file_get_contents($dataFile), true) ?? [
    "dispatches" => [],
    "stats" => ["total" => 0, "deepak" => 0, "geetha" => 0],
    "last_updated" => date('c')
];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        "status" => "success",
        "data" => $data
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $body['action'] ?? 'toggle';
    $lead_id = $body['lead_id'] ?? '';
    $sent_by = $body['sent_by'] ?? 'Deepak'; // 'Deepak' | 'Geetha'
    $status = $body['status'] ?? true; // true = dispatched, false = unmark

    if (empty($lead_id)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing lead_id"]);
        exit;
    }

    if ($status) {
        $data["dispatches"][$lead_id] = [
            "by" => $sent_by,
            "time" => date('M d, g:i A'),
            "timestamp" => time()
        ];
    } else {
        unset($data["dispatches"][$lead_id]);
    }

    // Recalculate stats
    $total = count($data["dispatches"]);
    $deepak_count = 0;
    $geetha_count = 0;

    foreach ($data["dispatches"] as $item) {
        $sender = strtolower($item['by'] ?? '');
        if (strpos($sender, 'geetha') !== false) {
            $geetha_count++;
        } else {
            $deepak_count++;
        }
    }

    $data["stats"] = [
        "total" => $total,
        "deepak" => $deepak_count,
        "geetha" => $geetha_count
    ];
    $data["last_updated"] = date('c');

    // Atomic write to prevent race conditions
    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT), LOCK_EX);

    echo json_encode([
        "status" => "success",
        "message" => "Updated successfully",
        "data" => $data
    ]);
    exit;
}
?>
