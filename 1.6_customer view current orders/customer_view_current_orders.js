//Created by Eric Cai

function getDatabase(url){
	//Do database call to get order header info
	var details="";
	var oReq = new XMLHttpRequest(); //New request object
	oReq.open("GET", url, false);
	oReq.send();	 
	if(oReq.status==200) {
        //This is where you handle what to do with the response.
        //The actual data is found on this.responseText
        details=oReq.responseText;
    };

    return details; //Gives back order details in a String. Need to be parsed.
    
}


function display(){
	createTables("table1", "completed", localStorage.storedUsername); //The PHP file pulls data that are not completed.
	getElementById("x").hide();
}

function createTables(tableNum, orderStatus, username){
	var queue_url="getOrders.php?orderStatus="+orderStatus+"&username="+username;
	var temp=decodeURIComponent(getDatabase(queue_url)); //Data is encoded into URL format in the database to be able to be sent using PHP
	var orderHeader=JSON.parse(temp);
	
	if(orderHeader[0]==""){
		
		return;
	}
	
	if (tableNum=="table1"){
		var len=orderHeader.length;
		for (var i=0; i<len; i++){

			var orderID=orderHeader[i].OrderID;
			var submissionTime=convertTime(orderHeader[i].OrderSubmissionTime);
			var estDeliveryTime=convertTime(orderHeader[i].ActualDeliveryTime);
			var price=orderHeader[i].TotalPrice;

			

		//---------------------------------------------------------------------
		//Creating the table
		
			//Gets the body of table
			var table = document.getElementById(tableNum);

			//Inserts a row at the top of the table
			var row = table.insertRow(1);
			row.setAttribute("onclick", "moreInfo("+orderID+")");
			//Inserts cells
		
			var orderID_cell=row.insertCell(0);
			var submissionTime_cell=row.insertCell(1);
			var estDeliveryTime_cell=row.insertCell(2);
			var price_cell=row.insertCell(3);
		
			//Should put the data into the cells
			orderID_cell.innerHTML=orderID;
			submissionTime_cell.innerHTML=submissionTime;
			estDeliveryTime_cell.innerHTML=estDeliveryTime;
			price_cell.innerHTML=price;

			//-----------------------------------------------------------------------
		}
	}

	
}

function convertTime(time){
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var b=new Date(time*1000);
	var yearB = b.getFullYear();
	var monthB = months[b.getMonth()];
	var dateB = b.getDate();
	var hourB = b.getHours();
	var minB = b.getMinutes();
	var secB = b.getSeconds();
	var finalTime = dateB + '-' + monthB + '-' + yearB + '-' + hourB + ':' + minB + ':' + secB ;

	return finalTime;
}

function moreInfo(ID){

	var url="getOrderByID.php?orderID="+ID;
    var temp=decodeURIComponent(getDatabase(url)); //Data is encoded into URL format in the database to be able to be sent using PHP
			
	var orderHeader=JSON.parse(temp);

	var len=orderHeader.length;

	for (var i=0; i<len; i++){

		var address=orderHeader[i].DeliveryAddress;
		var city=orderHeader[i].DeliveryCity;
		var state=orderHeader[i].DeliveryState;
		var zipcode=orderHeader[i].DeliveryZipCode;
		var comments=orderHeader[i].Comments;
		var submissionTime=convertTime(orderHeader[i].OrderSubmissionTime)
		var estDeliveryTime=convertTime(orderHeader[i].DeliveryFinishTime);
		var price=orderHeader[i].TotalPrice;
		var orderStat=orderHeader[i].OrderStatus;
		
		var stat=""
		if(orderStat=='customer_submitted'){
			stat='Submitted by customer';
		} else if (orderStat=='kitchen_in_progress'){
			stat='In progress by the kitchen';
		} else if (orderStat=='kitchen_completed'){
			stat='Completed by the kitchen';
		} else if (orderStat=='delivery_in_progress'){
			stat='Delivery in progress';
		}
		
		var locations=address+" "+city+" "+state+" "+zipcode;
				
				//-------------------------------------------------
			//Gets the information from the food details table
		var foodItems="";
		
		var temp_url="getOrderDetails.php?orderID="+ID;
		var temp3=getDatabase(temp_url);
		foodItemDetails=JSON.parse(temp3);

		foodLen=foodItemDetails.length;
		for (var k=0; k<foodLen; k++){
		
			switch(foodItemDetails[k].FoodID){
				case '1': 
					foodName="Classic Quarter Chicken Dinner";
					break;
				case '2': 
					foodName="Half Chicken Dinner";
					break;
				case '3': 
					foodName= "Double Leg Dinner";
					break;
				case '4': 
					foodName="Quarter Chicken & Shrimp Dinner";
					break;
				case '5': 
					foodName="VEGGIE";
					break;
				case '6': 
					foodName="BBQ CHICKEN";
					break;
				case '7': 
					foodName="HAWAIIAN Beef";
					break;
				case '8': 
					foodName="CRISPY CHICKEN";
					break;
				case '9': 
					foodName="GOURMET CHEESEBURGER";
					break;
				default: 
					foodName="NULL"

			}
			foodItems=foodItems+foodItemDetails[k].Quantity+"x "+foodName+"\n";
		}

		var str="<p>Order ID: "+ID+
		"<br/>Order Submission Time: "+submissionTime+
		"<br/>Estimated Delivery Time: "+estDeliveryTime+
		"<br/>Food Items and Quantity:<br/>"+foodItems+
		"<br/>Price: "+price+
		"<br/>Delivery Location: "+locations+
		"<br/>Order Status: "+stat+
		"<br/>Comments: "+comments+"</p>";
	
		var overlay=document.getElementById("overlayText");
		document.getElementById("overlayText").innerHTML=str;
		on();
		
	}
}

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}