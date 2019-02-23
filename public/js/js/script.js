$(document).ready(function ()
{
	var height = parseInt(window.innerHeight, 10);
	var show = false;

	$(window).scroll(function (event)
	{
		$('#ad').css('top', $(window).scrollTop());
	});	

	
//	//menus navbar ..	
//	$('#menu').on('click', function()
//	{
//		$('#navbar').animate({top: '0px'});
//	});
//	
//	$('.smooth').on('click', function()
//	{
//		$('#navbar').animate({top: '-100%'});
//
//		$('.smooth').children().css('font-weight', 'normal');
//		$(this).children().css('font-weight', 'bold');
//	});
//
//	$('#creaa').on('click', function()
//	{
//		$('#pagea').animate({left: '0px'});
//		$('#menu').hide();
//		$('#fb').animate({left: '-64px'});
//		show = false;
//	});
//	
//	$('#creab').on('click', function()
//	{
//		$('#pageb').animate({left: '0px'});
//		$('#menu').hide();
//		$('#fb').animate({left: '-64px'});
//		show = false;
//	});
//
//	$('.cross').on('click', function()
//	{
//		$('#pagea').animate({left: '-100vw'});
//		$('#pageb').animate({left: '-100vw'});
//		$('#navbar').animate({top: '-100%'});
//		$('#menu').show();
//		$('#navbar').animate({top: '-100%'});
//		$('#menu').show();
//	});

	$('.smooth').on('click', function()
	{ // Au clic sur un élément
		var page = $(this).attr('href'); // Page cible
		var speed = 750; // Durée de l'animation (en ms)
		$('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
		return false;
	});
});

