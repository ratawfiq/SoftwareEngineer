<?php
//Made by Eric Cai
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

$username=$_GET['username'];
$password=$_GET['password'];
$firstname=$_GET['firstname'];
$lastname=$_GET['lastname'];
$address=$_GET['address'];
$city=$_GET['city'];
$state=$_GET['state'];
$zipcode=$_GET['zipcode'];
$email=$_GET['email'];
$phonenumber=$_GET['phonenumber'];
$userrole=$_GET['userrole'];
$userstatus=$_GET['userstatus'];
$userlocationdistance=$_GET['userlocationdistance'];
$userlocationtime=$_GET['userlocationtime'];

$sql = "INSERT INTO fooddeliveryservice.user_account_data ".
	"(Username, Password, FirstName, LastName, Address, City, State, ZipCode, Email, PhoneNumber, UserRole, UserStatus, UserLocationDistance, UserLocationTime)".
	" VALUES " . 
	"('$username', '$password', '$firstname', '$lastname', '$address', '$city', '$state', '$zipcode', '$email', '$phonenumber', '$userrole', '$userstatus', '$userlocationdistance', '$userlocationtime')";

$result = $conn->query($sql);
//Checks to see if the query is built right
if (!$result) {
    trigger_error('Invalid query: ' . $conn->error);
}

$conn->close();
?>