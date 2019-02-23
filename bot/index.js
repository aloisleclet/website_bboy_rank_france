const puppeteer = require('puppeteer');
const mysql = require('mysql');

const sleep = async (ms) => {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res();
		}, ms)
	});
}

let db = mysql.createConnection(
{
	host: 'localhost',
	user: 'root',
	password: 'thisisit',
	database: 'db_bboyfrancerank'
});

db.connect(function (err)
{
	if (err)
		console.log('[ERROR] db: '+err);
});


function get_actors(callback)
{
	//retrieve actors

	let actors = db.query('SELECT * FROM actors', (err, results, fields) =>
	{
 		if (err)
 			return console.error(err.message);

 		console.log(results);
		return callback(results);
	});

}

async function feed(actors)
{
	//feed
//	const browser = await puppeteer.launch({headless: false, args:['--start-maximized']});
	const browser = await puppeteer.launch({});
	const page = await browser.newPage();
	await page.setViewport({width: 1366, height: 768});
	const FORM = {login: '#email', pass: '#pass', button: '#loginbutton'};

	var i = 0;
	var posts = [];

	while (i < actors.length)
	{
		await page.goto(actors[i].url);
		console.log(actors[i].url);
		await sleep(500);

		//go to permalink

		var permalink = await page.evaluate(() =>
		{
			let userContentWrapper = document.getElementsByClassName('userContentWrapper');
			let permalink = null;
			if (typeof userContentWrapper[0] !== 'undefined')
			{
				permalink = userContentWrapper[0].querySelector('._5pcp a').href;
			}

			if (permalink != null && permalink.split('?')[1].split('=')[0] == 'story_fbid') //drop storys
				permalink = null;
	
			return permalink;
		});
		
		if (permalink !== null)
		{
			await page.goto(permalink);
			console.log(permalink.split('?')[0]);
			type = permalink.split('/')[4];
			await sleep(1000);

			//scrap
	
			let post = await page.evaluate(() =>
			{	
				function clean_url(url)
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

				function get_type(url)
				{
					let type = url.split('/')[4];
					if (type[type.length - 1] == 's')
						type = type.substr(0, type.length - 1);
					if (type == 'post' || type == 'photo') //manage photo later.
						type = 'publication';
					return type;
					
				}

				let wrap = document.getElementsByClassName('_3ekx');

				let res = {};	
				res.url = clean_url(document.location.href);
			
				//test not found

				if (document.title == 'Page Not Found | Facebook')
				{
					res.error = 'not found';
					return res;
				}

				//type

				res.type = get_type(res.url);
	
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

					res.link.href = clean_url(link.getAttribute('href').split('u=')[1]);
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
					res.author.href = clean_url(wrap[0].querySelector('a').getAttribute('href'));
				}

				//download photo	
			//	wrap = document.getElementsByClassName('scaledImageFitWidth');

			//	if (res.type == 'photo'  && typeof wrap[0] !== 'undefined')
			//	{
			//			
			//		let url = wrap[0].getAttribute('src');
			//		res.image = url;
			//	}
				return res;
			});

			posts.push(post);
		}
		i++;
	}

	browser.close();
	console.log(posts);

	await sleep(1000);

	//upload data

	function without_emoji(text)
	{
		if (typeof text === 'undefined')
			return '';
		return text.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/g, '');
	}

	let j = 0;

	while (j < posts.length)
	{

		let post = posts[j];
		while (!post.hasOwnProperty('author')) // little check for error
		{
			post = posts[j];
			console.log('[ERROR] with : ');
			console.log(post);
			j++;
		}

		if (post.type == 'video')
		{
			let id_video = post.id;
			let timestamp = post.timestamp;
			let url_actor = post.author.href;
			let text_video = without_emoji(post.text);
			console.log('UPLOAD: '+id_video+' from '+post.author.value);

			db.query('INSERT IGNORE INTO videos values("'+id_video+'", "'+timestamp+'", (SELECT id FROM actors WHERE actors.url = "'+url_actor+'"), "'+text_video+'", NULL, NULL)');
		}
		else if (post.type == 'publication')
		{
			let timestamp = post.timestamp;
			let url_actor = post.author.href;
			let text = without_emoji(post.text);
			console.log('UPLOAD: post from '+post.author.value);
			db.query('INSERT IGNORE INTO publications values(NULL, "'+timestamp+'", (SELECT id FROM actors WHERE actors.url = "'+url_actor+'"), "'+text+'", NULL, NULL)');
								
		}
		else if (post.type == 'link')
		{
			let timestamp = post.timestamp;
			let url_actor = post.author.href;
			let text = without_emoji(post.text+'<br/><a href=\\"'+post.link.href+'\\" target=\\"_blank\\">'+post.link.value+'</a>'); // here is the sh
			console.log(text);
			let sql = 'INSERT IGNORE INTO publications values(NULL, "'+timestamp+'", (SELECT id FROM actors WHERE actors.url = "'+url_actor+'"), "'+text+'", NULL, NULL)';
			console.log(sql);
			db.query(sql);
			console.log('UPLOAD: post from '+post.author.value);
								
		}

		j++;
	}
}
get_actors(feed);
