<?php
$conn = new mysqli("localhost", "root", "", "library");

$xml = simplexml_load_file(__DIR__ . "/book-format.xml");
// Define the XML namespace to correctly parse namespaced elements (e.g., <lib:book>).
$namespace = 'http://localhost/library';

// Loop through each <lib:book> element by accessing it through its namespace.
foreach ($xml->children($namespace)->book as $b) {
    // Access child elements within the same namespace.
    $book_children = $b->children($namespace);
    // Cast XML elements to strings to get their content.
    $title = (string)$book_children->title;
    $author = (string)$book_children->author;
    $genre = (string)$book_children->genre;
    $year = intval($book_children->year);
    $username = (string)$book_children->user;

    // Get user_id from username
    // Reset user_id to null to prevent reusing the ID from the previous loop iteration.
    $user_id = null; 
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($user_id);
    $stmt->fetch();
    $stmt->close();

    if (!$user_id) continue; // Skip books with unknown users

    $stmt = $conn->prepare("INSERT INTO books (title, author, genre, year, user_id) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssii", $title, $author, $genre, $year, $user_id);
    $stmt->execute();
}

echo "Books loaded from XML.";
$conn->close();
?>
