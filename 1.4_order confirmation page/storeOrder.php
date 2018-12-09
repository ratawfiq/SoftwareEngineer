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
$username=$_GET['username'];
$deliveryfirstname=$_GET['deliveryfirstname'];
$deliverylastname=$_GET['deliverylastname'];
$deliveryaddress=$_GET['deliveryaddress'];
$deliverycity=$_GET['deliverycity'];
$deliverystate=$_GET['deliverystate'];
$deliveryzipcode=$_GET['deliveryzipcode'];
$deliveryphone=$_GET['deliveryphone'];
$comments=$_GET['comments'];
$ordersubmissiontime=$_GET['ordersubmissiontime']; 
$initialestimateddeliverytime=$_GET['initialestimateddeliverytime'];
$actualdeliverytime=0;
$kitchencooktime=$_GET['kitchencooktime']; //in seconds
$kitchenfinishcooktime=0;
$deliveryfinishtime=0;
$deliverytraveltime=$_GET['deliverytraveltime']; //in seconds
$deliverytraveldistance=$_GET['deliverytraveldistance']; //in seconds
$totalprice=$_GET['totalprice'];
$orderstatus="customer_submitted";

$sql = "INSERT INTO fooddeliveryservice.order_header ".
	"(OrderID, Username, DeliveryFirstName, DeliveryLastName, DeliveryAddress, DeliveryCity, DeliveryState, DeliveryZipCode, DeliveryPhone, Comments, OrderSubmissionTime, InitialEstimatedDeliveryTime, ActualDeliveryTime, KitchenCookTime, KitchenFinishCookTime, DeliveryFinishTime, DeliveryTravelDistance, DeliveryTravelTime, TotalPrice, OrderStatus)".
	" VALUES " . 
	"('$orderID', '$username', '$deliveryfirstname', '$deliverylastname', '$deliveryaddress', '$deliverycity', '$deliverystate', '$deliveryzipcode', '$deliveryphone', '$comments', '$ordersubmissiontime', '$initialestimateddeliverytime', '$actualdeliverytime', '$kitchencooktime', '$kitchenfinishcooktime', '$deliveryfinishtime', '$deliverytraveldistance', '$deliverytraveltime', '$totalprice', '$orderstatus')";

$result = $conn->query($sql);
//Checks to see if the query is built right
if (!$result) {
    trigger_error('Invalid query: ' . $conn->error);
}

$conn->close();
?>