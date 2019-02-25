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
		<a href="#crew">CREW</a>
		<a href="#bboy">BBOY</a>
		<a href="#event">EVENT</a>
	</div>
	<table>
		<thead>
			<tr>
				<td>N</td>
				<td>Profil</td>	
				<td>Nom</td>	
				<td>Likes</td>	
			</tr>
		</thead>
		<tbody>
			@foreach( $actors as $actor)
			<tr data-type="{{ $actor-> type }}">
				<td>{{ $loop->iteration}}</td>
				<td class="pic"></td>
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
			</a>
			@endforeach
		</tbody>
	</table>	
</section>

@endsection
