<?php
    $data = [
    "id" => $_POST["planet_id"] ,
        "name" => $_POST["planet_name"] ,
        "image" => filter_var($_POST["planet_image"] , FILTER_VALIDATE_URL),
        "description" => $_POST["planet_description"] ?? ''
    ];
    $fileName = "planets.json";
    if(file_exists($fileName)){
        $existingData = json_decode(file_get_contents($fileName), true) ?? [];
    }else{
        $existingData = [];
    }

    // Проверяем, нет ли уже планеты с таким же id
    foreach ($existingData as $item) {
        if ($item['id'] === $_POST["planet_id"]) {
            echo "error: Планета с ID '" . htmlspecialchars($_POST["planet_id"]) . "' уже существует";
            exit;
        }
    }

    $existingData[] = $data;
    file_put_contents($fileName, json_encode($existingData, JSON_PRETTY_PRINT ));
    exit;
?>
