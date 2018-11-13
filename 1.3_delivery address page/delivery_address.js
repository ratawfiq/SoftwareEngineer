//check checkbox

var defaultFirstName="John";
var defaultLastName="Doe";
var defaultDeliveryAddress="3055 E Walton Blvd";
var defaultCity="Auburn Hills"
var defaultState="MI"
var defaultZipCode="48326"
var defaultPhoneNumber="555-555-5555"
var defaultEmail="test@gmail.com"
var defaultComments="no pepper"



function check_checkbox(){
	var myCheckBox=document.getElementById("checkbox");
	if(myCheckBox.checked==true){
		//alert("checked");

		
		document.getElementById("firstName").value=defaultFirstName;
		document.getElementById("lastName").value=defaultLastName;
		document.getElementById("deliveryAddress").value=defaultDeliveryAddress;
		document.getElementById("city").value=defaultCity;
		document.getElementById("state").value=defaultState;
		document.getElementById("zipCode").value=defaultZipCode;
		document.getElementById("phoneNumber").value=defaultPhoneNumber;
		document.getElementById("email").value=defaultEmail;
		document.getElementById("comment").value=defaultComments;
	}else{
		//alert("not checked");
		document.getElementById("firstName").value="";
		document.getElementById("lastName").value="";
		document.getElementById("deliveryAddress").value="";
		document.getElementById("city").value="";
		document.getElementById("state").value="";
		document.getElementById("zipCode").value="";
		document.getElementById("phoneNumber").value="";
		document.getElementById("email").value="";
		document.getElementById("comment").value="";
	}	
}



function editOrder(){
	window.open("../1.2_menu page/menu.html");
}

function cancelOrder(){
    window.open("../1.0_landing page/customer_landing_page.html");
}



function submitOrder(){

//call google API to check 15mile delivery area

	
//NEED TO BE ADDED: validate customer input - what if it is not a valid city??
//might consider 'city + state + zip code'
//NEED TO BE ADDED: make sure there is no blank boxes before submit order	
	
	var nonBlank=false;
	nonBlank=document.getElementById("firstName").value!="" 
	&& document.getElementById("lastName").value!=""
	&& document.getElementById("deliveryAddress").value!=""
	&& document.getElementById("city").value!=""
	&& document.getElementById("state").value!=""
	&& document.getElementById("zipCode").value!=""
	&& document.getElementById("phoneNumber").value!="";
	
	
	var phoneNumberValidation=false;
	var phoneNumberDigit=0;
	phoneNumberDigit=document.getElementById("phoneNumber").value.length;
	if(phoneNumberDigit==12){
		phoneNumberValidation=true;
	}
	
	if(nonBlank && phoneNumberValidation){
	//alert("passed");
	
	var origin = document.getElementById("city").value;
	var destination = 'Rochester Hills, MI, USA';
	var service = new google.maps.DistanceMatrixService;
	service.getDistanceMatrix({
	  origins: [origin],
	  destinations: [destination],
	  travelMode: 'DRIVING',
	  unitSystem: google.maps.UnitSystem.metric,
	  avoidHighways: false,
	  avoidTolls: false
	}, function(response, status) {
	  if (status !== 'OK') {
	  
		alert('Error was: ' + status);
	  } else {
		var originList = response.originAddresses;
		var destinationList = response.destinationAddresses;
	  
		for (var i = 0; i < originList.length; i++) {
		
		  var results = response.rows[i].elements;
		  for (var j = 0; j < results.length; j++) {
		  
			if (results[j].distance.value>24140){ 
			//Google API only uses meter for result.distance.value
			alert("We only deliver to the area within 15 miles.");
			
			}else{
			
			//alert("We can deliver to you!");
			
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
		

			window.open("../1.4_order confirmation page/order_confirmation.html");
			
			
			}
		  }
		}
	  }
	});
	}else{
	alert("Please fill in full delivery address and follow the phone number format.");
	}
	

}









