//Made by Qian, modified by Eric Cai

//read the stored data if applicable
		var storedPrice=0;
		var actualPrice=0;
		
		var storedQty01=0;
		var storedQty02=0;
		var storedQty03=0;
		var storedQty04=0;
		var storedQty05=0;
		var storedQty06=0;
		var storedQty07=0;
		var storedQty08=0;
		var storedQty09=0;
			
		var tempStoredQty01=0;
		var tempStoredQty02=0;
		var tempStoredQty03=0;
		var tempStoredQty04=0;
		var tempStoredQty05=0;
		var tempStoredQty06=0;
		var tempStoredQty07=0;
		var tempStoredQty08=0;
		var tempStoredQty09=0;			


		tempStoredQty01=localStorage.storedQty01;
		tempStoredQty02=localStorage.storedQty02;
		tempStoredQty03=localStorage.storedQty03;
		tempStoredQty04=localStorage.storedQty04;
		tempStoredQty05=localStorage.storedQty05;
		tempStoredQty06=localStorage.storedQty06;
		tempStoredQty07=localStorage.storedQty07;
		tempStoredQty08=localStorage.storedQty08;	
		tempStoredQty09=localStorage.storedQty09;				



		if (tempStoredQty01 != 0||
		tempStoredQty02 != 0||
		tempStoredQty03 != 0||
		tempStoredQty04 != 0||
		tempStoredQty05 != 0||
		tempStoredQty06 != 0||
		tempStoredQty07 != 0||
		tempStoredQty08 != 0||
		tempStoredQty09 != 0){
			
			document.getElementById("qtyInput01").value=tempStoredQty01;
			document.getElementById("qtyInput02").value=tempStoredQty02;
			document.getElementById("qtyInput03").value=tempStoredQty03;
			document.getElementById("qtyInput04").value=tempStoredQty04;
			document.getElementById("qtyInput05").value=tempStoredQty05;
			document.getElementById("qtyInput06").value=tempStoredQty06;
			document.getElementById("qtyInput07").value=tempStoredQty07;
			document.getElementById("qtyInput08").value=tempStoredQty08;
			document.getElementById("qtyInput09").value=tempStoredQty09;

			
			calculateSumPrice();

		}




//function to calculate the total price
function calculateSumPrice(){
	
		var price01=7;
		var price02=10;
		var price03=9;
		var price04=12;
		var price05=10;
		var price06=13;
		var price07=15;
		var price08=8;
		var price09=8;
			
			
			
		var qty01=0;
		qty01=document.getElementById("qtyInput01").value;
		if(qty01<0){
			qty01=0;
			alert("Quantity cannot be a negative number.");
		}
			
		var qty02=0;
		qty02=document.getElementById("qtyInput02").value;
		if(qty02<0){
			qty02=0;
			alert("Quantity cannot be a negative number.");
		}
		
		var qty03=0;
		qty03=document.getElementById("qtyInput03").value;
		if(qty03<0){
			qty03=0;
			alert("Quantity cannot be a negative number.");
		}
		
		var qty04=0;
		qty04=document.getElementById("qtyInput04").value;
		if(qty04<0){
			qty04=0;
			alert("Quantity cannot be a negative number.");
		}
		
		var qty05=0;
		qty05=document.getElementById("qtyInput05").value;
		if(qty05<0){
			qty05=0;
			alert("Quantity cannot be a negative number.");
		}
		
		var qty06=0;
		qty06=document.getElementById("qtyInput06").value;
		if(qty06<0){
			qty06=0;
			alert("Quantity cannot be a negative number.");
		}
		
		var qty07=0;
		qty07=document.getElementById("qtyInput07").value;
		if(qty07<0){
			qty07=0;
			alert("Quantity cannot be a negative number.");
		}
		
		var qty08=0;
		qty08=document.getElementById("qtyInput08").value;
		if(qty08<0){
			qty08=0;
			alert("Quantity cannot be a negative number.");
		}
		
		var qty09=0;
		qty09=document.getElementById("qtyInput09").value;
		if(qty09<0){
			qty09=0;
			alert("Quantity cannot be a negative number.");
		}
		

		sumPrice=price01*qty01+price02*qty02+price03*qty03+price04*qty04+price05*qty05+price06*qty06+price07*qty07+price08*qty08+price09*qty09;
		//alert(sumPrice);
		var storedSumPrice=0;
		localStorage.storedSumPrice = sumPrice;		

		
		//add 6% tax
		var taxRate=1.06;
		actualPrice=taxRate*sumPrice;
		actualPrice=actualPrice.toFixed(2);//2 decimal digits

		
		document.getElementById("totalPrice").innerHTML="$"+actualPrice;


}


