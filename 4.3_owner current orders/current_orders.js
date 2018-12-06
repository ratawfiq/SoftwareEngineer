function convertTime(time){
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var b=new Date(time*1000);
	var yearB = b.getFullYear();
	var monthB = months[b.getMonth()];
	var dateB = b.getDate();
	var hourB = b.getHours();
	var minB = b.getMinutes();
	var secB = b.getSeconds();
	var finalTime = dateB + '-' + monthB + '-' + yearB + '-' + hourB + ':' + minB + ':' + secB ;

	return finalTime;
}

function convertString(val){

	var str="OrderID:   "+val.OrderID
    +"\nUsername:   "+val.Username
    +"\nFirst and Last Name: "+val.DeliveryFirstName+" "+val.DeliveryLastName
    +"\nDelivery Location:   "+val.DeliveryAddress
    +" "+val.DeliveryCity
    +" "+val.DeliveryState
    +" "+val.DeliveryZipCode
    +"\nPhone Number:  "+val.DeliveryPhone
    +"\nOrder Submission Time:   "+convertTime(val.OrderSubmissionTime)
    +"\nTotal Price:   "+val.TotalPrice
    +"\nEstimated Delivery Time:   "+convertTime(val.InitialEstimatedDeliveryTime)
    +"\nComments:   "+val.Comments;

    return str;
}