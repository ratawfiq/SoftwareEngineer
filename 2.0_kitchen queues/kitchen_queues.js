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

function updateKitchenFinishCookTime(orderID, kitchenTime){
	var oReq = new XMLHttpRequest(); //New request object
	var url="updateKitchenFinishCookTime.php?orderID="+orderID+"&kitchenFinishCookTime="+kitchenTime;
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
			foodItems=foodItems+foodItemDetails[k].FoodID+"<br>";
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
		
			
		/*
		//Temp Variables
		var timer='5';
		var orderID='1';
		var lastName="Dave";
		var submitTime="5:5:5";
		var foodItems="1<br>2";
		var foodQty="1<br>2";
		var comments="hi";
		*/
		
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
			var url="getKitchenCookTime.php?orderID="+orderID;
			var temp=getDatabase(url);
			var orderKitchenTime=JSON.parse(temp);

			var kitchenTime=Number(now)+Number(orderKitchenTime[0].KitchenCookTime);

			updateKitchenFinishCookTime(orderID, kitchenTime);
			
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
        	updateDatabase(orderID, "kitchen_complete");
    	}
	}
	
	location.reload(true); 
}

