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

$sql = "SELECT FoodID, FoodName, FoodPrepTime, FoodPrice FROM fooddeliveryservice.food_items";
$result = $conn->query($sql);

//Checks to see if the query is built right
if (!$result) {
    trigger_error('Invalid query: ' . $conn->error);
}

if ($result->num_rows > 0) {
    // output data of each row
    $foodDetails=array();
	$i=0;
	while($row = $result->fetch_assoc()) {
        $foodDetails[$i]= "<tr><td>" . $row["FoodID"]. "</td><td>" . $row["FoodName"]. "</td><td>" . $row["FoodPrepTime"]. "</td><td>" . $row["FoodPrice"] . "</td></tr>";
		$i++;
	}
} else {
    echo "0 results";
}

echo json_encode($foodDetails[2]);

?>