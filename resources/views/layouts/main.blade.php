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
				<h1>BBOY FRANCE</h1>
				<!--<a href="/">Classement</a>-->
				<a href="/news">Bboy News</a>
			</div>
		</nav>
		<header class="page">
			@yield('content')
			<aside class="aside">
				<div class="ad" id="ad"></div>
				<div class="ad"></div>
				<div class="ad"></div>
			</aside>		
		</header>
		<footer>
			<div class="cta">
				<a href="#">Partage</a>
			</div>
		</footer>
		
		<script src="./js/jquery.min.js"></script>
		<script src="./js/script.js" type="text/javascript"></script>
	</body>
</html>
