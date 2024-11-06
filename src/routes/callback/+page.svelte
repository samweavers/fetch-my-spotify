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
    <ul class="grid gap-4">
      {#each $topTracks.items as track, i}
        <li class="">
          <a
            class="p-4 border-[1px] border-zinc-700 grid grid-cols-3"
            href={track.external_urls.spotify}
          >
            <span>{i + 1}</span>
            <span>{track.name}</span>
            {#each track.artists as artist, i}
              <span class="">
                {artist.name}{i < track.artists.length - 1 ? ', ' : ''}</span
              >
            {/each}
          </a>
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
