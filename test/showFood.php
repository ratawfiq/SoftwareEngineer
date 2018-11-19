<?php
header('Content-type: application/json');

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


$name=mysqli_real_escape_string($conn, $_POST['name');

$sql = "SELECT FoodPrepTime, FoodPrice FROM fooddeliveryservice.food_items WHERE FoodName="'. $name.'"";
$result = $conn->query($sql);
$response=array();

//Checks to see if the query is built right
if (!$result) {
    trigger_error('Invalid query: ' . $conn->error);
}

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
       $response['FoodPrice']=$row["FoodPrice"];
	   $response['FoodPrepTime']=$row["FoodPrepTime"];
    }
	echo json_encode($response);
	
} else {
    echo "0 results";
}
$conn->close();
?>