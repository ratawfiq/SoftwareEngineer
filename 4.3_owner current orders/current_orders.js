//Created by Eric Cai

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

function convertString(val){

	var str="OrderID:   "+val.OrderID
    +"</br>Username:   "+val.Username
    +"</br>First and Last Name: "+val.DeliveryFirstName+" "+val.DeliveryLastName
    +"</br>Delivery Location:   "+val.DeliveryAddress
    +" "+val.DeliveryCity
    +" "+val.DeliveryState
    +" "+val.DeliveryZipCode
    +"</br>Phone Number:  "+val.DeliveryPhone
    +"</br>Order Submission Time:   "+convertTime(val.OrderSubmissionTime)
    +"</br>Total Price:   "+val.TotalPrice
    +"</br>Estimated Delivery Time:   "+convertTime(val.InitialEstimatedDeliveryTime)
    +"</br>Comments:   "+val.Comments +"</br>";

    return str;
}

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

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}