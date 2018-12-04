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
$sql = "SELECT * FROM fooddeliveryservice.order_details WHERE OrderID='{$orderID}'";
$result = $conn->query($sql);

//Checks to see if the query is built right
if (!$result) {
    trigger_error('Invalid query: ' . $conn->error);
}

$foodDetails=array();
$i=0;
if ($result->num_rows > 0) {
    // get data of each row
	while($row = $result->fetch_assoc()) {
        $foodDetails[$i]= array('OrderID'=>$row["OrderID"], 'FoodID'=>$row["FoodID"], 'Quantity'=>$row["Quantity"]);
		$i++;
	}
} else {
    $foodDetails[0]="";
}

echo json_encode($foodDetails);

?>