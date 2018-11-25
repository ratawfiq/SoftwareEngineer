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

$sql = "SELECT OrderID, KitchenCookTime FROM fooddeliveryservice.order_header";
$result = $conn->query($sql);

//Checks to see if the query is built right
if (!$result) {
    trigger_error('Invalid query: ' . $conn->error);
}

$userDetails=array();
$i=0;
if ($result->num_rows > 0) {
    // get data of each row
	while($row = $result->fetch_assoc()) {
        $userDetails[$i]= array('OrderIDs'=>$row["OrderID"], 'KitchenCookTimes'=>$row["KitchenCookTime"]);
		$i++;
	}
} else {
    $userDetails[0]="";
}

echo json_encode($userDetails);

?>