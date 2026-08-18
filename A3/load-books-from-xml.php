<?php
$conn = new mysqli("localhost", "root", "", "library");

$xml = simplexml_load_file(__DIR__ . "/book-format.xml");
$namespace = 'http://localhost/library';

foreach ($xml->children($namespace)->book as $b) {
    $book_children = $b->children($namespace);
    $title = (string)$book_children->title;
    $author = (string)$book_children->author;
    $genre = (string)$book_children->genre;
    $year = intval($book_children->year);
    $username = (string)$book_children->user;

    $user_id = null; 
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($user_id);
    $stmt->fetch();
    $stmt->close();

    if (!$user_id) continue;

    $stmt = $conn->prepare("INSERT INTO books (title, author, genre, year, user_id) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssii", $title, $author, $genre, $year, $user_id);
    $stmt->execute();
}

echo "Books loaded from XML.";
$conn->close();
?>
