<?php
echo "" . $_POST['name'] . " ";
echo "" . $_POST['surname'] . "";


/*$link = mysql_connect('127.0.0.1', 'root', '');
if (!$link) {
    die('Ошибка соединения: ' . mysql_error());
}
echo 'Успешно соединились';

//$result = mysql_connect('localhost', 'root', '[]');
$db_selected = mysql_select_db('gavrilov', $link);
if (!$db_selected) {
    die ('Не удалось выбрать базу: ' . mysql_error());
}

// Формируем запрос
// Это лучший способ выполнить SQL-запрос
// Еще примеры можно найти в документации mysql_real_escape_string()
$query = sprintf("SELECT * FROM sin ");

// Выполняем запрос
$result = mysql_query($query);

// Проверяем результат
// Это показывает реальный запрос, посланный к MySQL, а также ошибку. Удобно при отладке.
if (!$result) {
    $message  = 'Неверный запрос: ' . mysql_error() . "\n";
    $message .= 'Запрос целиком: ' . $query;
    die($message);
}

// Используем результат
// Попытка напечатать $result не выведет информацию, которая в нем хранится
// Необходимо использовать какую-либо mysql-функцию, работающую с результатом запроса
// См. также mysql_result(), mysql_fetch_array(), mysql_fetch_row() и т.п.
/*while ($row = mysql_fetch_assoc($result)) {
	echo "<br>";
    echo $row['id'];
	echo " ";
    echo $row['amount'];
	echo " ";
    echo $row['line'];
	echo " ";
    echo $row['position'];
	echo " ";
    echo $row['name'];
	
}
echo "<br>";
echo "<br>";

$rows = array();
while($r = mysql_fetch_assoc($result)) {
    $rows[] = $r;
}
echo json_encode($rows);

// Освобождаем ресурсы, ассоциированные с результатом
// Это делается автоматически в конце скрипта
mysql_free_result($result);


*/
//$result = mysql_query('show databases;');
//$map = mysql_fetch_assoc($result);
//echo $map[1];
?>
