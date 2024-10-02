<script>
	import Header from './Header.svelte';
	import '../app.css';
	import { checkAuth } from '$lib/auth';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
 
	export let data;
 
	const profile = writable(null);
	$: if (data.profile) {
		profile.set(data.profile);
	}
 
	onMount(async () => {
		if (!$profile) {
			const profileData = await checkAuth();
			profile.set(profileData);
		}
	});
 </script>
 
 <div class="app">
	 <Header profile={$profile}/>
	 <main>
		 <slot profile={$profile} />
	 </main>
	 <footer>
		 <p>Sam Weavers</p>
	 </footer>
 </div>
 
 <style>
	 .app {
		 display: flex;
		 flex-direction: column;
		 min-height: 100vh;
	 }
	 main {
		 @apply bg-base mx-4 rounded-xl;
		 flex: 1;
		 display: flex;
		 flex-direction: column;
		 box-sizing: border-box;
	 }
	 footer {
		 display: flex;
		 flex-direction: column;
		 justify-content: center;
		 align-items: center;
		 padding: 12px;
	 }
	 footer a {
		 font-weight: bold;
	 }
	 @media (min-width: 480px) {
		 footer {
			 padding: 12px 0;
		 }
	 }
 </style>