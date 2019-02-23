<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class Controller extends BaseController
{
	use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
	
	public function cmp_timestamp($a, $b)
	{
		return strcmp($b->timestamp, $a->timestamp);
	}


	public function index()
	{
		return view('index');
	}
	
	public function news()
	{
		$videos = DB::select('SELECT videos.*, actors.name AS actor, "video" AS type FROM videos, actors WHERE videos.id_actor = actors.id ORDER BY timestamp DESC');

		$publications = DB::select('SELECT publications.*, actors.name AS actor, "publication" AS type FROM publications, actors WHERE publications.id_actor = actors.id ORDER BY timestamp DESC');

		$photos = DB::select('SELECT photos.*, actors.name AS actor, "photo" AS type FROM photos, actors WHERE photos.id_actor = actors.id ORDER BY timestamp DESC');

		$i = 0;
	
		$news = array_merge($videos, $publications, $photos);
		usort($news, array($this, "cmp_timestamp"));

		while ($i < sizeof($news))
		{
			$news[$i]->actor = '@'.$news[$i]->actor;
			$news[$i]->date = date("d/m/Y H:i:s", $news[$i]->timestamp);
			$i++;
		}

		return view('news', ['news' => $news]);
	}
	
	
}
