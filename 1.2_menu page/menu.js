
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
	var tempQty01=0;
	localStorage.tempQty01 = qty01;
	var calQty01=0;
	calQty01=localStorage.tempQty01;
	
	var qty02=0;
	qty02=document.getElementById("qtyInput02").value;
	var tempQty02=0;
	localStorage.tempQty02 = qty02;
	var calQty02=0;
	calQty02=localStorage.tempQty02;
	
	var qty03=0;
	qty03=document.getElementById("qtyInput03").value;
	var tempQty03=0;
	localStorage.tempQty03 = qty03;
	var calQty03=0;
	calQty03=localStorage.tempQty03;
	
	var qty04=0;
	qty04=document.getElementById("qtyInput04").value;
	var tempQty04=0;
	localStorage.tempQty04 = qty04;
	var calQty04=0;
	calQty04=localStorage.tempQty04;
	
	var qty05=0;
	qty05=document.getElementById("qtyInput05").value;
	var tempQty05=0;
	localStorage.tempQty05 = qty05;
	var calQty05=0;
	calQty05=localStorage.tempQty05;
	
	var qty06=0;
	qty06=document.getElementById("qtyInput06").value;
	var tempQty06=0;
	localStorage.tempQty06 = qty06;
	var calQty06=0;
	calQty06=localStorage.tempQty06;
	
	var qty07=0;
	qty07=document.getElementById("qtyInput07").value;
	var tempQty07=0;
	localStorage.tempQty07 = qty07;
	var calQty07=0;
	calQty07=localStorage.tempQty07;
	
	var qty08=0;
	qty08=document.getElementById("qtyInput08").value;
	var tempQty08=0;
	localStorage.tempQty08 = qty08;
	var calQty08=0;
	calQty08=localStorage.tempQty08;
	
	var qty09=0;
	qty09=document.getElementById("qtyInput09").value;
	var tempQty09=0;
	localStorage.tempQty09 = qty09;
	var calQty09=0;
	calQty09=localStorage.tempQty09;


	sumPrice=price01*calQty01+price02*calQty02+price03*calQty03+price04*calQty04+price05*calQty05+price06*calQty06+price07*calQty07+price08*calQty08+price09*calQty09;
	
	//add 6% tax
	var taxRate=1.06;
	actualPrice=taxRate*sumPrice;
	actualPrice=actualPrice.toFixed(2);

	
	var tempActualPrice=0;
	localStorage.tempActualPrice = actualPrice;
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




//listen to the food qty change, and call 'calcualteSumPrice()' function
function changeEventHandler(event) {
    calculateSumPrice(); 
}

//listen to change event of select-qty box
document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('select[name="qtyInput01"]').onchange=changeEventHandler;
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



//jump page
function placeOrder(){
	
	window.open("../1.3_delivery address page/delivery_address.html");
	
}

