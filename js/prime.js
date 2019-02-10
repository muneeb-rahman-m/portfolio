//primary functions for webpage
$(document).ready(function(){

	//variable declaration begins
	
	//variable declaration ends

	$(".home").css('right','0px');
	$('#home').click(function(){
		$('.home').animate({right:0+'px'},500);
		$('.about,.apps,.myworks,.gallery').animate({right:950+'px'},500);
		$('.wrk_right').slideUp(200);
	});
	$('#about').click(function(){
		$('.about').animate({right:0+'px'},500);
		$('.home,.apps,.myworks,.gallery').animate({right:950+'px'},500);
		$('.wrk_right').slideUp(200);
	});
	$('#gallery').click(function(){
		$('.gallery').animate({right:0+'px'},500);
		$('.home,.apps,.myworks,.about').animate({right:950+'px'},500);
		$('.wrk_right').slideUp(200);
	});
	$('#apps').click(function(){
		$('.apps').animate({right:0+'px'},500);
		$('.home,.about,.myworks,.gallery').animate({right:950+'px'},500);
		$('.wrk_right').slideUp(200);
	});
	$('#myworks').click(function(){
		// $('.myworks').animate({right:0+'px'},500);
		// $('.home,.apps,.about,.gallery').animate({right:950+'px'},500);
		$('.apps').animate({right:0+'px'},500);
		$('.home,.about,.myworks,.gallery').animate({right:950+'px'},500);
		$('.wrk_right').slideUp(200);
	});
	$('.submit').click(function(){
		var name = document.getElementById('name').value;
		var mobile = document.getElementById('mobile').value;
		var mail = document.getElementById('mail').value;
		var message = document.getElementById('message').value;
		if(name==null||name=="")
		{
			$('#name').val("please enter ur name").css('color','#F1C40F');
		}
		if(isNaN(mobile)== true|| mobile==null||mobile=="")
		{
			$('#mobile').val("please enter ur mobile number").css('color','#F1C40F','border','3px solid black');
		}
		if(message==null||message=="")
		{
			$('#message').val("please leave us a message").css('color','#F1C40F');
		}
		if(mail==null||mail=="")
		{
			$('#mail').val("please enter ur e-mail id").css('color','#F1C40F');
		}
	});
	$('input[type="text"],input[type="email"],textarea').focusin(function(){
		$(this).val("").css('border','3px solid #F1C40F').css('color','black');
	});
	$('input[type="text"],input[type="email"],textarea').focusout(function(){
		$(this).css('border','3px solid #ECF0F1');
	});
	$('.reset').click(function(){
		$('#name').val("").css('border','3px solid #ECF0F1');
		$('#mobile').val("").css('border','3px solid #ECF0F1');
		$('#mail').val("").css('border','3px solid #ECF0F1');
		$('#message').val("").css('border','3px solid #ECF0F1');
	});
	$('#mobile').keypress(function(e){
		var key = e.which||e.event|| e.keyCode;
		if(key>=48 && key<=57 || key==8)
		{
			return true;
		}
		else
		{
			return false;
		}
	});
	var counter = 0;
	$('.animation').click(function(){
		
		var value = $(this).attr("target");
		switch(value)
		{
			case 'sis': $('.wrk_right').slideUp(200);
						$('.wrk_right').slideDown('slow');
						$('.hs').slideUp(200);
						$('.sis').slideDown('slow');
						break;
			case 'lms': 
						$('.wrk_right').slideUp(200);
						$('.wrk_right').slideDown('slow');
						$('.sis').slideUp(200);
						$('.lms').slideDown('slow');
						break;
			case 'dbs': $('.wrk_right').slideUp(200);
						$('.wrk_right').slideDown('slow');
						$('.lms').slideUp(200);
						$('.sis').slideUp(200);
						$('.dbs').slideDown('slow');
						break;
			case 'hs': $('.wrk_right').slideUp(200);
						$('.wrk_right').slideDown('slow');
						$('.dbs').slideUp(200);
						$('.lms').slideUp(200);
						$('.sis').slideUp(200);
						$('.hs').slideDown('slow');
						break;
		}
	
	});
	$('#l').click(function(){
		$('.about_me').slideDown(300);
	});
});

