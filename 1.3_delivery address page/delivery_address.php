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

$sql = "SELECT * FROM fooddeliveryservice.user_account_data WHERE Username='{$username}'";
$result = $conn->query($sql);

//Checks to see if the query is built right
if (!$result) {
    trigger_error('Invalid query: ' . $conn->error);
}

$customerDetails=array();
$i=0;
if ($result->num_rows > 0) {
    // get data of each row
	while($row = $result->fetch_assoc()) { 
        $customerDetails[$i]= array('Username'=>$row["Username"],
		'FirstName'=>$row["FirstName"],
		'LastName'=>$row["LastName"],
		'Address'=>$row["Address"],
		'City'=>$row["City"],
		'State'=>$row["State"],
		'ZipCode'=>$row["ZipCode"],
		'PhoneNumber'=>$row["PhoneNumber"],
		'Email'=>$row["Email"]
		);
		$i++;
	}
} else {
    $customerDetails[0]="None";
}

echo json_encode($customerDetails);

?>