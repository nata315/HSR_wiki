<?php
    $data = [
        "id" => $_POST["id_card"] ?? '',
        "name" => $_POST["name_card"] ?? '',
        "description" => $_POST["description_card"] ?? '',
        "image" => $_POST["image_card"] ?? ''
    ];

    $fileName1 = "images.json"; // убрал слеш в начале
    if (file_exists($fileName1)) {
        $existingData = json_decode(file_get_contents($fileName1), true) ?? [];
    } else {
        $existingData = [];
    }
    
    $existingData[] = $data;
    file_put_contents($fileName1, json_encode($existingData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    exit;
?>