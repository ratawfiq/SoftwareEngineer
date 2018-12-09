//Made by Eric Cai

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

function updateDatabase(orderID, newStatus){

	var oReq = new XMLHttpRequest(); //New request object
	var url="alterDatabase.php?orderID="+orderID+"&newStatus="+newStatus;
	oReq.open("GET", url, false);
	oReq.send();
	return;	

}

function updateDeliveryFinishTime(orderID, deliveryTime){
	var oReq = new XMLHttpRequest(); //New request object
	var url="updateDeliveryFinishTime.php?orderID="+orderID+"&deliveryFinishTime="+deliveryTime;
	oReq.open("GET", url, false);
	oReq.send();
	
}
function display(){

	createTables("table1", "kitchen_completed");
	
	createTables("table2", "delivery_in_progress");
	
}

function createTables(tableNum, orderStatus){

	var queue_url="delivery_queues.php?orderStatus="+orderStatus;
	var temp=decodeURIComponent(getDatabase(queue_url)); //Data is encoded into URL format in the database to be able to be sent using PHP
	var orderHeader=JSON.parse(temp);
	
	if(orderHeader[0]==""){
		
		return;
	}
	
	var len=orderHeader.length;
	for (var i=0; i<len; i++){

		var orderID=orderHeader[i].OrderID;
		var lastName=orderHeader[i].DeliveryLastName;
		var deliveryLocation=orderHeader[i].DeliveryAddress+" "+orderHeader[i].DeliveryCity+" "+orderHeader[i].DeliveryState+" "+orderHeader[i].DeliveryZipCode; 
		var deliveryDistance=orderHeader[i].DeliveryTravelDistance;
		var deliveryTime=orderHeader[i].DeliveryTravelTime;
		
	
		//-------------------------------------------------
		//Gets the information from the food details table
		var foodItems="";
		var foodQty="";
		
		var temp_url="getOrderDetails.php?orderID="+orderID;
		var temp3=getDatabase(temp_url);
		
		foodItemDetails=JSON.parse(temp3);
		foodLen=foodItemDetails.length;
		for (var k=0; k<foodLen; k++){
			var foodName=translateFood(foodItemDetails[k].FoodID);
			foodItems=foodItems+foodName+"<br>";
			foodQty=foodQty+foodItemDetails[k].Quantity+"<br>";
		}
		
		var comments=orderHeader[i].Comments;
		
		//------------------------------------------
		//Setting up timer
		var finishDeliveryTime;
		var finishCookTime;
		var timer_max="";
		var yearB;
		var monthB;
		var dateB;
		var hourB;
		var minB;
		var secB;
		var b;
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		
		if (tableNum=='table1'){
			//If order is kitchen submitted, then input the estimated time the order should be cooked by, and no timer
			timer_max="NA";
			
			//Need to use Number() to turn string to num
			var newTime=Number(deliveryTime)+Number(orderHeader[i].KitchenFinishCookTime);
		
			b=new Date((newTime)*1000);
			yearB = b.getFullYear();
			monthB = months[b.getMonth()];
			dateB = b.getDate();
			hourB = b.getHours();
			minB = b.getMinutes();
			secB = b.getSeconds();
			
			finishDeliveryTime = dateB + '-' + monthB + '-' + yearB + '-' + hourB + ':' + minB + ':' + secB ;
		
		}
		else{
			//If the order is delivery_in_progress, then take the date that the order is supposed to be completed
			b=new Date(orderHeader[i].DeliveryFinishTime*1000);
			yearB = b.getFullYear();
			monthB = months[b.getMonth()];
			dateB = b.getDate();
			hourB = b.getHours();
			minB = b.getMinutes();
			secB = b.getSeconds();
			finishDeliveryTime = dateB + '-' + monthB + '-' + yearB + '-' + hourB + ':' + minB + ':' + secB ;
			
		}
		
		
		var check="<input type='checkbox' name='check-"+tableNum+"'>";
		

		//---------------------------------------------------------------------
		//Creating the table
		
		//Gets the body of table
		var table = document.getElementById(tableNum);

		//Inserts a row at the top of the table
		var row = table.insertRow(1);

		//Inserts cells
		var check_cell=row.insertCell(0);
		var timer=row.insertCell(1);
		var orderID_cell=row.insertCell(2);
		var lastName_cell=row.insertCell(3);
		var foodItems_cell=row.insertCell(4);
		var foodQty_cell=row.insertCell(5);
		var deliveryLocation_cell=row.insertCell(6);
		var deliveryDistance_cell=row.insertCell(7);
		var deliveryTime_cell=row.insertCell(8);
		var comments_cell=row.insertCell(9);
		

		//Should put the data into the cells
		timer.innerHTML=timer_max; 
		orderID_cell.innerHTML=orderID;
		lastName_cell.innerHTML=lastName;
		foodItems_cell.innerHTML=foodItems;
		foodQty_cell.innerHTML=foodQty;
		deliveryLocation_cell.innerHTML=deliveryLocation;
		deliveryDistance_cell.innerHTML=deliveryDistance;
		deliveryTime_cell.innerHTML=finishDeliveryTime;
		comments_cell.innerHTML=comments;
		check_cell.innerHTML=check;

		//-----------------------------------------------------------------------
	}
	
}

function deliverFood(){

	var table1 = document.getElementById("table1");
    var table2 = document.getElementById("table2");
    var checkboxes = document.getElementsByName("check-table1");

    //loops through orders checked in table1
    for(var i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked){
        	//Gets the orderID from the table and sends it to database to update
        	var orderID = table1.rows[i+1].cells[2].innerHTML;

			var now = Math.floor((new Date().getTime())/1000); //Gets the time when the order is moved

			//Gets the delivery travel time to add to the now time
			var url="getDeliveryTime.php?orderID="+orderID;
			var temp=getDatabase(url);
			var orderDeliveryTime=JSON.parse(temp);

			var deliveryTime=Number(now)+Number(orderDeliveryTime[0].DeliveryTravelTime);

			updateDeliveryFinishTime(orderID, deliveryTime);
			
			//Changed the order status
        	updateDatabase(orderID, "delivery_in_progress");
			
		}
	}
	
	location.reload(true);
}
function completeFood(){

	var table1 = document.getElementById("table1");
    var table2 = document.getElementById("table2");
    var checkboxes = document.getElementsByName("check-table2");

    //loops through orders checked in table1
    for(var i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked){
        	//Gets the orderID from the table and sends it to database to update
        	var orderID = table1.rows[i+1].cells[2].innerHTML;
 
        	updateDatabase(orderID, "complete");
    	}
	}
	
	location.reload(true); 
}

function translateFood(foodID){
	var foodName='';
	switch(foodID){
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
				foodName="NULL";
			}

	return foodName;
}
