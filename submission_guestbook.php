<?php
// Enable error reporting for debugging purposes
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 1: Connect to the MySQL database
$servername = "localhost";  // Since MySQL is running locally
$username = "root";         // MySQL username
$password = "";             // MySQL password (dont have one)
$dbname = "guestbook";      // The name of your MySQL database

// Create a connection to MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

// Check if the connection failed
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Step 2: Check if the form data was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Step 3: Retrieve the form data
    $name = htmlspecialchars($_POST['name']);   // Get the 'name' field and sanitize it
    $message = htmlspecialchars($_POST['message']); // Get the 'message' field and sanitize it

    // Step 4: Prepare the SQL query to insert data into the 'notes' table
    $sql = "INSERT INTO notes (name, message) VALUES ('$name', '$message')";

    // Step 5: Execute the query
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully. Thank you for signing the guestbook!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Step 6: Close the connection
    $conn->close();
}
?>