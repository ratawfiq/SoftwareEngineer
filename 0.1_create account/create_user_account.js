//Created by Eric Cai on 11/10/18

//global variable to pass URL between functions
var protoURL;
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
	
	var pass_error=false; //If the password is incorrect, it sets this to true to send an alert

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
	var accountFirstNameValue="";
	accountFirstNameValue=document.getElementById("account_firstName").value;	
	
	var accountLastNameValue="";
	accountLastNameValue=document.getElementById("account_lastName").value;
			
	var accountDeliveryAddressValue="";
	accountUserAddressValue=document.getElementById("account_userAddress").value;

	var accountCityValue="";
	accountCityValue=document.getElementById("account_city").value;
	
	var accountStateValue="";
	accountStateValue=document.getElementById("account_state").value;
			
	var accountZipCodeValue="";
	accountZipCodeValue=document.getElementById("account_zipCode").value;
			
	var accountPhoneNumberValue="";
	accountPhoneNumberValue=document.getElementById("account_phoneNumber").value;
			
	var accountEmailValue="";
	accountEmailValue=document.getElementById("account_email").value;

	
	//Variables to send to database:
	//accountUsername, accountPassword
	//accountFirstNameValue, accountLastNameValue, accountUserAddressValue, accountCityValue, accountStateValue, accountZipCodeValue, accountPhoneNumberValue, accountEmailValue, accountDuration, accountDistance	
	//accountDistance, accountDuration
	
	//Encoding the data so that it can be sent through URL to the .php file
	var encodeUsername=encodeURIComponent(accountUsername);
	var encodePassword=encodeURIComponent(accountPassword);
	var encodeFirstNameValue=encodeURIComponent(accountFirstNameValue);
	var encodeLastNameValue=encodeURIComponent(accountLastNameValue);
	var encodeUserAddressValue=encodeURIComponent(accountUserAddressValue);
	var encodeCityValue=encodeURIComponent(accountCityValue);
	var encodeStateValue=encodeURIComponent(accountStateValue);
	var encodeZipCodeValue=encodeURIComponent(accountZipCodeValue);
	var encodePhoneNumberValue=encodeURIComponent(accountPhoneNumberValue);
	var encodeEmailValue=encodeURIComponent(accountEmailValue);
	
	
	//---------------------------------------
	//Section to send user account data to database.
	var PageToSendTo = "create_user_account.php?"; //In google call, will add distance and duration
	var VariablePlaceholder = "username="+encodeUsername+"&password="+encodePassword+"&firstname="+encodeFirstNameValue+"&lastname="+encodeLastNameValue+"&address="+encodeUserAddressValue+"&city="+encodeCityValue+"&state="+encodeStateValue+"&zipcode="+encodeZipCodeValue+"&email="+encodeEmailValue+"&phonenumber="+encodePhoneNumberValue+"&userrole=cust"+"&userstatus=good";
	protoURL = PageToSendTo + VariablePlaceholder;	
	
	//Call google API to check 15 mile delivery area. Need to do database storage in Google callback due to distance matrix being an asynchronous call
	var origin = accountUserAddressValue+" "+accountCityValue+" "+accountStateValue+" "+accountZipCodeValue;
	var destination = '118 Library Dr, Rochester, MI 48309'; //Location of restaurant

	var service = new google.maps.DistanceMatrixService;
	service.getDistanceMatrix({
	  origins: [origin],
	  destinations: [destination],
	  travelMode: 'DRIVING',
	  unitSystem: google.maps.UnitSystem.metric,
	  avoidHighways: false,
	  avoidTolls: false
	}, callback);
	
	
	window.open("../0.0_login page/login.html", '_self');	
}
function callback(response, status) {

	var accountDistance=0;
	var accountDuration=0;
	
	if (status !== 'OK') {
		alert('Error was: ' + status);
	} else {
		var originList = response.originAddresses;
		var destinationList = response.destinationAddresses;
	  
		for (var i = 0; i < originList.length; i++) {
		
			var results = response.rows[i].elements;
			for (var j = 0; j < results.length; j++) {
				accountDistance=results[j].distance.value; //Since we are only inputting one locations, we should be getting only 1 set of results
				accountDuration=results[j].duration.value;
				var r;
				if (accountDistance>24140){ //Google API using meter for result.distance.value
					//Confirmation boxes
					r = confirm("Your address is greater than 15 miles from the restaurant. Continue creating account?");
					if (r==false){
						return; //If cancel is pressed, returns and user can change data
					}
				} else {
					r=confirm("Confirm account creation?");
					if (r==false){
						return;
					}
				}
			}//makes final URL and sends data to PHP file
			finalURL=protoURL+"&userlocationdistance="+accountDistance+"&userlocationtime="+accountDuration;
			sendData(finalURL);
		}
	}
}
function sendData(url){
if (window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest();
	}
	else{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET", url, false);
	xmlhttp.send();
}
