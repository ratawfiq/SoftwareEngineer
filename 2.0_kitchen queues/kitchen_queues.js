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

}

function updateKitchenFinishCookTime(orderID, kitchenTime, actualTime){
	var oReq = new XMLHttpRequest(); //New request object
	var url="updateKitchenFinishCookTime.php?orderID="+orderID+"&kitchenFinishCookTime="+kitchenTime+"&actualtime="+actualTime;
	oReq.open("GET", url, false);
	oReq.send();
	return "hi";
}
function display(){

	createTables("table1", "customer_submitted");
	
	createTables("table2", "kitchen_in_progress");
	
}

function createTables(tableNum, orderStatus){

	var queue_url="kitchen_queues.php?orderStatus="+orderStatus;
	var temp=decodeURIComponent(getDatabase(queue_url)); //Data is encoded into URL format in the database to be able to be sent using PHP
	var orderHeader=JSON.parse(temp);
	
	if(orderHeader[0]==""){
		
		return;
	}
		
	var len=orderHeader.length;
	for (var i=0; i<len; i++){

		var orderID=orderHeader[i].OrderID;
		var lastName=orderHeader[i].DeliveryLastName;
		
		
		//format time from UNIX timestamp
		var a= new Date(orderHeader[i].OrderSubmissionTime*1000);//Convert seconds to ms
		
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var submitTime = date + '-' + month + '-' + year + '-' + hour + ':' + min + ':' + sec ;
		
		//-------------------------------------------------
		//Gets the information from the fod details table
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
		var finishCookTime;
		var timer_max="";
		var yearB;
		var monthB;
		var dateB;
		var hourB;
		var minB;
		var secB;
		var b;
		
		if (tableNum=='table1'){
			//If order is customer submitted, then input the estimated time the order should be cooked by, and no timer
			timer_max="NA";
			
			//Need to use Number() to turn string to num
			newTime=Number(orderHeader[i].OrderSubmissionTime)+Number(orderHeader[i].KitchenCookTime);
		
			b=new Date((newTime)*1000);
			
			yearB = b.getFullYear();
			monthB = months[b.getMonth()];
			dateB = b.getDate();
			hourB = b.getHours();
			minB = b.getMinutes();
			secB = b.getSeconds();
			finishCookTime = dateB + '-' + monthB + '-' + yearB + '-' + hourB + ':' + minB + ':' + secB ;
		}
		else{
			//If the order is kitchen_in_progress, then take the date that the order is supposed to be completed
			b=new Date(orderHeader[i].KitchenFinishCookTime*1000);
			yearB = b.getFullYear();
			monthB = months[b.getMonth()];
			dateB = b.getDate();
			hourB = b.getHours();
			minB = b.getMinutes();
			secB = b.getSeconds();
			finishCookTime = dateB + '-' + monthB + '-' + yearB + '-' + hourB + ':' + minB + ':' + secB ;
			
		}
		
		
		var check="<input type='checkbox' name='check-"+tableNum+"'>";
		

		//---------------------------------------------------------------------
		//Creating the table
		
		//Gets the body of table
		var table = document.getElementById(tableNum);

		//Inserts a row at the top of the table
		var row = table.insertRow(1);
		//row.setAttribute("onclick", "moreInfo("+orderID+")");
		//Inserts cells
		var check_cell=row.insertCell(0);
		var timer=row.insertCell(1);
		var orderID_cell=row.insertCell(2);
		var lastName_cell=row.insertCell(3);
		var submitTime_cell=row.insertCell(4);
		var finishTime_cell=row.insertCell(5);
		var foodItems_cell=row.insertCell(6);
		var foodQty_cell=row.insertCell(7);
		var comments_cell=row.insertCell(8);
		var moreInfo_cell=row.insertCell(9);
		
		//Should put the data into the cells
		timer.innerHTML=timer_max; //Need to add.
		orderID_cell.innerHTML=orderID;
		lastName_cell.innerHTML=lastName;
		submitTime_cell.innerHTML=submitTime;
		finishTime_cell.innerHTML=finishCookTime;
		foodItems_cell.innerHTML=foodItems;
		foodQty_cell.innerHTML=foodQty;
		comments_cell.innerHTML=comments;
		check_cell.innerHTML=check;
		moreInfo_cell.innerHTML="<button id= 'button"+orderID+"'  onclick='moreInfo("+orderID+")' >" + "More Info"+ "</button>";
		//-----------------------------------------------------------------------
	}
	
}

function cookFood(){

	var table1 = document.getElementById("table1");
    var table2 = document.getElementById("table2");
    var checkboxes = document.getElementsByName("check-table1");

    //loops through orders checked in table1
    for(var i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked){
        	//Gets the orderID from the table and sends it to database to update
        	var orderID = table1.rows[i+1].cells[2].innerHTML;

			var now = Math.floor((new Date().getTime())/1000); //Gets the time when the order is moved

			//Gets the kitchen cook time to add to the now time
			var url="getOrderByID.php?orderID="+orderID;
			var temp=getDatabase(url);
			var orderInfo=JSON.parse(temp);

			//Sets the time when the kitchen should finish and updates when the delivery should be completed
			var kitchenTime=Number(now)+Number(orderInfo[0].KitchenCookTime);
			var actualTime=Number(kitchenTime)+Number(orderInfo[0].DeliveryTravelTime)
		
			updateKitchenFinishCookTime(orderID, kitchenTime, actualTime);
			
			//Changed the order status
        	updateDatabase(orderID, "kitchen_in_progress");
			
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
        	var orderID = table2.rows[i+1].cells[2].innerText;

			var url="getOrderByID.php?orderID="+orderID;
			var temp=getDatabase(url);
			var orderInfo=JSON.parse(temp);

        	//Updates actual time 
        	var kitchenTime=Math.floor((new Date().getTime())/1000);
        	var actualTime=Number(kitchenTime)+Number(orderInfo[0].DeliveryTravelTime)
        	updateKitchenFinishCookTime(orderID, kitchenTime, actualTime);
        	updateDatabase(orderID, "kitchen_completed");
    	}
	}
	
	location.reload(true); 
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
		var price=orderHeader[i].TotalPrice;
		
		var locations=address+" "+city+" "+state+" "+zipcode;
	
		var str="<p>Order ID: "+ID+
		"<br/>Order Submission Time: "+submissionTime+
		"<br/>Price: $"+price+
		"<br/>Delivery Location: "+locations+
		"<br/>Comments: "+comments+"</p>";
	
		var overlay=document.getElementById("overlayText");
		document.getElementById("overlayText").innerHTML=str;
		on();
		
	}
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

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}