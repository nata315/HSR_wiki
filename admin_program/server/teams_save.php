<?php
    $SITE_ROOT = __DIR__ . '/'; 
    $upload_dir = $SITE_ROOT."resources/";

    $upload_path = "../admin_program/server/resources/";

    // Создаём папку resources если её нет
    if (!is_dir($upload_dir)) {
        echo "такой папки не существует".$upload_dir;
    }

    //обработка ошибки
    $php_errors = array(1=>"Превышен максимальный размер файла в php.ini",2=>"Превышен максимальный размер файла HTML",3=>"Отправлена только часть файла",4=>"Файл не был выбран");
    function handle_error($message, $error = '') {
        echo "<p>Error: $message</p>";
        if ($error) echo "<p>$error</p>";
        exit;
    }

    for($i=1;$i<5;$i++){
        if (!isset($_FILES["image"+$i+"_team"]) || $_FILES["image"+$i+"_team"]['error'] != 0) {
            handle_error("сервер не может получить выбранное изображение", isset($_FILES["image_card"]) ? 
            $php_errors[$_FILES["image"+$i+"_team"]['error']] : 'Файл не загружен');
        }
        $extension = pathinfo($_FILES["image"+$i+"_team"]['name'], PATHINFO_EXTENSION);
        $upload_filename = $upload_dir . $_POST["id_team"] . '-image'.$i. $extension;
        // перемещение файла из ... в ...
        if (!move_uploaded_file($_FILES["image"+$i+"_team"]['tmp_name'], $upload_filename)) {
            handle_error("Ошибка перемещения файла");
        }
        $upload_path[$i] = $upload_path. $_POST["id_team"] . '.' . $extension;        
    }
    $data = [
        "id" => $_POST["id_team"] ,
        "name" => $_POST["name_team"] ,
        "images" =>[
            $upload_path[1],
            $upload_path[2],
            $upload_path[3],
            $upload_path[4]
        ] ,
        "description" => $_POST["description_team"] ?? ''
    ];

    $fileName = "teams.json";
    if(file_exists($fileName)){
        $existingData = json_decode(file_get_contents($fileName) , true) ?? [];
    }else{
        $existingData = [];
    }

    // Проверяем, нет ли уже отряда с таким же id
    foreach ($existingData as $item) {
        if ($item['id'] === $_POST["id_team"]) {
            echo "error: Отряд с ID '" . htmlspecialchars($_POST["id_team"]) . "' уже существует";
            exit;
        }
    }

    $existingData[] = $data;
    file_put_contents($fileName, json_encode($existingData, JSON_PRETTY_PRINT | JSON_UNESCAPE_UNICODE));
        if (isset($_SERVER['HTTP_REFERER'])) {
        header('Location: ' . $_SERVER['HTTP_REFERER']);
    } else {
        // Если реферера нет - запасной вариант
        header('Location: index.html');
    }
    exit;

?>