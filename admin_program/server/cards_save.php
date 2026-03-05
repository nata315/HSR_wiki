<?php
    $data = [
        "id" => $_POST["id_card"] 
        "name" => $_POST["name_card"] 
        "description" => $_POST["description_card"] ?? '',
        "image" => $_POST["image_card"] 
    ];
    $com = [
        "id" => $_POST["id_card"] ,
        "data" = []
    ]

    $fileName1 = "images.json"; 
    $fileName2 = "comments.json";
    if (file_exists($fileName1)) {
        $existingData1 = json_decode(file_get_contents($fileName1), true) ?? [];
    } else {
        $existingData1 = [];
    }
    if (file_exists($fileName2)) {
        $existingData2 = json_decode(file_get_contents($fileName2), true) ?? [];
    } else {
        $existingData2 = [];
    }
    
    $existingData1[] = $data;
    file_put_contents($fileName1, json_encode($existingData1, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    $existingData2[] = $com;
    file_put_contents($fileName2, json_encode($existingData2, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    exit;
?>