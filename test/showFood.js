

function getFood(){

	$.post("showFood.php", {name='VEGGIE'}, function(response){
		var price=response.FoodPrice;
		var time=response.FoodPrepTime;
		
		alert('Retrieved data: '+ price+" "+ time);
		}, 'json'
	);
	
}