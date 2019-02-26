@section('title')
Bboy France News
@endsection

@section('description')
Les denieres news en matiere de bboying
@endsection

@extends('layouts.main')

@section('content')

<section class="main newsfeed">
	@if ($page == 'actors')
		<div class="news">
			<div class="content">
				<h2>{{ $actor }}</h2>
			</div>
		</div>
	@endif
	@foreach ($news as $new)
		@if ($new->type == 'video')

			<div class="news">
				<div class="pic">
					<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fyesyesyes.guys%2Fvideos%2F{{ $new->id }}%2F&show_text=0&width=620" width="620" height="360" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>
					<!--<div class="share">+</div>-->
				</div>
				<div class="content">
					<a href="/{{ $new->url }}"><h3>{{ $new->actor }}</h3></a>
					<h3>{{ $new->date }}</h3>
					<p>{{ $new->text_video }}</p>
		
				</div>
			</div>
		@elseif ($new->type == 'photo')
			<div class="news">
				<!--<div class="pic" style="background-image:url('/');">
				</div>-->
				<div class="content">
					<a href="/{{ $new->url }}"><h3>{{ $new->actor }}</h3></a>
					<h3>{{ $new->date }}</h3>
					<p>{{ $new->text }}</p>
		
				</div>
			</div>
			
			
		@elseif ($new->type == 'publication')
			<div class="news">
				<div class="content">
					<a href="/{{ $new->url }}"><h3>{{ $new->actor }}</h3></a>
					<h3>{{ $new->date }}</h3>
	
					<p>{!! $new->text !!}</p>
				</div>
			</div>
		@endif
	@endforeach
</section>

@endsection