//all '+/-' buttons
		function plusButton1(){

			var i=0;
			i=document.getElementById("qtyInput01").value;
			i=Number(i);
			i++;
			document.getElementById("qtyInput01").value = i;
			calculateSumPrice();
			
		}

		function minusButton1(){

			var i=0;
			i=document.getElementById("qtyInput01").value;
			i=Number(i);
			i--;
			if (i<0){
				i=0;
			}
			document.getElementById("qtyInput01").value =i;
			calculateSumPrice();
		}

		function plusButton2(){

			var i=0;
			i=document.getElementById("qtyInput02").value;
			i=Number(i);
			i++;
			document.getElementById("qtyInput02").value = i;
			calculateSumPrice();
		}
			
		function minusButton2(){

			var i=0;
			i=document.getElementById("qtyInput02").value;
			i=Number(i);
			i--;
			if (i<0){
				i=0;
			}
			document.getElementById("qtyInput02").value = i;
			calculateSumPrice();
		}
			


		function plusButton3(){

			var i=0;
			i=document.getElementById("qtyInput03").value;
			i=Number(i);
			i++;
			document.getElementById("qtyInput03").value = i;
			calculateSumPrice();
		}
			
		function minusButton3(){

			var i=0;
			i=document.getElementById("qtyInput03").value;
			i=Number(i);
			i--;
			if (i<0){
				i=0;
			}
			document.getElementById("qtyInput03").value = i;
			calculateSumPrice();
			
		}

		function plusButton4(){

			var i=0;
			i=document.getElementById("qtyInput04").value;
			i=Number(i);
			i++;
			document.getElementById("qtyInput04").value = i;
			calculateSumPrice();
		}
			
		function minusButton4(){

			var i=0;
			i=document.getElementById("qtyInput04").value;
			i=Number(i);
			i--;
			if (i<0){
				i=0;
			}
			document.getElementById("qtyInput04").value = i;
			calculateSumPrice();
		}

		function plusButton5(){

			var i=0;
			i=document.getElementById("qtyInput05").value;
			i=Number(i);
			i++;
			document.getElementById("qtyInput05").value = i;
			calculateSumPrice();
		}
			
		function minusButton5(){

			var i=0;
			i=document.getElementById("qtyInput05").value;
			i=Number(i);
			i--;
			if (i<0){
				i=0;
			}
			document.getElementById("qtyInput05").value = i;
			calculateSumPrice();
		}

		function plusButton6(){

			var i=0;
			i=document.getElementById("qtyInput06").value;
			i=Number(i);
			i++;
			document.getElementById("qtyInput06").value = i;
			calculateSumPrice();
		}
			
		function minusButton6(){

			var i=0;
			i=document.getElementById("qtyInput06").value;
			i=Number(i);
			i--;
			if (i<0){
				i=0;
			}
			document.getElementById("qtyInput06").value = i;
			calculateSumPrice();
		}

		function plusButton7(){

			var i=0;
			i=document.getElementById("qtyInput07").value;
			i=Number(i);
			i++;
			document.getElementById("qtyInput07").value = i;
			calculateSumPrice();
		}
			
		function minusButton7(){

			var i=0;
			i=document.getElementById("qtyInput07").value;
			i=Number(i);
			i--;
			if (i<0){
				i=0;
			}
			document.getElementById("qtyInput07").value = i;
			calculateSumPrice();
		}	

		function plusButton8(){

			var i=0;
			i=document.getElementById("qtyInput08").value;
			i=Number(i);
			i++;
			document.getElementById("qtyInput08").value = i;
			calculateSumPrice();
		}
			
		function minusButton8(){

			var i=0;
			i=document.getElementById("qtyInput08").value;
			i=Number(i);
			i--;
			if (i<0){
				i=0;
			}
			document.getElementById("qtyInput08").value = i;
			calculateSumPrice();
		}

		function plusButton9(){

			var i=0;
			i=document.getElementById("qtyInput09").value;
			i=Number(i);
			i++;
			document.getElementById("qtyInput09").value = i;
			calculateSumPrice();
		}
			
		function minusButton9(){

			var i=0;
			i=document.getElementById("qtyInput09").value;
			i=Number(i);
			i--;
			if (i<0){
				i=0;
			}
			document.getElementById("qtyInput09").value = i;
			calculateSumPrice();
		}	




