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

function display(){

	createTables("table1", "customer_submitted");
	
	createTables("table2", "kitchen_in_progress");
	
}

function createTables(tableNum, orderStatus){

	queue_url="kitchen_queues.php?orderStatus="+orderStatus;
	var temp=getDatabase(queue_url);
	var orderHeader=JSON.parse(temp);

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
		
		//var submitTime=orderHeader[i].OrderSubmissionTime;
		
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
		
		var timer_max="";
		if (tableNum='table1'){
			timer_max="NA";
		}
		else{
			
			
			
		}
		
		
		var check='<input type="checkbox" name="check-'+tableNum+'">';
		
		var info='<button type="button" class="btn btn-info" onclick="moreInfo()">MoreInfo</button>';

		//---------------------------------------------------------------------
		//Creating the table
		
		//Gets the body of table
		var table = document.getElementById(tableNum);
	
		//Inserts a row at the top of the table
		var row = table.insertRow(1);

		//Inserts cells
		var timer=row.insertCell(0);
		var orderID_cell=row.insertCell(1);
		var lastName_cell=row.insertCell(2);
		var submitTime_cell=row.insertCell(3);
		var foodItems_cell=row.insertCell(4);
		var foodQty_cell=row.insertCell(5);
		var comments_cell=row.insertCell(6);
		var check_cell=row.insertCell(7);
		var info_cell=row.insertCell(8);
			
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
		foodItems_cell.innerHTML=foodItems;
		foodQty_cell.innerHTML=foodQty;
		comments_cell.innerHTML=comments;
		check_cell.innerHTML=check;
		info_cell.innerHTML=info;
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
        	var orderID = table1.rows[i+1].cells[1].innerHTML;
 
        	updateDatabase(orderID, "kitchen_in_progress");
    	}
	}
}

function updateDatabase(orderID, newStatus){

	var oReq = new XMLHttpRequest(); //New request object
	var url="alterDatabase.php?orderID="+orderID+"&newStatus="+newStatus;
	oReq.open("GET", url, false);
	oReq.send();	 

}
