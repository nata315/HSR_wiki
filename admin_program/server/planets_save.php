<?php
    $SITE_ROOT = __DIR__ . '/'; 
    $upload_dir = $SITE_ROOT."resources/";

    $upload_path = "../admin_program/server/resources/";

    if (!is_dir($upload_dir)) {
        echo "такой папки не существует".$upload_dir;
    }

    $php_errors = array(1=>"Превышен максимальный размер файла в php.ini",2=>"Превышен максимальный размер файла HTML",3=>"Отправлена только часть файла",4=>"Файл не был выбран");
    function handle_error($message, $error = '') {
        echo "<p>Error: $message</p>";
        if ($error) echo "<p>$error</p>";
        exit;
    }
    //проверка файла на ошибки
    if (!isset($_FILES["image_planet"]) || $_FILES["image_planet"]['error'] != 0) {
        handle_error("сервер не может получить выбранное изображение", isset($_FILES["image_planet"]) ? 
        $php_errors[$_FILES["image_planet"]['error']] : 'Файл не загружен');
    }
    //путь куда перемещаем файл
    $extension = pathinfo($_FILES["image_planet"]['name'], PATHINFO_EXTENSION);
    $upload_filename = $upload_dir . $_POST["id_planet"] . '.' . $extension;
    // перемещение файла из ... в ...
    if (!move_uploaded_file($_FILES["image_planet"]['tmp_name'], $upload_filename)) {
        handle_error("Ошибка перемещения файла");
    }
    $upload_path = $upload_path. $_POST["id_planet"] . '.' . $extension;

    $data = [
    "id" => $_POST["id_planet"] ,
        "name" => $_POST["name_planet"] ,
        "image" => $upload_path,
        "description" => $_POST["description_planet"] ?? ''
    ];
    $fileName = "planets.json";
    if(file_exists($fileName)){
        $existingData = json_decode(file_get_contents($fileName), true) ?? [];
    }else{
        $existingData = [];
    }

    // Проверяем, нет ли уже планеты с таким же id
    foreach ($existingData as $item) {
        if ($item['id'] === $_POST["id_planet"]) {
            echo "error: Планета с ID '" . htmlspecialchars($_POST["id_planet"]) . "' уже существует";
            exit;
        }
    }

    $existingData[] = $data;

    file_put_contents($fileName, json_encode($existingData, JSON_PRETTY_PRINT ));
        if (isset($_SERVER['HTTP_REFERER'])) {
        header('Location: ' . $_SERVER['HTTP_REFERER']);
    } else {
        // Если реферера нет - запасной вариант
        header('Location: index.html');
    }
    exit;
?>
