function submitOrder(){
	
	//When submitting an order, the data in the entry fields are saved.

	var firstNameValue=0;
	firstNameValue=document.getElementById("firstName").value;
	var storedFirstName=0;
	localStorage.storedFirstName = firstNameValue;

	var lastNameValue=0;
	lastNameValue=document.getElementById("lastName").value;
	var storedLastName=0;
	localStorage.storedLastName = lastNameValue;
	
	var deliveryAddressValue=0;
	deliveryAddressValue=document.getElementById("deliveryAddress").value;
	var storedDeliveryAddress=0;
	localStorage.storedDeliveryAddress = deliveryAddressValue;
	
	var cityValue=0;
	cityValue=document.getElementById("city").value;
	var storedCity=0;
	localStorage.storedCity = cityValue;
	
	var stateValue=0;
	stateValue=document.getElementById("state").value;
	var storedState=0;
	localStorage.storedState = stateValue;
	
	var zipCodeValue=0;
	zipCodeValue=document.getElementById("zipCode").value;
	var storedZipCode=0;
	localStorage.storedZipCode = zipCodeValue;
	
	var phoneNumberValue=0;
	phoneNumberValue=document.getElementById("phoneNumber").value;
	var storedPhoneNumber=0;
	localStorage.storedPhoneNumber =phoneNumberValue;
	
	var emailValue=0;
	emailValue=document.getElementById("email").value;
	var storedEmail=0;
	localStorage.storedEmail = emailValue;
	
	var commentValue=0;
	commentValue=document.getElementById("comment").value;
	var storedComment=0;
	localStorage.storedComment = commentValue;
	
	//Function for calling google API and checking distance. If it is illegal, send alert and end. Else go to next page.

	window.open("../1.4_order confirmation page/order_confirmation.html");
}

function editOrder(){
	window.open("../1.2_menu page/menu.html");
}

function cancelOrder(){
    window.open("../1.1_landing page/landing.html");
}

function first_name(){
	var first=document.getElementById("firstName").text;
	alert(first);
}




/*var defaultFirstName="John";
var defaultLastName="Doe";
var defaultDeliveryAddress="3055 E Walton Blvd";
var defaultCity="Auburn Hills"
var defaultState=="MI"
var defaultZipCode="48326"
var defaultPhoneNumber="555-555"
var defaultEmail="test@gmail.com"*/



function check_checkbox(){
	var myCheckBox=document.getElementById("checkbox");
	if(myCheckBox.checked==true){
		alert("checked");

		
		document.getElementById("firstName").value="defaultFirstName";
		document.getElementById("lastName").value="defaultLastName";
		document.getElementById("deliveryAddress").value="defaultDeliveryAddress";
		document.getElementById("city").value="defaultCity";
		document.getElementById("state").value="defaultState";
		document.getElementById("zipCode").value="defaultZipCode";
		document.getElementById("phoneNumber").value="defaultPhoneNumber";
		document.getElementById("email").value="defaultEmail";
		document.getElementById("comments").value="defaultComments";
	}else{
		alert("not checked");
		document.getElementById("firstName").value="";
		document.getElementById("lastName").value="";
		document.getElementById("deliveryAddress").value="";
		document.getElementById("city").value="";
		document.getElementById("state").value="";
		document.getElementById("zipCode").value="";
		document.getElementById("phoneNumber").value="";
		document.getElementById("email").value="";
		document.getElementById("comments").value="";
	}
	
	
}