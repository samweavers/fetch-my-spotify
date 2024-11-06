<script>
  import { onMount } from 'svelte'
  import { profile } from '$lib/stores'

  onMount(() => {
    profile.set(null)
  })
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <h1>Display your Spotify profile data</h1>
  <p>a test by Sam Weavers</p>
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
