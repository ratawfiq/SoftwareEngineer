//Made by Qian, modified by Eric Cai


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

/*
var defaultFirstName="John";
var defaultLastName="Doe";
var defaultDeliveryAddress="3055 E Walton Blvd";
var defaultCity="Auburn Hills"
var defaultState="MI"
var defaultZipCode="48326"
var defaultPhoneNumber="555-555-5555"
var defaultEmail="test@gmail.com"
var defaultComments="no pepper"
*/

function check_checkbox(){
	var myCheckBox=document.getElementById("checkbox");
	if(myCheckBox.checked==true){
		//Gets stored username, and gets cutomer info from the database
		var tempUsername=localStorage.storedUsername;
		var url='delivery_address.php?username='+tempUsername;
		var temp=getDatabase(url);
		var customerInfo=JSON.parse(temp);
		
		document.getElementById("firstName").value=customerInfo[0].FirstName;
		document.getElementById("lastName").value=customerInfo[0].LastName;
		document.getElementById("deliveryAddress").value=customerInfo[0].Address;
		document.getElementById("city").value=customerInfo[0].City;
		document.getElementById("state").value=customerInfo[0].State;
		document.getElementById("zipCode").value=customerInfo[0].ZipCode;
		document.getElementById("phoneNumber").value=customerInfo[0].PhoneNumber;
		document.getElementById("email").value=customerInfo[0].Email;

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

//function readData(){
	//document.getElementById("qtyInput01").innerHTML=localStorage.getItem("storedQty01");
//}

function editOrder(){
	
	window.open("../1.2_order page/order.html", "_self");
	//readData();	
}

function cancelOrder(){

		var storedQty01=0;
		var storedQty02=0;
		var storedQty03=0;
		var storedQty04=0;
		var storedQty05=0;
		var storedQty06=0;
		var storedQty07=0;
		var storedQty08=0;
		var storedQty09=0;
			

		localStorage.storedQty01=0;
		localStorage.storedQty02=0;
		localStorage.storedQty03=0;
		localStorage.storedQty04=0;
		localStorage.storedQty05=0;
		localStorage.storedQty06=0;
		localStorage.storedQty07=0;
		localStorage.storedQty08=0;	
		localStorage.storedQty09=0;	



    window.open("../1.0_landing page/customer_landing_page.html", "_self");
}



function submitOrder(){

//call google API to check 15mile delivery area

	

	var nonBlank=false;
	nonBlank=document.getElementById("firstName").value!="" 
	&& document.getElementById("lastName").value!=""
	&& document.getElementById("deliveryAddress").value!=""
	&& document.getElementById("city").value!=""
	&& document.getElementById("state").value!=""
	&& document.getElementById("zipCode").value!=""
	&& document.getElementById("phoneNumber").value!="";
	if(!nonBlank){
		alert("Please fill in all entry fields.");
	}
	
	var phoneNumberValidation=false;
	var phoneNumberDigit=0;
	phoneNumberDigit=document.getElementById("phoneNumber").value.length;
	if(phoneNumberDigit==10){
		phoneNumberValidation=true;
	}else{
		alert("Please follow the phone number format");
	}
	
	
	var emailValidation=false;
	var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	emailString=document.getElementById("email").value;
	emailValidation=re.test(emailString);
	if(!emailValidation){
		alert("Invalid Email address.");
	}
	
	
	
	if(nonBlank && phoneNumberValidation && emailValidation){
	//alert("passed");
	
	var addressValue=document.getElementById("deliveryAddress").value;
	var cityValue=document.getElementById("city").value;
	var stateValue=document.getElementById("state").value;
	var zipCodeValue=document.getElementById("zipCode").value;
	
	var origin = addressValue+" "+cityValue+" "+stateValue+" "+zipCodeValue;
	var destination = '118 Library Dr, Rochester, MI 48309';
	var service = new google.maps.DistanceMatrixService;
	service.getDistanceMatrix({
	  origins: [origin],
	  destinations: [destination],
	  travelMode: 'DRIVING',
	  unitSystem: google.maps.UnitSystem.IMPERIAL,
	  avoidHighways: false,
	  avoidTolls: false
	}, function(response, status) {
	  if (status !== 'OK') {
		alert('Error was: ' + status);
		return;
	  } else {
		var originList = response.originAddresses;
		var destinationList = response.destinationAddresses;
	  
		for (var i = 0; i < originList.length; i++) {
		
		  var results = response.rows[i].elements;
		  for (var j = 0; j < results.length; j++) {
			if(results[j].status!=='OK'){
					alert("Invalid address"); //Checks if address is valid. You can still have a good response, but a bad address
					return;
			}
			
			var deliveryDistance=results[j].distance.value; //Since we are only inputting one locations, we should be getting only 1 set of results
			var deliveryDuration=results[j].duration.value;
			if (deliveryDistance>79200){ 
			//Google API using imperial distance
				alert("We only deliver to the area within 15 miles.");
				return;
			}else{

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
		
			var storedDistance=0;
			localStorage.storedDistance=deliveryDistance;
			
			var storedDuration=0;
			localStorage.storedDuration=deliveryDuration;

			window.open("../1.4_order confirmation page/order_confirmation.html", '_self');
			
			
			}
		  }
		}
	  }
	});
	}
	

}