//listen to the food qty change, and display the updated total price / call 'calcualteSumPrice()' function if there is a change
//will update the total price only after customer presses the 'Enter' button
		function changeEventHandler() {
			calculateSumPrice(); 
		}




		
	
//listen to change event of select-qty box
/*
		document.addEventListener('DOMContentLoaded',function() {
			document.querySelector('input[name="qtyInput01"]').onchange=changeEventHandler;
		},false);

		document.addEventListener('DOMContentLoaded',function() {
			document.querySelector('select[name="qtyInput02"]').onchange=changeEventHandler;
		},false);

		document.addEventListener('DOMContentLoaded',function() {
			document.querySelector('select[name="qtyInput03"]').onchange=changeEventHandler;
		},false);

		document.addEventListener('DOMContentLoaded',function() {
			document.querySelector('select[name="qtyInput04"]').onchange=changeEventHandler;
		},false);

		document.addEventListener('DOMContentLoaded',function() {
			document.querySelector('select[name="qtyInput05"]').onchange=changeEventHandler;
		},false);

		document.addEventListener('DOMContentLoaded',function() {
			document.querySelector('select[name="qtyInput06"]').onchange=changeEventHandler;
		},false);

		document.addEventListener('DOMContentLoaded',function() {
			document.querySelector('select[name="qtyInput07"]').onchange=changeEventHandler;
		},false);

		document.addEventListener('DOMContentLoaded',function() {
			document.querySelector('select[name="qtyInput08"]').onchange=changeEventHandler;
		},false);

		document.addEventListener('DOMContentLoaded',function() {
			document.querySelector('select[name="qtyInput09"]').onchange=changeEventHandler;
		},false);
*/

		
//store the customer choice into web storage session
		
function storeData(){
		var tempQty01=0;
		tempQty01 = document.getElementById("qtyInput01").value;
		localStorage.storedQty01=tempQty01;
		
		var tempQty02=0;
		tempQty02 = document.getElementById("qtyInput02").value;
		localStorage.storedQty02=tempQty02;
		
		var tempQty03=0;
		tempQty03 = document.getElementById("qtyInput03").value;
		localStorage.storedQty03=tempQty03;
			
		var tempQty04=0;
		tempQty04 = document.getElementById("qtyInput04").value;
		localStorage.storedQty04=tempQty04;
			
		var tempQty05=0;
		tempQty05 = document.getElementById("qtyInput05").value;
		localStorage.storedQty05=tempQty05;
			
		var tempQty06=0;
		tempQty06 = document.getElementById("qtyInput06").value;
		localStorage.storedQty06=tempQty06;
			
		var tempQty07=0;
		tempQty07 = document.getElementById("qtyInput07").value;
		localStorage.storedQty07=tempQty07;
			
		var tempQty08=0;
		tempQty08 = document.getElementById("qtyInput08").value;
		localStorage.storedQty08=tempQty08;
			
		var tempQty09=0;
		tempQty09 = document.getElementById("qtyInput09").value;
		localStorage.storedQty09=tempQty09;

		localStorage.storedPrice=actualPrice;

}
	
		
		


//store the customer choice into web storage
//jump page
		function placeOrder(){
			
			storeData();
			var tempTotalPrice=0;
			tempTotalPrice = localStorage.storedSumPrice;
			//alert(tempTotalPrice);
			if(tempTotalPrice==0){
				alert("Your shopping cart is empty.");
			}else{
			window.open("../1.3_delivery address page/delivery_address.html", "_self");
			}
		}
