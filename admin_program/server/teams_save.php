<?php

    $data = [
        "id" => $_POST["id_team"] ,
        "images" =>[
            filter_var($_POST["team_image1"] , FILTER_VALIDATE_URL) ,
            filter_var($_POST["team_image2"] , FILTER_VALIDATE_URL) ,
            filter_var($_POST["team_image3"] , FILTER_VALIDATE_URL) ,
            filter_var($_POST["team_image4"] , FILTER_VALIDATE_URL)
        ] ,
        "description" => $_POST["description_team"] ?? ''
    ];

    $fileName = "teams.json";
    if(file_exists($fileName)){
        $existingData = json_decode(file_get_contents($fileName) , true) ?? [];
    }else{
        $existingData = [];
    }

    file_put_contents($fileName, json_encode($existingData, JSON_PRETTY_PRINT | JSON_UNESCAPE_UNICODE));
    exit;

?>