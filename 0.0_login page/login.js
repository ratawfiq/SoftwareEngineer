function loginCheck(){
	
	var username_input="Default"
	var password_input="Default"
	
	username_input=document.getElementById("username").value;
	password_input=document.getElementById("password").value;
	
	if (username_input=="" || password_input==""){
		alert("Please fill all fields correctly");
		return;
	}
	
	//Do database call to check if valid username and password, stores them into details
	var details;
	var oReq = new XMLHttpRequest(); //New request object
	oReq.open("get", "login.php", false);
	oReq.send();	 
	if(oReq.status===200) {
        //This is where you handle what to do with the response.
        //The actual data is found on this.responseText
        details=oReq.responseText; //Will alert: 42
    };
   
	//alert(details);
	
	//parses the JSON that was returned by the PHP into an object.
	var userDetails=JSON.parse(details);
	
	//loop through the object for usernames to check if they are valid
	var validUser=false;
	for (var i=0, len=userDetails.length;, i<len; i++){
		var userCompare=userDetails[i];
		if (username_input==userCompare.Usernames)
			validUser=true;
			storedPassword=userCompare.Passwords;
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
				//window.open("../1.1_landing page/customer_landing_page.html", '_self');
			} else if(username_input=="delivery"){
				//window.open("../1.1_landing page/customer_landing_page.html", '_self');
			} else if (username_input=="owner"){
				window.open("../4.1_owner landing page/owner_landing_page.html", '_self');
			} else {
				window.open("../1.1_landing page/customer_landing_page.html", '_self');
			}	
		}else{
			alert("The inputted password is incorrect");
			return;
		}		
	}
	
}