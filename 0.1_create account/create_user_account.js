//Created by Eric Cai on 11/10/18

//global variable to pass URL between functions
var protoURL="";
function createAccount(){
	
	//Checks that all fields are filled.
	var nonBlank=false;
	nonBlank=document.getElementById("account_username").value!="" 
	&& document.getElementById("account_password").value!="" 
	&& document.getElementById("account_firstName").value!="" 
	&& document.getElementById("account_lastName").value!="" 
	&& document.getElementById("account_userAddress").value!="" 
	&& document.getElementById("account_city").value!="" 
	&& document.getElementById("account_state").value!="" 
	&& document.getElementById("account_zipCode").value!="" 
	&& document.getElementById("account_phoneNumber").value!=""
	&& document.getElementById("account_email").value!="";
	
	if(nonBlank==false){
		alert("Please fill all fields.");
		return;
	}
	
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

	
	//checks phone number
	var phoneNumberValidation=false;
	var phoneNumberDigit=0;
	phoneNumberDigit=document.getElementById("account_phoneNumber").value.length;
	if(phoneNumberDigit!=10){
		alert("Please enter a phone number with the following format: 8888888888");
		return;
	}
	//checks email
	if (validEmail(document.getElementById("account_email").value)==false){
		alert("Please enter a valid email.");
		return;
	}
	
	//checks if password is confirmed
	var confirm_pass=document.getElementById("confirm_password").value;
	if (confirm_pass!=accountPassword){
		alert("The new password and the confirmation password do not match.");
		return;
	}
	
	//////////////////////////////////////////////////////////////////////
	//Checks if username is taken
	var storedUsers="";
	var oReq = new XMLHttpRequest(); //New request object
	oReq.open("GET", "getUsernames.php", false);
	oReq.send();

	if(oReq.status===200) {
        //This is where you handle what to do with the response.
        //The actual data is found on this.responseText
        storedUsers=oReq.responseText;
    };
	
	//parses the JSON that was returned by the PHP into an object.
	var userDetails=JSON.parse(storedUsers);
	//loop through the object for usernames to check if they are valid
	var len=userDetails.length;
	for (var i=0; i<len; i++){
		if (accountUsername==userDetails[i].Usernames){
			alert("That username has already been taken.");
			return;
		}
	}

	//////////////////////////////////////////////////////////////////////////
	
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
	  unitSystem: google.maps.UnitSystem.imperial,
	  avoidHighways: false,
	  avoidTolls: false
	}, callback);
	

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
				if(results[j].status!=='OK'){
					alert("Invalid address"); //Checks if address is valid. You can still have a good response, but a bad address
					return;
				}
				accountDistance=results[j].distance.value; //Since we are only inputting one locations, we should be getting only 1 set of results
				accountDuration=results[j].duration.value;

				if (accountDistance>24140.2){ //Google API using meters for result.distance.value
					//Confirmation boxes
					var r = confirm("Your address is greater than 15 miles from the restaurant. Continue creating account?");
					if (r==false){
						protoUrl="";
						return; //If cancel is pressed, returns and user can change data
					}
				} else {
					var s=confirm("Confirm account creation?");
					if (s==false){
						protoUrl="";
						return;
					}
				}
			}//makes final URL and sends data to PHP file
			
		}
		finalURL=protoURL+"&userlocationdistance="+accountDistance+"&userlocationtime="+accountDuration;
		sendData(finalURL);
		window.open("../0.0_login page/login.html", '_self');
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


function validEmail(inputText){

	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(inputText.match(mailformat)){
		return true;
	}else{
		return false;
	}
}

