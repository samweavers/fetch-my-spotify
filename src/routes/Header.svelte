<script>
	import { page } from "$app/stores";
	import github from "$lib/images/github.svg";
	import spotify from "$lib/images/spotify.svg";
</script>

<header class="flex justify-between w-full p-4 items-center">
	<a href="/">
		<img width="50px" src={spotify} alt="Spotify" />
	</a>
	<nav>
		<!-- <ul class="">
			<li class="nav-item" aria-current={$page.url.pathname === "/" ? "page" : undefined}>
				<a
				target="_blank"
				href="https://developer.spotify.com/documentation/web-api/howtos/web-app-profile"
				>
				Spotify Docs
			</a>
		</li>
		</ul> -->
	</nav>

	<li class="btn outlined nav-item" aria-current={$page.url.pathname === "/" ? "page" : undefined}>
		<a href="/callback">Connect Spotify</a>
	</li>
</header>

<style>
</style>