<?php
//Made by Eric Cai

$servername = "localhost";
$username="root";
$password="pass";
$database="fooddeliveryservice";

// Create connection
$conn = new mysqli($servername, $username, $password,$database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM order_header WHERE OrderStatus = 'kitchen_in_progress' ORDER BY OrderSubmissionTime DESC";
$result = $conn->query($sql);

// $sql1 = "SELECT * FROM OrderStatus = 'kitchen_in_progress'";
// $result1 = $conn->query($sql1);
//
// $sql2 = "SELECT * FROM OrderStatus = 'kitchen_completed'";
// $result2 = $conn->query($sql2);
//
// $sql3 = "SELECT * FROM OrderStatus = 'delivery_in_progress'";
// $result3 = $conn->query($sql3);

//Checks to see if the query is built right
if (!$result) {
    trigger_error('Invalid query: ' . $conn->error);
}

$arr1=array();
$i=0;
if ($result->num_rows > 0) {
    // get data of each row
	while($row = $result->fetch_assoc()) {
  //       $userDetails[$i]= array('detail'=>$row["detail"],'price'=>$row["price"],'date'=>$row["date"]);
		// $i++;
		array_push($arr1, $row);
	}
} else {
    $arr1[0]="No users";
}
//
echo json_encode($arr1);
// echo json_encode($arr1);
// echo json_encode($arr2);
// echo json_encode($arr3);

?>
