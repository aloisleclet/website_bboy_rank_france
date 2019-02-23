const DatabaseManager = require('./databasemanager.class');
const FacebookBot = require('./facebookbot.class'); // to rename facebook bot

//scrap

(async () =>
{
	let bot = new FacebookBot('Jeanne');
	let db = new DatabaseManager();
	let actors = await db.get_actors();

	await bot.init();

	let i = 0;
	
	while (i < actors.length)
	{
		//get permalink

		let permalink = await bot.get_first_post_permalink(actors[i].url);

		//scrap
		
		if (permalink !== null)
		{
			let post = await bot.get_post(permalink);
			//upload	
			if (!post.hasOwnProperty('error'))
				db.upload(post);
		}
	
		i++;
	}

	db.close();
	bot.kill();
})();
