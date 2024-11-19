<script>
  import { onMount } from 'svelte'
  import { profile } from '$lib/stores'

  onMount(() => {
    profile.set(null)
  })
</script>

<svelte:head>
  <title>Spotify Fetch</title>
  <meta name="description" content="Fetch your top" />
</svelte:head>

<section>
  <h1>Display your Spotify profile data</h1>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }
</style>
