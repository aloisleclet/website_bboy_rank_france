@extends('layouts.main')


@section('title')
Bboying France : le classement
@endsection

@section('description')
Le classement des meilleurs bboys francais.
@endsection


@section('content')

<section class="main rank">
	<div class="buttons">
		<a id="all" href="#all">TOUT</a>
		<a id="crew" href="#crew">CREW</a>
		<a id="bboy" href="#bboy">BBOY</a>
		<a id="event" href="#event">EVENT</a>
	</div>
	<table cellpadding=0 cellspacing=0>
		<tbody>
			@foreach( $actors as $actor)
			<tr data-type="{{ $actor-> type }}">
				<td>{{ $loop->iteration}}</td>
				<td>
					<div class="pic"></div>
				</td>
				<td>
					<a href="/{{ $actor->name }}">
						{{ $actor->name}}
					</a>
				</td>
				<td>
					<a href="{{ $actor->url }}" target="_blank">
						{{ $actor->likes}}
					</a>
				</td>
			</tr>
			@endforeach
		</tbody>
	</table>	
</section>

@endsection
