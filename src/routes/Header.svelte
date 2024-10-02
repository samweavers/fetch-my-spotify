<script>
	import { page } from "$app/stores";
	import spotify from "$lib/images/spotify.svg";

	export let profile
</script>

<header class="">
	<nav class="flex justify-between w-full p-4 items-center">
		<a href="/">
			<img width="50px" src={spotify} alt="Spotify" />
		</a>
		
		<li class="nav-item" aria-current={$page.url.pathname === "/" ? "page" : undefined}>
			{#if profile}
			<img class="rounded-full" src={profile.images[0].url} alt="Profile image" width="50" height="50" />
			{:else}
			<a class="btn outlined" href="/callback">Connect Spotify</a>
			{/if}
		</li>
	</nav>
</header>

<style>
</style>