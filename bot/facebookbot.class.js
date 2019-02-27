const puppeteer = require('puppeteer');

class FacebookBot
{

	constructor(name)
	{
		
		this.name = name;
		this.page = null;
		this.browser = null;
		console.log('['+this.name+'] is up');
	}

	async init()
	{
		this.browser = await puppeteer.launch({headless:true});
		this.page = await this.browser.newPage();
		return this.page;
	}

	async go(url)
	{
		await this.page.goto(url, {waitUntil: 'networkidle2'});
		console.log('['+this.name+'] '+this.clean_url(url));
	}
	
	kill()
	{
		browser.close();
		console.log('['+this.name+'] is down');
	}

	async get_likes(url)
	{
		await this.page.goto(url, {waitUntil: 'networkidle2'});
		
		let likes = await this.page.evaluate(() =>
		{
			let n = String(0);
			if (document.body.querySelector('#pages_side_column ._4bl9 div') !== null)
			{
				n = String(document.body.querySelector('#pages_side_column ._4bl9 div').textContent.split(' ')[0]);
				n = n.replace(/\s/g, '');
			}
			return n;
			
		});

		console.log('['+this.name+'] '+this.clean_url(url)+' likes:'+likes+' like');
		return likes;
	}

	async get_n_first_post_permalink(n, url)
	{
		//go to permalink
		await this.page.goto(url, {waitUntil: 'networkidle2'});
		console.log('['+this.name+'] '+this.clean_url(url));
		
		let permalinks = await this.page.evaluate(async (n) =>
		{
			//kill fb popup for debug
			if (document.getElementById('u_0_1m') !== null && typeof document.getElementById('u_0_1m') !== 'undefined')
				document.getElementById('u_0_1m').style.top = '-10000px';
			if (document.getElementById('u_0_1k') !== null && typeof document.getElementById('u_0_1k') !== 'undefined')
				document.getElementById('u_0_1k').style.top = '-10000px';

			//wait scroll
			var scroll = function (n) // problem where page don't have n post.
			{  
				return new Promise ((resolve, reject) =>
				{
					let i = 1;
					let timer = setInterval(() =>
					{
						let limit = n * 1500;

						window.scrollBy(0, 300);

						if ((window.scrollY > limit) || i > 50)
						{
							clearInterval(timer);
							resolve();
						}
					
	
						i++;
					}, 100);
				});
			}

			await scroll(n);
	
			let permalinks = [];
			let i = 0;
			let permalinks_found = document.querySelectorAll('.userContentWrapper .z_c3pyo1brp a').length;
		
			while (i < n && i < permalinks_found)
			{
				permalinks.push(document.querySelectorAll('.userContentWrapper .z_c3pyo1brp a')[i].href);
				i++;
			}
		//	if (permalink != null && permalink.split('?')[1].split('=')[0] == 'story_fbid') //avoid storys
		//		permalink = null;
			
			return permalinks;
		}, n);
	
		return permalinks;
	}

	async get_post(permalink)
	{
		await this.page.goto(permalink, {waitUntil: 'networkidle2'});
		console.log('['+this.name+'] get_post:'+this.clean_url(permalink));
		//await utils.sleep(1000);
		let post = await this.page.evaluate(() =>
		{
		
			let wrap = document.getElementsByClassName('_3ekx');
		
			let res = {};	
			res.url = document.location.href;
			
			//test not found
		
			if (document.title == 'Page Not Found | Facebook')
			{
				res.error = 'not found';
				return res;
			}
		
			
			
			//link	
			if (typeof wrap[0] !== 'undefined' && wrap[0].querySelectorAll('a').length > 0)
			{
				let link = wrap[0].querySelector('a');
				res.link = {};
		
				res.link.href = link.getAttribute('href').split('u=')[1];
				res.link.value = link.innerHTML;
				res.type = 'link';
			}
		
			//text
			wrap = document.getElementsByClassName('userContent');
			
			if (typeof wrap[0] !== 'undefined' && wrap[0].querySelectorAll('p').length > 0)
			{
				res.text = wrap[0].innerText;
			}
			
			//timestamp
			wrap = document.getElementsByClassName('z_c3pyo1brp');
		
			if (typeof wrap[0] !== 'undefined' && wrap[0].querySelectorAll('abbr').length > 0)
			{
				res.timestamp = wrap[0].querySelector('abbr').getAttribute('data-utime');
			}
		
			//author
			wrap = document.getElementsByClassName('fwb');
		
			if (typeof wrap[0] !== 'undefined' && wrap[0].querySelectorAll('a').length > 0)
			{
				res.author = {};
				res.author.value = wrap[0].querySelector('a').innerHTML;
				res.author.href = wrap[0].querySelector('a').getAttribute('href');
			}
			else
			{
				res.error = 'author';
			}
		
			//download photo	
		//	wrap = document.getElementsByClassName('scaledImageFitWidth');
		//
		//	if (res.type == 'photo'  && typeof wrap[0] !== 'undefined')
		//	{
		//			
		//		let url = wrap[0].getAttribute('src');
		//		res.image = url;
		//	}

			return res;
	
		});
		
		//clean urls
	

		if (post.hasOwnProperty('author'))
			post.author.href = this.clean_url(post.author.href);
		if (post.hasOwnProperty('link'))
			post.link.href = this.clean_url(post.link.href);
		//set type
		post.type = this.get_type(post.url);
		
		//video id	
		if (post.type == 'video')
		{
			post.id = post.url.split('/')[5];	
		}
	
		
		post.url = this.clean_url(post.url);
		return post;
	}

	//UTILS FUNCTION
	clean_url(url)
	{
		if (typeof url === 'undefined')
			return null;
		url = url.replace(/%3A/g, ':').replace(/%2F/g, '/');
		url = url.split('?')[0];
		url = url.split('&')[0];
		if (url[url.length - 1] == '/')
			url = url.substr(0, url.length - 1);
		return url;
	}
	
	//get post type
	
	get_type(url)
	{
		console.log(url); //here is the bug permalink...
		if (url.split('/')[3] == 'permalink.php')
			return 'error';
		let type = url.split('/')[4];
		if (type[type.length - 1] == 's')
			type = type.substr(0, type.length - 1);
		if (type == 'post' || type == 'photo') //manage photo later.
			type = 'publication';
		return type;
		
	}
}

module.exports = FacebookBot;










