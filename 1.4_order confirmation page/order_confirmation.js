function cancelOrder(){
    window.open("../1.0_landing page/customer_landing_page.html", "_self");
}

var orderFoodName = ["Classic Quarter Chicken Dinner", "Half Chicken Dinner", "Double Leg Dinner", "Quarter Chicken & Shrimp Dinner", "VEGGIE Pizza", "BBQ Chicken Pizza", "HAWAIIAN Beef Pizza", "Crispy Chicken Sandwiches", "Gourmet Cheeseburger Sandwiches"];
var orderFoodPrice = ["$7", "$10", "$9", "$12", "$10", "$13", "$15", "$8", "$8"];


function displayOrder() {
	
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
 
 
 
    var tempOrderFoodName = "";
	var tempOrderFoodQty ="";
	var tempOrderFoodPrice ="";
    var i = 0;
    for (i = 0; i< orderFoodQty.length; i++) {
		
		if(orderFoodQty[i] != 0){
		
		tempOrderFoodName = tempOrderFoodName + orderFoodName[i] + "<br>";
        tempOrderFoodQty = tempOrderFoodQty + orderFoodQty[i] + "<br>";	
		tempOrderFoodPrice = tempOrderFoodPrice + orderFoodPrice[i] + "<br>";	
				
		}
    }

    document.getElementById("orderFoodName").innerHTML = tempOrderFoodName;
	document.getElementById("orderFoodQty").innerHTML = tempOrderFoodQty;
	document.getElementById("orderFoodPrice").innerHTML = tempOrderFoodPrice;
}




function submitOrder(){

// TO BE ADDED - save everything to database
// then clean the web storage


	window.open("../1.0_landing page/customer_landing_page.html", "_self");
	localStorage.clear();

}