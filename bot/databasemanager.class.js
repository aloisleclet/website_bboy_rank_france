const config = require('./config');
const Database = require('./database.class');

class DatabaseManager
{

	//retrieve actors
	constructor()
	{
		this.db = new Database(config.db);
	}

	close()
	{
		this.db.close();
	}

	get_actors()
	{
		let sql = 'SELECT * FROM actors ORDER BY id DESC';
	
		return this.db.query(sql).then((res) => 
		{
	 		console.log('[db] download '+res.length+' actors');
			return res;
		});
	
	}
	
	upload(post)
	{
		if (post.type == 'video')
		{
			let id_video = post.id;
			let timestamp = post.timestamp;
			let url_actor = post.author.href;
			let text_video = this.rm_emoji(post.text);
			console.log('[db] upload '+id_video+' from '+post.author.value);
	
			this.db.query('INSERT IGNORE INTO videos values("'+id_video+'", "'+timestamp+'", (SELECT id FROM actors WHERE actors.url = "'+url_actor+'"), "'+text_video+'", NULL, NULL)');
		}
		else if (post.type == 'publication')
		{
			let timestamp = post.timestamp;
			let url_actor = post.author.href;
			let text = this.rm_emoji(post.text);
			console.log('[db] upload post from '+post.author.value);
			this.db.query('INSERT IGNORE INTO publications values(NULL, "'+timestamp+'", (SELECT id FROM actors WHERE actors.url = "'+url_actor+'"), "'+text+'", NULL, NULL)');
								
		}
		else if (post.type == 'link')
		{
			let timestamp = post.timestamp;
			let url_actor = post.author.href;
			let text = this.rm_emoji(post.text+'<br/><a href=\\"'+post.link.href+'\\" target=\\"_blank\\">'+post.link.value+'</a>'); // here is the sh
			let sql = 'INSERT IGNORE INTO publications values(NULL, "'+timestamp+'", (SELECT id FROM actors WHERE actors.url = "'+url_actor+'"), "'+text+'", NULL, NULL)';
			this.db.query(sql);
			console.log('[db] upload: post from '+post.author.value);
				
		}
	}
	
	//UTILS FUNCTIONS
	
	rm_emoji(text)
	{
		if (typeof text === 'undefined')
			return '';
		return text.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/g, '');
	}

}

module.exports = DatabaseManager;













