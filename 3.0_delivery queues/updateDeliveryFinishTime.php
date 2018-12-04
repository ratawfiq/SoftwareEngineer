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

$orderID=$_GET['orderID'];
$deliveryFinishTime=$_GET['deliveryFinishTime'];


$sql = "UPDATE fooddeliveryservice.order_header SET DeliveryFinishTime='".$deliveryFinishTime."' WHERE orderID='" . $orderID. "'";
	

$result = $conn->query($sql);
//Checks to see if the query is built right
if (!$result) {
    trigger_error('Invalid query: ' . $conn->error);
}

$conn->close();