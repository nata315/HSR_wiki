<?php
    $data = [
        "id" => $_POST["planet_id"] ,
        "name" => $_POST["planet_name"] ,
        "image" => filter_var($_POST["planet_image"] , FILTER_VALIDATE_URL)
        "description" => $_POST["planet_description"] ?? ''
    ];
    $fileName = "planets.json";
    if(file_exist(fileName)){
        $existingData = json_decode(file_get_contents(fileName), true) ?? [];
    }else{
        $existingData = [];
    }

    $existingData[] = $data;
    file_put_contents($fileName, json_encode($existingData, JSON_PRETTY_PRINT | JSON_UNESCAPE_UNICODE ));
    exit;
?>