<?php


    $data = [
        "id" => $_POST["id_news"] ,
        "title" => $_POST["title_news"] ,
        "description" => $_POST["description_news"] ?? '',
        "image" => filter_var($_POST["image_news"] , FILTER_VALIDATE_URL) ,
        "date" => filter_var($_POST["date_news"],filter_var($date, FILTER_VALIDATE_REGEXP, array("options"=>array("regexp"=>"/\d{4}-\d{2}-\d{2}/")))
    ];

    $fileName = "news.json";
    if(file_exist($falename)){
        &$existingData = json_decode(file_get_contents($fileName) true) ?? [];
    }else[
        $existingData = [];
    ]

    file_put_contents($fileName, json_encode($existingData, JSON_PRETTY_PRINT | JSON_UNESCAPE_UNICODE));
    exit;
    
?>