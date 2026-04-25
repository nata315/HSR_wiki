<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$data = [
    "id" => $_POST["id_news"] ?? '',
    "title" => $_POST["title_news"] ?? '',
    "description" => $_POST["description_news"] ?? '',
    "image" => filter_var($_POST["image_news"] ?? '', FILTER_VALIDATE_URL),
    "date" => filter_var($_POST["date_news"] ?? '', FILTER_VALIDATE_REGEXP, array("options" => array("regexp" => "/\d{4}-\d{2}-\d{2}/")))
];

$fileName = "news.json";
if (file_exists($fileName)) {
    $existingData = json_decode(file_get_contents($fileName), true) ?? [];
} else {
    $existingData = [];
}

// Проверяем, нет ли уже новости с таким же id
foreach ($existingData as $item) {
    if ($item['id'] === $_POST["id_news"]) {
        echo "error: Новость с ID '" . htmlspecialchars($_POST["id_news"]) . "' уже существует";
        exit;
    }
}

// Добавляем новые данные в массив
$existingData[] = $data;

$result = file_put_contents($fileName, json_encode($existingData, JSON_PRETTY_PRINT | JSON_UNESCAPE_UNICODE));
if ($result === false) {
    echo "error: failed to write file";
} else {
    echo "success";
}
exit;
?>