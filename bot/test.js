const FacebookBot = require('./facebookbot.class');
const DatabaseManager = require('./databasemanager.class');


(async () =>
{
	let jeanne = new FacebookBot('jeanne');
	let db = new DatabaseManager();
	
	await jeanne.init();
	let actors = await db.get_actors();

	let i = 0;

	let rank = [];
	
	while (i < actors.length)
	{
		if (actors[i].type == 2) // only crew
		{
			let likes = await jeanne.get_likes(actors[i].url);
			console.log(actors[i].name+' '+likes);
			//call to db.update.
			db.update_likes(actors[i].name, likes);
			rank.push([likes, actors[i].name]);
		}	
		
		i++;
	}
	rank = await rank.sort();
	console.log(rank);


	//todo
	//bboynews.fr

	//BOT
	//clean + error managment
	
	//-clean way to fix bug : scrap something and the author is not register in the db -> avoid when it's not in db ?
	//-save & display picture or hide it or link it.
	//ARCHITECTURE : PAGE class / POST class
	//fucking permalink.php ?? length facebookbot.class 233 et 198

	//SITE	
	//Controller clean	
	//ads responsive mode avoid to infinite scroll -> del ads on responsive ? -> add ads between posts.
	//bug newsfeed all news are not displayed?
})();
