const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');

async function run()
{

	const browser = await puppeteer.launch({headless: false, args:['--start-maximized']});
	const page = await browser.newPage();
	
//	await page.goto('https://www.facebook.com/vagabondcrewofficial/posts/2301104253255274');
	//await page.goto('https://www.facebook.com/vagabondcrewofficial/videos/652711488493174');
	await page.goto('https://www.facebook.com/vagabondcrewofficial/photos/a.557505690948481/2296322217066811');
	
	var post = await page.evaluate(() =>
	{
		function clean_url(url)
		{
			url = url.replace(/%3A/g, ':').replace(/%2F/g, '/');
			url = url.split('?')[0];
			url = url.split('&')[0];
			if (url[url.length - 1] == '/')
				url = url.substr(0, url.length - 1);
			return url;
		}

		function get_type(url)
		{
			let type = url.split('/')[4];
			if (type[type.length - 1] == 's')
				type = type.substr(0, type.length - 1);
			if (type == 'post' || type == 'photos') //manage photo later.
				type = 'publication';
			return type;
			
		}

		let wrap = document.getElementsByClassName('_3ekx');

		let res = {};	
		res.url = clean_url(document.location.href);
	
		//type

		res.type = get_type(res.url);
	
		//link	
		if (wrap.length > 0)
		{
			let link = wrap[0].querySelector('a');
			res.link = {};

			res.link.href = clean_url(link.getAttribute('href').split('u=')[1]);
			res.link.value = link.innerHTML;
			res.type = 'link';
		}

		//text
		wrap = document.getElementsByClassName('userContent');
		
		if (wrap.length > 0)
		{
			res.text = wrap[0].querySelector('p').innerText;
		}
	
		//timestamp
		wrap = document.getElementsByClassName('z_c3pyo1brp');

		if (wrap.length > 0)
		{
			res.timestamp = wrap[0].querySelector('abbr').getAttribute('data-utime');
		}

		//author
		wrap = document.getElementsByClassName('fwb');

		if (wrap.length > 0)
		{
			res.author = {};
			res.author.value = wrap[0].querySelector('a').innerHTML;
			res.author.href = clean_url(wrap[0].querySelector('a').getAttribute('href'));
		}


		//download photo	
		wrap = document.getElementsByClassName('scaledImageFitWidth');
		if (res.type == 'photo' && wrap.length > 0)
		{
				
			let url = wrap[0].getAttribute('src');
			res.image = url;
		}
			
		return res;	
	});

	console.log(post);




















	
}

run();
