<script>
  import { topTracks } from '$lib/stores'

  export let data
  $: profile = data.profile

  console.log($topTracks)
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

{#if profile}
  <section class="grid gap-8" id="profile" class:invisible={profile === null}>
    <p class="text-4xl font-bold text-center">
      Logged in as <span>{profile.display_name}</span>
    </p>
    <ul>
      <li>User ID: {profile.id}</li>
      <li>Email: {profile.email}</li>
      <li>
        Spotify URI: <a href={profile.external_urls.spotify}>{profile.uri}</a>
      </li>
      <li>Link: <a href={profile.href}>{profile.href}</a></li>
    </ul>
  </section>
{:else}
  <p>Loading Profile...</p>
{/if}

{#if $topTracks}
  <section class="grid gap-8" id="profile" class:invisible={profile === null}>
    <p class="text-4xl font-bold text-center">Top Tracks:</p>
    <ul>
      {#each $topTracks.items as track}
        <li class="">
          <span>{track.name}</span>
          by
          {#each track.artists as artist}
            <span>{artist.name}</span>
          {/each}
        </li>
      {/each}
    </ul>
  </section>
{:else}
  <p>Loading Profile...</p>
{/if}

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }
</style>
