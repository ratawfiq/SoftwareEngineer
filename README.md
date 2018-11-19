V1.0 - 11/06/18 - Qian:

  1) [FIXED]need a seperate 'view menu page'
  
  2) in 'menu page', 
      - [NOT VALID ANY MORE] changed the type-in qty to selection box. System requiements need to be udpated accordingly.
      - [FIXED] button #3 & #5 is not working now.
      - [FIXED] total price of food #6 is not calculated correctly.
      - each food price is supposed to read from database. Currently they are static in front end.
      - might want to rename all variables, i.e. qtyInput01, qty01, calQty01, temp, test, etc.
      
  3) [FIXED] in 'customer landing page',
      - [FIXED]pic size needs to be identical
      - [FIXED] center cards
      
  4) [FIXED] 'delivery address page' needs .js file 
  5) [FIXED]'order confirmation page' needs .js file

  v1.1 11/07/18 - Eric:
  1. [FIXED] In IE, customer landing page buttons dont have same size.
  
  2. In delivery address HTML, added id values to entry fields. When "Submit Order" is pressed, stored data to local storage.
	Added fillDefaultAddress() to fill the entry fields with the stored address using the checkbox. Need to pull from database.
  Currently in our requirements, we need to automatically fill the entry fields with the address stored in the customer account.
  When we get the database retrieval working, we can fill (echo) the entry fields with those values, and get rid of the check box
 [FIXED] Need to do google API call. If distance is greater than 15 miles, then send alert.
 [FIXED] Checkbox and buttons are broken. Do I need to connect the .js file to the .html file somehow??
 
	3. Sudocode for confirm page
	
	Enter page
	Database call for minimum kitchen in-progress time
	Have delivery time and distance
	Make estimated time calculation
	{
	EstimatedTime=FoodPrepTime+DeliveryTime+KitchenOrderTime
	}
	
	if foodItemQuantity=0
		Do not display
	Else
		Display food item name, ammount, price
		
	Display total price and estimated time
	
	
V1.2 - 11/08/18 - Qian:

  1) [FIXED]'customer landing page' - fixed the picture size, re-layout the option cards
  2) 'customer delivery address page' 
  	- [FIXED]fixed the checkbox function, optimized the page layout for different screen sizes
	- [FIXED]added Google API to validate if delivery address is within 15 miles from restaraunt
	- [TO BE ADDED:] need to add a function to validate customer input info. What if the 'city' is not a real city? Google API did not embet this error message from what I understand...
	- [FIXED] 'submit order' button, after clicking it the website will store all user data into website local cache, which seems overwhelm the website. Website cannot react with all storage strips loaded. If comment out couple strips, it will resume working. Need to figure out a better way to store the website data.

v1.3 - 11/10/18 - Eric

Created "Make a user account page".
So far username and password validation works, but someone should double check
Need to get google API check to work. Goal is to send a warning, but allow the user to make the account.
Need to put call in to store data into database.

v1.4 - 11/14/18 - Qian：

	1) in the 'menu' page, change the selection box back to type in box
	2) fixed the sum price calculation
	3) added the function, as long as the customer clicks the 'edit order', page go back to menu page and show the previous food qty which customer selected
	4) add the view menu page
	5) fixed the bug on the landing page
	6) [TO BE FIXED] reformat the confirmation page, it is too ugly now. need to add the title bar.
	7) [TO BE FIXED] update the estimate function in the confirmation page. It is a dummy number reading from JS now.

v.1.5 - 11/18/18 -Eric
1. Added updated login and create account pages. Still need to debug. Also added owner landing page, but need backend.
2. added test folder with .php files. Look at displayFood.html, displayFood.js, and JSONfood.php

v1.6 - 11/19/18 - Qian

	1) add the function to clean the web local storage after customer clicks 'submit order' button
	2) update the window.open feature to replace the current window without generating the addtional tabs
	3) rename the 'menu_page' to 'order_page'
v1.7 - 11/19/18 -Eric
	1. Create user account is finished. Am able to store data on database

