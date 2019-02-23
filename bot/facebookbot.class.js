const puppeteer = require('puppeteer');

class FacebookBot
{

	constructor(name)
	{
		
		this.name = name;
		this.page = null;
		console.log('['+this.name+'] is up');
	}

	async init()
	{
		let browser = await puppeteer.launch({});
		this.page = await browser.newPage();
		return this.page;
	}

	async go(url)
	{
		await this.page.goto(url);
		console.log('['+name+'] '+this.clean_url(url));
		//await utils.sleep(1000);
	}
	
	kill()
	{
		browser.close();
		console.log('['+name+'] is down');
	}
	
	async get_first_post_permalink(url)
	{
		//go to permalink
		await this.page.goto(url);
		console.log('['+this.name+'] '+this.clean_url(url));
	//	await utils.sleep(500);
		
		return await this.page.evaluate(() =>
		{
		
			let userContentWrapper = document.getElementsByClassName('userContentWrapper');
			let permalink = null;
		
			if (typeof userContentWrapper[0] !== 'undefined')
			{
				permalink = userContentWrapper[0].querySelector('._5pcp a').href;
			}
		
			if (permalink != null && permalink.split('?')[1].split('=')[0] == 'story_fbid') //avoid storys
				permalink = null;
			
			return permalink;
		});
	}

	async get_post(permalink)
	{
		await this.page.goto(permalink);
		console.log('['+this.name+'] '+this.clean_url(permalink));
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
		
			
			//video id	
			if (res.type == 'video')
			{
				res.id = res.url.split('/')[5];	
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
				res.text = wrap[0].querySelector('p').innerText;
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
	
		post.url = this.clean_url(post.url);

		if (post.hasOwnProperty('author'))
			post.author.href = this.clean_url(post.author.href);
		if (post.hasOwnProperty('link'))
			post.link.href = this.clean_url(post.link.href);
		//set type
		post.type = this.get_type(post.url);
		
	
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
		let type = url.split('/')[4];
		if (type[type.length - 1] == 's')
			type = type.substr(0, type.length - 1);
		if (type == 'post' || type == 'photo') //manage photo later.
			type = 'publication';
		return type;
		
	}
}

module.exports = FacebookBot;










