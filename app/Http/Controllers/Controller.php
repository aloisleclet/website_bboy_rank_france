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
	
	public function notfound()
	{
		$ads = $this->get_ads();
		return view('notfound', ['ads' => $ads]);
	}

	public function rank()
	{
		$ads = $this->get_ads();
		$actors = DB::select('SELECT actors.url, actors.likes, actors.type, actors.name FROM actors ORDER BY likes DESC');
		return view('rank', ['actors' => $actors, 'ads' => $ads]);
	}

	public function actor(Request $request)
	{
		$valid = Validator::make($request->all(),
		[
			'actor' => 'alpha',
		]);

		if ($valid->fails())
		{
			return redirect()->route('404');	
		}
		else
		{
			$ads = $this->get_ads();
			$actor = $request->actor;

			$news = $this->get_news($actor);
			if (sizeof($news[0]) == 0)
			{
				return redirect()->route('404');	
			}
			return view('news', ['news' => $news[0], 'actor'=> $actor, 'page' => 'actors', 'ads' => $ads, 'last_id'=> 0]);
		}
	}

	public function post(Request $request)
	{
		if (isset($request->id))
		{
			$id = $request->id;
			$ads = $this->get_ads();
			
			$sql = 'SELECT publications.*, actors.name AS actor
				FROM publications, actors
				WHERE publications.id_actor = actors.id
				AND publications.id = ?';

			$post = DB::select($sql, [$id]);

			if (sizeof($post) == 0)
				return redirect()->route('404');	

			$post[0]->url = $post[0]->actor;
			$post[0]->actor = '@'.$post[0]->actor;
			$post[0]->date = date("d/m/Y H:i:s", $post[0]->timestamp);

			return view('news', ['news' => $post, 'page' => 'post', 'ads' => $ads, 'last_id' => '']);
		}
		else
		{
			return redirect()->route('404');	
		}
	}

	public function news(Request $request)
	{
		$ads = $this->get_ads();

		if (isset($request->last_id))
		{
			$last_id = $request->last_id;
		}
		else
		{
			$last_id = 999999999999;
		}

		$news = $this->get_news(false, $last_id);
		return view('news', ['news' => $news[0], 'page' => 'news', 'ads' => $ads, 'last_id' => $news[1]]);

	}
	
	public function get_news($actor_name = false, $last_id = 999999999999999)//to clean
	{
		if (!$actor_name)
		{
			$sql = 'SELECT publications.*, actors.name AS actor
				FROM publications, actors
				WHERE publications.id_actor = actors.id
				AND ? > publications.timestamp
				ORDER BY timestamp DESC
				LIMIT 10';

			$news = DB::select($sql, [$last_id]);

		}
		else
		{
			$sql ='SELECT publications.*, actors.name AS actor
				FROM publications, actors
				WHERE publications.id_actor = actors.id
				AND actors.id = (SELECT actors.id FROM actors WHERE actors.name = ?)
				ORDER BY timestamp DESC';
		
			$news = DB::select($sql, [$actor_name]);
		}
		$i = 0;

		while ($i < sizeof($news))
		{
			$news[$i]->url = $news[$i]->actor;
			$news[$i]->actor = '@'.$news[$i]->actor;
			$news[$i]->date = date("d/m/Y H:i:s", $news[$i]->timestamp);
			$i++;
		}

		$last_id = 0;
		if (isset($news[$i -1]))
		{
			$last_id = $news[$i - 1]->timestamp;
		}
		return [$news, $last_id];
	}

	public function get_ads()
	{
		$products = DB::select('SELECT ads.* FROM ads ORDER BY id DESC');
		$products_size = sizeof($products) - 1;
		$rand = array();

		while (sizeof($rand) < 3)
		{
			$r = rand(0, $products_size);
			if (!in_array($r, $rand))
			{
				$rand[] = $r;
			}	
		}

		$ads = [
			$products[$rand[2]],
			$products[$rand[1]],
			$products[$rand[0]]
		];

		return $ads;
	}
}
