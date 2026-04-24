<?php
    $SITE_ROOT = __DIR__ . '/'; // Define the site root directory
    $upload_dir = $SITE_ROOT."resources/";//путь к папке

    $upload_path = "../admin_program/server/resources/";

    // Создаём папку resources если её нет
    if (!is_dir($upload_dir)) {
        echo "такой папки не существует".$upload_dir;
        /*if (!mkdir($upload_dir, 0755, true)) {
            die("Ошибка: не удалось создать папку для загрузки");
        }*/
    }

    //обработка ошибки
    $php_errors = array(1=>"Превышен максимальный размер файла в php.ini",2=>"Превышен максимальный размер файла HTML",3=>"Отправлена только часть файла",4=>"Файл не был выбран");

    // Define the handle_error function
    function handle_error($message, $error = '') {
        echo "<p>Error: $message</p>";
        if ($error) echo "<p>$error</p>";
        exit;
    }

    //проверка файла на ошибки
    if (!isset($_FILES["image_card"]) || $_FILES["image_card"]['error'] != 0) {
        handle_error("сервер не может получить выбранное изображение", isset($_FILES["image_card"]) ? 
        $php_errors[$_FILES["image_card"]['error']] : 'Файл не загружен');
    }
    //путь куда перемещаем файл
    $extension = pathinfo($_FILES["image_card"]['name'], PATHINFO_EXTENSION);
    $upload_filename = $upload_dir . $_POST["id_card"] . '.' . $extension;
    //echo "<p>".$upload_dir."</p>";
    //echo "<p>".$upload_filename."</p>";
    // перемещение файла из ... в ...
    if (!move_uploaded_file($_FILES["image_card"]['tmp_name'], $upload_filename)) {
        handle_error("Ошибка перемещения файла");
    }
    $upload_path = $upload_path. $_POST["id_card"] . '.' . $extension;
    $data = [
        "id" => $_POST["id_card"] ,
        "name" => $_POST["name_card"] ,
        "description" => $_POST["description_card"] ?? '',
        "image" => $upload_path
    ];
    $com = [
        "id" => $_POST["id_card"] ,
        "data" => []
    ];

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
    
    // Проверяем, нет ли уже записи с таким же id
    foreach ($existingData1 as $item) {
        if ($item['id'] === $_POST["id_card"]) {
            handle_error("Персонаж с ID '" . htmlspecialchars($_POST["id_card"]) . "' уже существует в базе");
        }
    }
    
    $existingData1[] = $data;
    file_put_contents($fileName1, json_encode($existingData1, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    $existingData2[] = $com;
    file_put_contents($fileName2, json_encode($existingData2, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    //echo "<a href='../index.html'>Вернуться на главную</a>";
    
    //exit;
    //exit('<meta http-equiv="refresh" content="0; url=index.html" />');
    if (isset($_SERVER['HTTP_REFERER'])) {
        header('Location: ' . $_SERVER['HTTP_REFERER']);
    } else {
        // Если реферера нет - запасной вариант
        header('Location: index.html');
    }
    exit();
?>