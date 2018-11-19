///main_functionalities
var input=$('.inputItems');
var $login_div=$('.login_div');
var errors=[];
var login={
	init:function()
	{
		this.cache();
		this.bindEvent();
		
	},
	cache:function()
	{
		this.$email=input.find('#email');
		this.$password=input.find('#password');
		this.$login_bttn=input.find('.login');
	},
	bindEvent:function()
	{
		this.$login_bttn.on('click',function(){
			login.volidate();
		});
	},
	volidate:function()
	{
		if(this.$email.val()=="" && this.$password.val()=="")
		{
			errors.push("Please enter all fields correctly");
			$login_div.addClass('animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
				$(this).removeClass('animated shake');
				
			});
		}
		else
		{
			this.ajax_it();
			
		}
		
	},
	ajax_it:function()
	{
		$.ajax({
				type:"GET",
				url:"login.php",
				data:{
					email:this.$email.val(),
					password:this.$password.val()
				}
			}).success(
				function(data)
				{
					console.log(data)		
				}
			).fail(
				function()
				{
					errors.push("Connection error");
				}
			)		
	},
	print_errors:function()
	{
		console.log(errors);
	}
	
	
};
login.init();
