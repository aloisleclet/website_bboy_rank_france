<!DOCTYPE html>
<html>
	<head>
		<title>@yield('title')</title>
		
		<link href="{{ asset('css/app.css') }}" media="screen, projection" type="text/css" rel="stylesheet"/>
		
		<meta charset="utf-8"/>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">	
		<meta http-equiv="Content-Language" content="fr,us" />
		
		<link rel="alternate" hreflang="fr">
				
		<meta name="Publisher" content="bboypro.com" />
		<meta name="google" content="notranslate" />
		<meta name="copyright" content="All Rights Reserved - Bboypro.com" />
		<meta name="Author" content="Aloïs LECLET" />
	
		<!-- seo -->
	
		<meta name="description" content="@yield('description')" />
	
		<!-- mobile -->

		<link rel="manifest" href="manifest.json">
		
		<meta name="theme-color" content="#ffffff">	
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		
		<meta name="apple-mobile-web-app-title" content="Bboy france rank" />
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">	

		<!-- icon sizes: 310 192 180 167 152 150 144 96 70 48 & 310x150 -->

		<!-- icons chrome opera firefox -->
		<link rel="icon" sizes="192x192" href="/img/icons/icon_192.png">
		
		<!-- icons safari -->
		<link rel="apple-touch-icon" href="/img/icons/icon.png">
		
		<!-- icons for ie -->
		<meta name="msapplication-square310x310logo" content="/img/icons/icon_310.png">

		<!--splash screen -->

		<link rel="apple-touch-startup-image" href="/img/icons/icon.png">

		<!--facebook -->
	
		<meta property="og:site_name" content="bboypro.com" />
		<meta property="fb:app_id" content="979834715534371" />

		<meta property="og:redirect_uri" content="https://bboypro.com" />
		<meta property="og:type" content="article" />
		<meta property="og:url" content="https://bboypro.com" />
		<meta property="og:title" content="Bboy france classement" />
		<meta property="og:description" content="Classement des meilleurs crew et bboy francais" />
		
		<!-- Global site tag (gtag.js) - Google Analytics -->
		<!--
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-131154379-1"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			
			gtag('config', 'UA-131154379-1');
		</script>
		-->
	</head>
	<body>
		<nav>
			<div class="wrap">
				<h1>BBOY NEWS</h1>
				<a class="tab" href="/rank">Classement</a>
				<a class="tab" href="/news">News</a>

				<div class="button-nav" id="button-nav">
					<div class="line"></div>
					<div class="line"></div>
					<div class="line"></div>

				</div>
				<div class="nav-mobile">
					<a href="/rank">Classement</a>
					<a href="/news">News</a>
				</div>
			</div>
		</nav>
		<header class="page">
			@yield('content')
			<aside class="aside">
				<div class="ad" id="ad">
					<a target="_blank"  href="{{ $ads[0]->urla}}"><img border="0" src="{{ $ads[0]->urlb }}" ></a><img src="{{ $ads[0]->urlc }}" width="1" height="1" border="0" alt="{{ $ads[0]->name}}" style="border:none !important; margin:0px !important;" />
				</div>
				<div class="ad">
					<a target="_blank"  href="{{ $ads[1]->urla}}"><img border="0" src="{{ $ads[1]->urlb }}" ></a><img src="{{ $ads[1]->urlc }}" width="1" height="1" border="0" alt="{{ $ads[1]->name}}" style="border:none !important; margin:0px !important;" />
				</div>
				<div class="ad">
					<a target="_blank"  href="{{ $ads[2]->urla}}"><img border="0" src="{{ $ads[2]->urlb }}" ></a><img src="{{ $ads[2]->urlc }}" width="1" height="1" border="0" alt="{{ $ads[2]->name}}" style="border:none !important; margin:0px !important;" />
				</div>
			</aside>
		</header>
		<footer>
			<div class="left">
				<h2>Bboy News</h2>
				<p>Bboy News est un media 100% bboying francais. Notre equipe regroupe toute l'actualites bboying chaque jour pour vous offrir une experience unique et simplifie.</p>
				<p>Le classement de bboy news est simplement base sur la popularites des acteurs (le nombre de like sur leurs pages facebook).</p>
				<p>Si tu aime la culture hip hop et notre initiative, n'hesite pas a partager ce site web et a en parler autour de toi ! c'est ce qui nous aide le plus.</p>
				<p>Si tu as des commentaires, des conseils, des suggestions n'hesite pas a <a href="">nous contacter</a></p>
				<p>Pour ajouter ton evenement, ton profil bboy, ton crew au classements : <a href="">contacte nous</a></p>
				<p>Peace</p>
				<p>Bboy News Crew.</p>
				<div class="cta">
					<a href="#">Partager</a>
				</div>
			</div>
			<div class="right">
			</div>
		</footer>
		
		<script src="{{ asset('js/jquery.min.js') }}" type="text/javascript"></script>
		<script src="{{ asset('js/jscroll.min.js') }}" type="text/javascript"></script>
		<script src="{{ asset('js/script.js') }}" type="text/javascript"></script>
	</body>
</html>









