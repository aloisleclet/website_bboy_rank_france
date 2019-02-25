<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Validator;

class Controller extends BaseController
{
	use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
	
	public function cmp_timestamp($a, $b)
	{
		return strcmp($b->timestamp, $a->timestamp);
	}


	public function rank()
	{
			
		$actors = DB::select('SELECT actors.url, actors.likes, actors.type, actors.name FROM actors ORDER BY likes DESC');
		return view('rank', ['actors' => $actors]);
	}


	public function actor(Request $request)
	{
		$valid = Validator::make($request->all(),
		[
			'actor' => 'alpha',
		]);

		if ($valid->fails())
		{
			var_dump($valid->errors());
		}
		else
		{
			$actor = $request->actor;

			$news = $this->get_news($actor);
			if (sizeof($news) == 0)
			{
				return redirect()->route('news');	
			}
			return view('news', ['news' => $news, 'actor'=> $actor, 'page' => 'actors']);
		}
	}

	public function news()
	{
		$news = $this->get_news();
		return view('news', ['news' => $news, 'page' => 'news']);
	}
	
	public function get_news($actor_name = false)
	{
		if (!$actor_name)
		{
			$videos = DB::select('SELECT videos.*, actors.name AS actor, "video" AS type FROM videos, actors WHERE videos.id_actor = actors.id ORDER BY timestamp DESC');

			$publications = DB::select('SELECT publications.*, actors.name AS actor, "publication" AS type FROM publications, actors WHERE publications.id_actor = actors.id ORDER BY timestamp DESC');

			$photos = DB::select('SELECT photos.*, actors.name AS actor, "photo" AS type FROM photos, actors WHERE photos.id_actor = actors.id ORDER BY timestamp DESC');
		}
		else
		{
			$videos = DB::select('SELECT videos.*, actors.name AS actor, "video" AS type FROM videos, actors WHERE videos.id_actor = actors.id AND actors.id = (SELECT actors.id FROM actors WHERE actors.name = ?) ORDER BY timestamp DESC', [$actor_name]);

			$publications = DB::select('SELECT publications.*, actors.name AS actor, "publication" AS type FROM publications, actors WHERE publications.id_actor = actors.id AND actors.id = (SELECT actors.id FROM actors WHERE actors.name = ?) ORDER BY timestamp DESC', [$actor_name]);

			$photos = DB::select('SELECT photos.*, actors.name AS actor, "photo" AS type FROM photos, actors WHERE photos.id_actor = actors.id AND actors.id = (SELECT actors.id FROM actors WHERE actors.name = ?) ORDER BY timestamp DESC', [$actor_name]);
		}
		$i = 0;
	
		$news = array_merge($videos, $publications, $photos);
		usort($news, array($this, "cmp_timestamp"));

		while ($i < sizeof($news) && $i < 30) //limit 30
		{
			$news[$i]->url = $news[$i]->actor;
			$news[$i]->actor = '@'.$news[$i]->actor;
			$news[$i]->date = date("d/m/Y H:i:s", $news[$i]->timestamp);
			$i++;
		}
		return $news;
	}
	
	
}
