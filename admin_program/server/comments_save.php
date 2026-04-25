<?php
    $cardId = $_POST["id_card"] ?? null;
    $username = $_POST["autor"] ?? "";
    $comment = $_POST["comment"] ?? "";
    
    if (!$cardId || !$username || !$comment) {
        die("Ошибка: не все данные переданы");
    }

    $newComment = [
        "username" => $username,
        "text" => $comment,
        "date" => date("Y-m-d H:i")
    ];

    $fileName = __DIR__ . "/comments.json";
    
    if (file_exists($fileName)) {
        $existingData = json_decode(file_get_contents($fileName), true) ?? [];
    } else {
        $existingData = [];
    }

    // Ищем, есть ли уже комментарии для этой карточки
    $found = false;
    foreach ($existingData as &$item) {
        if ($item["id"] === $cardId) {
            $item["data"][] = $newComment;
            $found = true;
            break;
        }
    }
    unset($item);

    // Если не нашли - добавляем новую запись
    if (!$found) {
        $existingData[] = [
            "id" => $cardId,
            "data" => [$newComment]
        ];
    }

    file_put_contents($fileName, json_encode($existingData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    if (isset($_SERVER['HTTP_REFERER'])) {
        header('Location: ' . $_SERVER['HTTP_REFERER']);
    } else {
        header('Location: ../index.html');
    }
    exit();
?>