V1.0 - 11/06/18 - Qian:

  1) need a seperate 'view menu page'
  
  2) in 'menu page', 
      - changed the type-in qty to selection box. System requiements need to be udpated accordingly.
      - button #3 & #5 is not working now.
      - total price of food #6 is not calculated correctly.
      - each food price is supposed to read from database. Currently they are static in front end.
      - might want to rename all variables, i.e. qtyInput01, qty01, calQty01, temp, test, etc.
      
  3) in 'customer landing page',
      - pic size needs to be identical
      
  4) 'delivery address page' and 'order confirmation page' need .js file

  v1.1 11/07/18 - Eric:
  1. In IE, customer landing page buttons dont have same size.
  
  2. In delivery address HTML, added id values to entry fields. When "Submit Order" is pressed, stored data to local storage.
	Added fillDefaultAddress() to fill the entry fields with the stored address using the checkbox. Need to pull from database.
  Currently in our requirements, we need to automatically fill the entry fields with the address stored in the customer account.
  When we get the database retrieval working, we can fill (echo) the entry fields with those values, and get rid of the check box
  Need to do google API call. If distance is greater than 15 miles, then send alert.
 Checkbox and buttons are broken. Do I need to connect the .js file to the .html file somehow??
 
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