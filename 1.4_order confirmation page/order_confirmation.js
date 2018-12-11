//Made by Qian, modified by Eric Cai

//Global so other functions can use
	var tempStoredQty01=localStorage.storedQty01;
	var tempStoredQty02=localStorage.storedQty02;
	var tempStoredQty03=localStorage.storedQty03;
	var tempStoredQty04=localStorage.storedQty04;
	var tempStoredQty05=localStorage.storedQty05;
	var tempStoredQty06=localStorage.storedQty06;
	var tempStoredQty07=localStorage.storedQty07;
	var tempStoredQty08=localStorage.storedQty08;	
	var tempStoredQty09=localStorage.storedQty09;
	
	var orderFoodQty = [tempStoredQty01, tempStoredQty02, tempStoredQty03, tempStoredQty04, tempStoredQty05, tempStoredQty06, tempStoredQty07, tempStoredQty08, tempStoredQty09];


//Database call to get the menu food items, stored them globally so that other functions can use
var orderFoodName=new Array();
var orderFoodPrice=new Array(); 
var orderFoodPrepTime=new Array();
function getFoodItems(){

	var details="";
	
	if (window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest();
	}
	else{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET", 'getFoodItems.php', false);
	xmlhttp.send();
	if(xmlhttp.status==200) {
        //This is where you handle what to do with the response.
        //The actual data is found on this.responseText
        details=xmlhttp.responseText;
    };

	//parses the JSON that was returned by the PHP into an object.
	var foodDetails=JSON.parse(details);
	//If there are no stored orders, then set defaults

	var len=foodDetails.length;

	for (var i=0; i<len; i++){

		orderFoodName[i]=foodDetails[i].FoodName;
		orderFoodPrice[i]=foodDetails[i].FoodPrice;
		orderFoodPrepTime[i]=foodDetails[i].FoodPrepTime;
	}
}


//Will be used in multiple functions
var orderID; //Database stored info
var storedKitchenCookTime; //Database stored info
var kitchenCookTime=0;
var orderDeliveryTime=0;
function displayOrder() {
	
	getFoodItems(); //Runs a database call to pull menu details

    var tempOrderFoodName = "";
	var tempOrderFoodQty ="";
	var tempOrderFoodPrice ="";

    for (var i = 0; i< orderFoodQty.length; i++) {

		if(orderFoodQty[i] != 0){
		
		tempOrderFoodName = tempOrderFoodName + orderFoodName[i] + "<br>";
        tempOrderFoodQty = tempOrderFoodQty + orderFoodQty[i] + "<br>";	
		tempOrderFoodPrice = tempOrderFoodPrice + "$"+orderFoodPrice[i] + "<br>";	
	
		}
    }
	
	var storedOrderDetails=findOrderDetails();
	orderID=Number(storedOrderDetails[0])+1; //Increments the largest stored orderID	
	storedKitchenCookTime=storedOrderDetails[1]; //Is the lowest kitchen cook time

	//Finding the kitchen cook time of the order	var kitchenCookTime=0;
	var len=orderFoodQty.length;
	for (var k=0; k<len; k++){
		
		if(orderFoodQty[k]!=0){//Indexing starts at 0
			//Check to see if the prep time for the food item is larger. If it is, store it.
			if(orderFoodPrepTime[k]>kitchenCookTime){
				kitchenCookTime=orderFoodPrepTime[k];
			}
		}
	}
	
	orderDeliveryTime=Number(kitchenCookTime)+Number(localStorage.storedDuration)+Number(storedKitchenCookTime);//Calculates everything in seconds
	var displayTime=(orderDeliveryTime/60).toFixed(2);
	
    document.getElementById("orderFoodName").innerHTML = tempOrderFoodName;
	document.getElementById("orderFoodQty").innerHTML = tempOrderFoodQty;
	document.getElementById("orderFoodPrice").innerHTML = tempOrderFoodPrice;
	document.getElementById("totalPrice").innerHTML = "Total Price: $"+localStorage.storedPrice;
	
	document.getElementById("estTime").innerHTML=displayTime+" minutes";
}


function cancelOrder(){
    window.open("../1.0_landing page/customer_landing_page.html", "_self");
}

function submitOrder(){
	
	
	//--------------------------------------------
	//Section to store food items info

	var len=orderFoodQty.length;
	for (var k=0; k<len; k++){

		if(orderFoodQty[k]!=0){//Indexing starts at 0
			var num=k+1;
			var food_url='storeFoodDetails.php?orderID='+orderID+'&foodID='+num+'&quantity='+orderFoodQty[k];
			databaseSend(food_url);
		}
	}

	//-----------------------------------------------

	//Need to encode data so that spaces and special characters can be sent to database
	var encodeUsername=encodeURIComponent(localStorage.storedUsername); 
	var encodeStoredFirstName=encodeURIComponent(localStorage.storedFirstName);
	var encodeStoredLastName=encodeURIComponent(localStorage.storedLastName);
	var encodeStoredDeliveryAddress=encodeURIComponent(localStorage.storedDeliveryAddress);
	var encodeStoredCity=encodeURIComponent(localStorage.storedCity);
	var encodeStoredState=encodeURIComponent(localStorage.storedState);
	var encodeStoredZipCode=encodeURIComponent(localStorage.storedZipCode);
	var encodeStoredPhoneNumber=encodeURIComponent(localStorage.storedPhoneNumber);
	var encodeStoredEmail=encodeURIComponent(localStorage.storedEmail);
	var encodeStoredComment=encodeURIComponent(localStorage.storedComment);
	
	var deliveryTravelDistance=localStorage.storedDistance;
	var deliveryTravelTime=localStorage.storedDuration;
	
	var totalPrice=localStorage.storedPrice;
	
	var tempTime=new Date().getTime(); //returns current date in milliseconds from 1/1/1970
	var orderSubmissionTime=Math.floor(tempTime/1000);

	var initialEstimatedDeliveryTime=orderSubmissionTime+orderDeliveryTime; //Takes the time now and adds the time to deliver to get when the order should be finished.

	// ActualDeliveryTime and KitchenFinishCookTime is blank
	//OrderStatus is set in PHP file.
	
	
	//-----------------------------------------------------
	//Section to send user account data to database.
	var PageToSendTo = 'storeOrder.php?'; //In google call, will add distance and duration
	
	var VariablePlaceholder = 'orderID='+orderID+
	'&username='+encodeUsername+
	'&deliveryfirstname='+encodeStoredFirstName+
	'&deliverylastname='+encodeStoredLastName+
	'&deliveryaddress='+encodeStoredDeliveryAddress+
	'&deliverycity='+encodeStoredCity+
	'&deliverystate='+encodeStoredState+
	'&deliveryzipcode='+encodeStoredZipCode+
	'&deliveryphone='+encodeStoredPhoneNumber+//
	'&comments='+encodeStoredComment+
	'&ordersubmissiontime='+orderSubmissionTime+
	'&initialestimateddeliverytime='+initialEstimatedDeliveryTime+
	'&kitchencooktime='+kitchenCookTime+ 
	'&deliverytraveltime='+deliveryTravelTime+ 
	'&deliverytraveldistance='+deliveryTravelDistance+ 
	'&totalprice='+totalPrice;
	var order_url = PageToSendTo + VariablePlaceholder;	

	var test=databaseSend(order_url);

	window.open("../1.0_landing page/customer_landing_page.html", "_self");
	//localStorage.clear();

}

//Used to pull the highest order ID and the lowest kitchen cook time. Returns in a 1x2 array
function findOrderDetails(){
	
	var details="";
	
	if (window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest();
	}
	else{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET", 'latestOrderDetails.php', false);
	xmlhttp.send();
	
	if(xmlhttp.status==200) {
        //This is where you handle what to do with the response.
        //The actual data is found on this.responseText
        details=xmlhttp.responseText;
    };
	//parses the JSON that was returned by the PHP into an object.
	var orderDetails=JSON.parse(details);
	//If there are no stored orders, then set defaults
	if (orderDetails[0]==""){
		return [0, 0];
		
	}else{
	//loop through the object for orderIDs and kitchen cook times
		var highestOrderID=0;
		var lowestKitchenCookTime=10000; //Its impossible to have a kitchen cook time of 10000 seconds;
		var len=orderDetails.length;	

		for (var i=0; i<len; i++){
			if (orderDetails[i].OrderIDs>highestOrderID){
				highestOrderID=orderDetails[i].OrderIDs
			}
			if (orderDetails[i].KitchenCookTimes<lowestKitchenCookTime){
				lowestKitchenCookTime=orderDetails[i].KitchenCookTimes
			}
		}	
		return [highestOrderID, lowestKitchenCookTime];
	}
}

function databaseSend(url){
if (window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest();
	}
	else{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET", url, false);
	xmlhttp.send();
	
	if(xmlhttp.status==200) {
        //This is where you handle what to do with the response.
        //The actual data is found on this.responseText
        details=xmlhttp.responseText;
    };
}
