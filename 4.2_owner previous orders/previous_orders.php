<?php

$servername = "localhost";
$username="root";
$password="pass";
$database="fooddeliveryservice";
//Weishen edited
// Create connection
$conn = new mysqli($servername, $username, $password,$database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM order_header where OrderStatus ='completed' ORDER BY OrderSubmissionTime ";
$result = $conn->query($sql);

//Checks to see if the query is built right
if (!$result) {
    trigger_error('Invalid query: ' . $conn->error);
}

$arr=array();
$i=0;
if ($result->num_rows > 0) {
    // get data of each row
	while($row = $result->fetch_assoc()) {
  //       $userDetails[$i]= array('detail'=>$row["detail"],'price'=>$row["price"],'date'=>$row["date"]);
		// $i++;
		array_push($arr, $row);
	}
} else {
    $arr[0]="No users";
}

echo json_encode($arr);

?>
