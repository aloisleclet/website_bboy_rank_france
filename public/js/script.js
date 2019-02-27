$(document).ready(function ()
{
	//rank nav

	let click = 0;
	$('#button-nav').on('click', function ()
	{
		let linea = $('#button-nav .line').eq(0);
		let lineb = $('#button-nav .line').eq(1);
		console.log(click);
		if (click % 2 == 0)
		{
			$('.nav-mobile').addClass('active');
			linea.css({ 'transform': 'rotate(40deg)'}); 
			lineb.css({ 'transform': 'rotate(140deg)'}); 
			linea.css({ 'top': '0px'}); 
			lineb.css({ 'top': '0px'});

		}
		else
		{
			$('.nav-mobile').removeClass('active');
			linea.css({ 'transform': 'rotate(0deg)'}); 
			lineb.css({ 'transform': 'rotate(0deg)'}); 
			linea.css({ 'top': '0px'}); 
			lineb.css({ 'top': '10px'}); 
		}
		click++;
	});

	$('.buttons a').on('click', function ()
	{
		let button = $(this).attr('id');
		let tr_hide;
		let tr_show;

		if (button == 'all')
		{
						
		}
		else if (button == 'crew')
		{
			tr_hide = $('tr[data-type=0], tr[data-type=1]');
			tr_show = $('tr[data-type=2]');

		}
		else if (button == 'bboy')
		{
			tr_hide = $('tr[data-type=1], tr[data-type=2]');
			tr_show = $('tr[data-type=0]');

		}
		else if (button == 'event')
		{
			tr_hide = $('tr[data-type=0], tr[data-type=2]');
			tr_show = $('tr[data-type=1]');

		}

		$(tr_show).removeClass('hide');
		$(tr_hide).addClass('hide');

		$(tr_show).each(function (i)
		{
			$(this).children('td:first-child').text(i + 1);
		});	
	});

	//infinite scroll
	$(window).scroll(function()
	{
    		if($(window).scrollTop() + $(window).height() >= $(document).height() - 530)
		{
        		let next = $("#last_id").attr("href");
			console.log(next);
        		load(next);
		}
	});

	let url_loaded = [];

	function load(next)
	{
		if (url_loaded.includes(next))
		{
			//display end
			return 0;
		}
		else
			url_loaded.push(next);
		$.ajax(
		{
			url: next,
			type: "get",
			context: "document.body",
			beforeSend: function()
			{
				$('.loading').show();
			}
		})
		.done(function(data)
		{
			$('.loading').hide();
			var page = document.createElement('html');
			page.innerHTML = data;
			let news = page.getElementsByClassName('news');
			let i = 0;
			while (i < news.length)
			{
				$("#news").append(news[i]);
				i++;
			}
		})
		.fail(function(jqXHR, ajaxOptions, thrownError)
		{
			alert('server not responding...');
		});
	}
});

