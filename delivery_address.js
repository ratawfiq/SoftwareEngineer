
function cancelOrder(){
    window.open("../1.1_landing page/customer_landing_page.html");
}

function editOrder(){
	window.open("../1.2_menu page/menu.html");
}

function submitOrder(){

	//When submitting an order, the data in the entry fields are saved.
	var firstNameValue="Default";
	firstNameValue=document.getElementById("firstName").value;
	var storedFirstName="Default";
	localStorage.storedFirstName = firstNameValue;

	var lastNameValue="Default";
	lastNameValue=document.getElementById("lastName").value;
	var storedLastName="Default";
	localStorage.storedLastName = lastNameValue;
	
	var deliveryAddressValue="Default";
	deliveryAddressValue=document.getElementById("deliveryAddress").value;
	var storedDeliveryAddress="Default";
	localStorage.storedDeliveryAddress = deliveryAddressValue;
	
	var cityValue="Default";
	cityValue=document.getElementById("city").value;
	var storedCity="Default";
	localStorage.storedCity = cityValue;
	
	var stateValue="Default";
	stateValue=document.getElementById("state").value;
	var storedState="Default";
	localStorage.storedState = stateValue;
	
	var zipCodeValue="Default";
	zipCodeValue=document.getElementById("zipCode").value;
	var storedZipCode="Default";
	localStorage.storedZipCode = zipCodeValue;
	
	var phoneNumberValue="Default";
	phoneNumberValue=document.getElementById("phoneNumber").value;
	var storedPhoneNumber="Default";
	localStorage.storedPhoneNumber =phoneNumberValue;
	
	var emailValue="Default";
	emailValue=document.getElementById("email").value;
	var storedEmail="Default";
	localStorage.storedEmail = emailValue;
	
	var commentValue="Default";
	commentValue=document.getElementById("comment").value;
	var storedComment="Default";
	localStorage.storedComment = commentValue;
	
	//Function for calling google API and checking distance. If it is illegal, send alert and end. Else go to next page.
	
	window.open("../1.4_order confirmation page/order_confirmation.html");
}


 function fillDefaultAddress(){
	//Need to pull from database
	var defaultFirstName="John";
	var defaultLastName="Doe";
	var defaultDeliveryAddress="3055 E Walton Blvd";
	var defaultCity="Auburn Hills"
	var defaultState=="MI"
	var defaultZipCode="48326"
	var defaultPhoneNumber="555-555"
	var defaultEmail="test@gmail.com"
	
	document.getElementByID("firstName").value=defaultFirstName;
	document.getElementByID("lastName").value=defaultLastName;
	document.getElementByID("deliveryAddress").value=defaultDeliveryAddress;
	document.getElementByID("city").value=defaultCity;
	document.getElementByID("state").value=defaultState;
	document.getElementByID("zipCode").value=defaultZipCode;
	document.getElementByID("phoneNumber").value=defaultPhoneNumber;
	document.getElementByID("email").value=defaultEmail;
 }


//Why do we have this?
function first_name(){
	var first=document.getElementById("firstName").text;
	alert(first);
}