<?php
    /*header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');*/
    $SITE_ROOT = __DIR__ . '/'; 
    $upload_dir = $SITE_ROOT."resources/";

    if (!is_dir($upload_dir)) {
        echo "такой папки не существует".$upload_dir;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        exit(0);
    }
    $php_errors = array(1=>"Превышен максимальный размер файла в php.ini",2=>"Превышен максимальный размер файла HTML",3=>"Отправлена только часть файла",4=>"Файл не был выбран");

    function handle_error($message, $error = '') {
        echo "<p>Error: $message</p>";
        if ($error) echo "<p>$error</p>";
        exit;
    }

    //проверка файла на ошибки
    if (!isset($_FILES["image_news"]) || $_FILES["image_news"]['error'] != 0) {
        handle_error("сервер не может получить выбранное изображение", isset($_FILES["image_news"]) ? 
        $php_errors[$_FILES["image_news"]['error']] : 'Файл не загружен');
    }
    //путь куда перемещаем файл
    $extension = pathinfo($_FILES["image_news"]['name'], PATHINFO_EXTENSION);
    $upload_filename = $upload_dir . $_POST["id_card"] . '.' . $extension;
    // перемещение файла из ... в ...
    if (!move_uploaded_file($_FILES["image_news"]['tmp_name'], $upload_filename)) {
        handle_error("Ошибка перемещения файла");
    }
    $upload_path = $upload_path. $_POST["id_news"] . '.' . $extension;

    $data = [
        "id" => $_POST["id_news"] ?? '',
        "title" => $_POST["title_news"] ?? '',
        "description" => $_POST["description_news"] ?? '',
        "image" => $upload_path,
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

    if (isset($_SERVER['HTTP_REFERER'])) {
        header('Location: ' . $_SERVER['HTTP_REFERER']);
    } else {
        // Если реферера нет - запасной вариант
        header('Location: index.html');
    }

    exit;
?>