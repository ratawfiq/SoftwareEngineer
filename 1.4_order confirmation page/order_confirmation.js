//Made by Qian, modified by Eric Cai

//Global to other functions can use
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
var orderFoodName=array();
var orderFoodPrice=array(); 
var orderFoodPrepTime=array();
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
        details=oReq.responseText;
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

function displayOrder() {
	
	getFoodItems(); //Runs a database call to pull menu details
	
    var tempOrderFoodName = "";
	var tempOrderFoodQty ="";
	var tempOrderFoodPrice ="";
    var i = 0;
    for (i = 0; i< orderFoodQty.length; i++) {
		
		if(orderFoodQty[i] != 0){
		
		tempOrderFoodName = tempOrderFoodName + orderFoodName[i] + "<br>";
        tempOrderFoodQty = tempOrderFoodQty + orderFoodQty[i] + "<br>";	
		tempOrderFoodPrice = tempOrderFoodPrice + "$"+orderFoodPrice[i] + "<br>";	
				
		}
    }

    document.getElementById("orderFoodName").innerHTML = tempOrderFoodName;
	document.getElementById("orderFoodQty").innerHTML = tempOrderFoodQty;
	document.getElementById("orderFoodPrice").innerHTML = tempOrderFoodPrice;
}


function cancelOrder(){
    window.open("../1.0_landing page/customer_landing_page.html", "_self");
}

function submitOrder(){
	
	//--------------------------------------------
	//Section to store food items info
	var kitchenCookTime=0;
	for (var k=0; k<orderFoodQty.length; k++){
		if(orderFoodQty[k]!==0){//Indexing starts at 0
			var food_url='storeFoodDetails.php?orderID='+orderID+'&foodID='+(k+1)+'&quantity='+OrderFoodQty[k];
			databaseSend(food_url);
			
			//After sending the food data to database, check to see if the prep time for the food item is larger. If it is, store it.
			if(orderFoodPrepTime[k]>kitchenCookTime){
				kitchenCookTime=orderFoodPrepTime[i];
			}
		}
	}
	
	//-----------------------------------------------
	
// TO BE ADDED - save everything to database
//Need to call database to find the latest order number
//Timestamp to get current time, then database call to get lowest kitchen cook time to calculate esitmate time
// then clean the web storage
	var storedOrderDetails=findOrderDetails();

	var orderID=storedOrderDetails[0]+1; //Increments the largest stored orderID
	
	//var encodeUsername=encodeURIComponent(); //Where do we get username?
	var encodeStoredFirstName=encodeURIComponent(storedFirstName);
	var encodeStoredLastName=encodeURIComponent(storedLastName);
	var encodeStoredDeliveryAddress=encodeURIComponent(storedDeliveryAddress);
	var encodeStoredCity=encodeURIComponent(storedCity);
	var encodeStoredState=encodeURIComponent(storedState);
	var encodeStoredZipCode=encodeURIComponent(storedZipCode);
	var encodeStoredPhoneNumber=encodeURIComponent(storedPhoneNumer);
	var encodeStoredComment=encodeURIComponent(storedComment);
	
	//Need to pull in stored delivery travel time and delivery distance from google API
	
	
	var orderSubmissionTime=new Date().getTime(); //returns current date in seconds from 1/1/1970
	var initialEstimatedDeliveryTime=kitchenCookTime+deliveryTravelTime+storedOrderDetails[1];//Calculates everything in seconds

	// ActualDeliveryTime is blank until completion
	
	//Where is the stored total price?
	//OrderStatus is set in PHP file.
	
	//-----------------------------------------------------
	//Section to send user account data to database.
	var PageToSendTo = "storeOrder.php?"; //In google call, will add distance and duration
	var VariablePlaceholder = "orderID="+orderID+
	"&username="+encodeUsername+
	"&deliveryfirstname="+encodeStoredFirstName+
	"&deliverylastname="+encodeStoredLastName+
	"&deliveryaddress="+encodeStoredDeliveryAddress+
	"&deliverycity="+encodeStoredCity+
	"&deliverystate="+encodeStoredState+
	"&deliveryzipcode="+encodeStoredZipCode+
	"&deliveryphone="+encodeStoredPhoneNumber+
	"&comments="+encodeStoredComment+
	"&ordersubmissiontime="+orderSubmissionTime+
	"&initialestimateddeliverytime="+initialEstimatedDeliveryTime+
	"&kitchencooktime="+kitchenCookTime+ //Need
	"&deliverytraveltime="deliveryTravelTime+ //Need
	"&totalprice="+totalPrice;//Need
	var order_url = PageToSendTo + VariablePlaceholder;	
	
	databaseSend(order_url);

	

	
	window.open("../1.0_landing page/customer_landing_page.html", "_self");
	localStorage.clear();

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
        details=oReq.responseText;
    };
	
	//parses the JSON that was returned by the PHP into an object.
	var orderDetails=JSON.parse(details);
	//If there are no stored orders, then set defaults
	if (orderDetails==""){
		return [0, 0];
		
	}else{
	//loop through the object for orderIDs and kitchen cook times
		var highestOrderID=0;
		var lowestKitchenCookTime=10000; //Its impossible to have a kitchen cook time of 10000 seconds;
		var len=userDetails.length;
		for (var i=0; i<len; i++){
			if (userDetails[i].OrderIDs>highestOrderID){
				highestOrderID=userDetails[i].OrderIDs
			}
			if (userDetails[i].KitchenCookTimes<lowestKitchenCookTime){
				lowestKitchenCookTime=userDetails[i].KitchenCookTimes
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
}
