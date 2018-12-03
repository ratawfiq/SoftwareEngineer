//Made by Eric Cai

function loginCheck(){
	
	var username_input="Default";
	var password_input="Default";
	
	//Need to URL encode because stored data is in URL format
	username_input=document.getElementById("username").value;
	password_input=document.getElementById("password").value;

	if (username_input=="" || password_input==""){
		alert("Please fill all fields correctly");
		return;
	}

	//Do database call to check if valid username and password, stores them into details
	var details="";
	var oReq = new XMLHttpRequest(); //New request object
	oReq.open("GET", "login.php", false);
	oReq.send();	 
	if(oReq.status==200) {
        //This is where you handle what to do with the response.
        //The actual data is found on this.responseText
        details=oReq.responseText;
    };
	
	//parses the JSON that was returned by the PHP into an object.
	var userDetails=JSON.parse(details);
	
	//loop through the object for usernames to check if they are valid
	var validUser=false;
	var storedPassword="";
	var len=userDetails.length;
	for (var i=0; i<len; i++){
		if (username_input==userDetails[i].Usernames){
			validUser=true;
			storedPassword=userDetails[i].Passwords;
		}
	}
	
	//Then check if password matches stored password in database. If not, send an alert.
	if (validUser==false){
		alert("The inputted username is not valid");
		return;
	}else{
		var validPass=false;
		if (password_input==storedPassword){
			validPass=true;
			//If username and password is valid, check user role and go to landing page.
			if (username_input=="kitchen"){
				window.open("../2.0_kitchen queues/kitchen_queues.html", '_self');
			} else if(username_input=="delivery"){
				//window.open("../1.1_landing page/customer_landing_page.html", '_self');
			} else if (username_input=="owner"){
				window.open("../4.1_owner landing page/owner_landing_page.html", '_self');
			} else {
				window.open("../1.0_landing page/customer_landing_page.html", '_self');
				var storedUsername=0;
				localStorage.storedUsername = username_input; //stores username so that customer functions work
			}	
		}else{
			alert("The inputted password is incorrect");
			return;
		}		
	}

}