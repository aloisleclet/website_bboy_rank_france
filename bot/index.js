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

		let permalinks = await bot.get_n_first_post_permalink(3, actors[i].url);

		//scrap
		let j = 0;

		while (j < permalinks.length)
		{
			let permalink = permalinks[j];	
			if (permalink !== null)
			{
				let post = await bot.get_post(permalink);
				//upload	
				if (!post.hasOwnProperty('error'))
					db.upload(post);
			}
			j++;
		}
	
		i++;
	}

	db.close();
	bot.kill();
})();
