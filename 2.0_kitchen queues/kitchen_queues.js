//Made by Eric Cai

/*
function getOrders(orderStatus){
	//Do database call to get order header info
	var details="";
	var oReq = new XMLHttpRequest(); //New request object
	url="kitchen_queues.php?orderStatus="+orderStatus;
	oReq.open("GET", url, false);
	oReq.send();	 
	if(oReq.status==200) {
        //This is where you handle what to do with the response.
        //The actual data is found on this.responseText
        details=oReq.responseText;
    };

    return details; //Gives back order details in a String. Need to be parsed.
    
}

function getOrderFoodDetails(orderID){
	
		//Do database call to get order details
	var details="";
	var oReq = new XMLHttpRequest(); //New request object
	url="getOrderDetails.php?orderID="+orderID;
	oReq.open("GET", url, false);
	oReq.send();	 
	if(oReq.status==200) {
        //This is where you handle what to do with the response.
        //The actual data is found on this.responseText
        details=oReq.responseText;
    };

    return details; //Gives back order details in a String. Need to be parsed.
	
	
}
*/

function createTables(){
	/*
	var custSubmittedOrders=JSON.parse(getOrders("customer_submitted"));
	var kitchenInProgressOrders=JSON.parse(getOrders("kitchen_in_progress"));
	
	custLen=custSubmittedOrders.length;
	for (var i=0; i<custLen; i++){
		//Things to add to the row
		//var row=document.createElement("tr");
		var cust_orderID=custSubmittedOrders[i].OrderID;
		var cust_lastName=custSubmittedOrders[i].DeliveryLastName;
		
		//format time from UNIX timestamp
		var a= new Date(custSubmittedOrders[i].OrderSubmissionTime*1000);//Convert seconds to ms
		
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var cust_submitTime = date + '-' + month + '-' + year + '-' + hour + ':' + min + ':' + sec ;
		
		var cust_foodItems="";
		var cust_foodQty="";
		foodItemDetails=JSON.parse(getOrderFoodDetails(cust_orderID));
		for (var k=0; k<foodItemDetails.length; k++){
			cust_foodItems=cust_foodItems+foodItemDetail[k].FoodID+"\n";
			cust_foodQty=cust_foodQty+foodItemDetail[k].Quantity+"\n";
			
		}
		
		var cust_comments=custSubmittedOrders[i].Comments;
		*/

		
		//Gets the body of table1
		var table = document.getElementById('table1');

		//Inserts a row at the top of the table
		var row=table.insertRow(0);
	alert("HI");
		//Inserts cells
		var timer=row.insertCell(0);
		var orderID_cell=row.insertCell(1);
		var lastName_cell=row.insertCell(2);
		var submitTime_cell=row.insertCell(3);
		var foodItems_cell=row.insertCell(4);
		var foodQty_cell=row.insertCell(5);
		var comments_cell=row.insertCell(6);
		var select_cell=row.insertCell(7);
		var info_cell=row.insertCell(8);
			
		
		//Temp Variables
		var cust_timer=document.createTextNode('5');
		var cust_orderID=document.createTextNode('1');
		var cust_lastName=document.createTextNode("Dave");
		var cust_submitTime=document.createTextNode("5:5:5");
		var cust_foodItems=document.createTextNode("1\n2");
		var cust_foodQty=document.createTextNode("1\n2");
		var cust_comments=document.createTextNode("hi");
		var cust_select=document.createTextNode('<input type="checkbox" name="check-tab1">');
		var cust_info=document.createTextNode('<button type="button" class="btn btn-info" onclick="moreInfo()">MoreInfo</button>');
		
		//Should put the data into the cells
		timer.appendChild(cust_timer); //Need to add.
		orderID_cell.appendChild(cust_orderID);
		lastName_cell.appendChild(cust_lastName);
		submitTime_cell.appendChild(cust_submitTime);
		foodItems_cell.appendChild(cust_foodItems);
		foodQty_cell.appendChild(cust_foodQty);
		comments_cell.appendChild(=cust_comments);
		select_cell.appendChild(cust_select);
		info_cell.appendChild(cust_info);
			
		//}
	//}
	
}
