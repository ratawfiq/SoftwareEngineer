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
$orderStatus=$_GET['orderStatus'];

$sql = "SELECT * FROM fooddeliveryservice.order_header WHERE OrderStatus="+$orderStatus;
$result = $conn->query($sql);

//Checks to see if the query is built right
if (!$result) {
    trigger_error('Invalid query: ' . $conn->error);
}

$orderDetails=array();
$i=0;
if ($result->num_rows > 0) {
    // get data of each row
	while($row = $result->fetch_assoc()) { //Need to pull in all data items in order header
        $userDetails[$i]= array('OrderID'=>$row["OrderID"],
		'Username'=>$row["Username"],
		'DeliveryFirstName'=>$row["DeliveryFirstName"],
		'DeliveryLastName'=>$row["DeliveryLastName"],
		'DeliveryAddress'=>$row["DeliveryAddress"],
		'DeliveryState'=>$row["DeliveryCity"],
		'DeliveryZipCode'=>$row["DeliveryZipCode"],
		'DeliveryPhone'=>$row["DeliveryPhone"],
		'Comments'=>$row["Comments"],
		'OrderSubmissionTime'=>$row["OrderSubmissionTime"],
		'InitialEstimatedDeliveryTime'=>$row["InitialEstimatedDeliveryTime"],
		'ActualDeliveryTime'=>$row["ActualDeliveryTime"],
		'KitchenCookTime'=>$row["KitchenCookTime"],
		'DeliveryTravelDistance'=>$row["DeliveryTravelDistance"],
		'DeliveryTravelTime'=>$row["DeliveryTravelTime"],
		'TotalPrice'=>$row["TotalPrice"],
		'OrderStatus'=>$row["OrderStatus"],
		);
		$i++;
	}
} else {
    $orderDetails[0]="";
}

echo json_encode($orderDetails);

?>