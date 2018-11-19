<?php
$servername = "localhost";
$username="root";
$password="pass";
$database="fooddeliveryservice";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO fooddeliveryservice.user_account_data ".
	"(Username, Password, FirstName, LastName, Address, City, State, ZipCode, Email, PhoneNumber, UserRole, UserStatus, UserLocationDistance, UserLocationTime)".
	" VALUES " . "('user', 'pass', 'John', 'Doe', '1 First St', 'Rochester', 'MI', '48307', 'asd@asd.com', '555-5555', 'cust', 'good', 0, 0)";
$result = $conn->query($sql);

//Checks to see if the query is built right
if (!$result) {
    trigger_error('Invalid query: ' . $conn->error);
}

$conn->close();
?>