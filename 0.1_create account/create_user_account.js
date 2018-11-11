//Created by Eric Cai on 11/10/18

function createAccount(){

	var accountUsername="Default";
	accountUsername=document.getElementById("account_username").value;

	//Checks if the username is good		
	var username_too_short=true;
	var username_too_long=true;
	var username_no_num=true;
	var username_no_letters=true;

	var username_error=false; //Sets to true is a restriction is not met, and allows an alert to be sent
	
	if (accountUsername.length < 6) {
        username_too_short=false;	
		username_error=true;
	}
	if (accountUsername.length > 30) {
        username_too_long=false;
		username_error=true;
    }
	if (accountUsername.search(/\d/) == -1) {
        username_no_num=false;
		username_error=true;
    }
	if (accountUsername.search(/[a-zA-Z]/) == -1) {
        username_no_letters=false;
		username_error=true;
    }
	
	//If a restriction is not met, it displays a message and ends
	if(username_error){
		var username_alert="The username does not meet the following restrictions: \nUsername greater than 6 characters: "+username_too_short+"\nUsername less than 30 characters: "+username_too_long+"\nUsername contains numbers: "+username_no_num+"\nUsername contains letters: "+username_no_letters;
		alert(username_alert);
		return;
	}

	var accountPassword="Default";
	accountPassword=document.getElementById("account_password").value;
	//Checks if the password is good

	var pass_too_short=true;
	var pass_too_long=true;
	var pass_no_uppercase=true;
	var pass_no_lowercase=true;
	var pass_no_num=true;
	
	var pass_error=false; //If the password is incorrect, it sets this to true to sent an alert

	if (accountPassword.length < 6) {
        pass_too_short=false;	
		pass_error=true;
    }
	if (accountPassword.length > 20) {
        pass_too_long=false;
		pass_error=true;
    }
	if (accountPassword.search(/\d/) == -1) {
        pass_no_num=false;
		pass_error=true;
    }
	if (accountPassword.search(/[A-Z]/) == -1) {
        pass_no_uppercase=false;
		pass_error=true;
    }
	if (accountPassword.search(/[a-z]/) == -1) {
        pass_no_lowercase=false;
		pass_error=true;
    }

	//If a restriction is not met, it sends an alert and returns false
	if(pass_error){
		alert("The password does not meet the following restrictions: \nPassword greater than 6 character: "+pass_too_short+"\nPassword less than 20 characters: "+pass_too_long+"\nPassword contains numbers: "+pass_no_num+"\nPassword contains uppercase letters: "+pass_no_uppercase+"\nPassword contains lowercase letters: "+pass_no_lowercase);
		return;
	}

	//Pulls data from entry fields
	var accountFirstNameValue=0;
	accountFirstNameValue=document.getElementById("account_firstName").value;	
	
	var accountLastNameValue=0;
	accountLastNameValue=document.getElementById("aaccount_lastName").value;
			
	var accountDeliveryAddressValue=0;
	accountUserAddressValue=document.getElementById("account_userAddress").value;

	var accountCityValue=0;
	accountCityValue=document.getElementById("account_city").value;
	
	var accountStateValue=0;
	accountStateValue=document.getElementById("account_state").value;
			
	var accountZipCodeValue=0;
	accountZipCodeValue=document.getElementById("account_zipCode").value;
			
	var accountPhoneNumberValue=0;
	accountPhoneNumberValue=document.getElementById("account_phoneNumber").value;
			
	var accountEmailValue=0;
	accountEmailValue=document.getElementById("account_email").value;

	//Call google API to check 15 mile delivery area
	
	//NEED TO BE ADDED: validate customer input - what if it is not a valid city??

	var origin = accountUserAddressValue+" "+accountCityValue+" "+accountStateValue+" "+accountZipCodeValue;
	var destination = '118 Library Dr, Rochester, MI 48309'; //Location of restuarant
	var service = new google.maps.DistanceMatrixService;
	service.getDistanceMatrix({
	  origins: [origin]
	  destinations: [destination]
	  travelMode: 'DRIVING',
	  unitSystem: google.maps.UnitSystem.metric,
	  avoidHighways: false,
	  avoidTolls: false
	}, callback(response, status){
		
	function callback(response, status) {
		if (status !== 'OK') {
		alert('Error was: ' + status);
		}
		else{
		var originList = response.originAddresses;
		var destinationList = response.destinationAddresses;
		
		for (var i = 0; i < originList.length; i++) {
			var results = response.rows[i].elements;
			for (var j = 0; j < results.length; j++) {
				var element=results[j];
				var distance=element.distance.text;
				var duration=element.duration.text;
				var from = originList[i];
				var to = destinationList[j];
			}
		  }
		}
		if (destinationList[0]>24140){ 
			//Google API only uses meter for result.distance.value
			alert("Your address is greater than 15 miles from the restaurant.");
		}
//alert("We can deliver to you!");


	//---------------------------------------
	//Section to send user account data to database
	
	//----------------------------------------

	//window.open("../0.0_login page/login.html");

	
}
