<script>
  import Spinner from '$lib/Spinner.svelte'

  import { fetchTopItems } from '$lib/auth'
  import { tokenable, topTracks, topSearch } from '$lib/stores'
  import { get } from 'svelte/store'

  export let data

  // Fetch top tracks every time topSearch changes
  async function getTopResults() {
    const fetchedTopResults = await fetchTopItems(get(tokenable))
    topTracks.set(fetchedTopResults)
  }

  $: getTopResults(), $topSearch
  $: profile = data.profile
</script>

<svelte:head>
  <title>Your Top Tracks - Spotify Fetch</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

{#if $topTracks && typeof window !== 'undefined'}
  <section class="grid gap-8" id="profile" class:invisible={profile === null}>
    <h1>Top Tracks:</h1>
    <section class="grid gap-8">
      <article class="flex gap-4">
        <div class="grid place-items-center">
          <div class="select">
            <select bind:value={$topSearch.timeRange}>
              <option value="short_term">4 Weeks</option>
              <option value="medium_term">6 Months</option>
              <option value="long_term">1 Year</option>
            </select>
          </div>
        </div>
        <div class="grid place-items-center">
          <select bind:value={$topSearch.limit}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
      </article>
      <p class="text-lg">
        Displaying top {$topSearch.limit} tracks from the {$topSearch.timeRange}
      </p>
    </section>
    <ul class="grid gap-4">
      {#each $topTracks?.items as track, i}
        <li class="">
          <a
            class="flex flex-col lg:flex-row items-center w-full bg-base justify-between rounded-lg transition-all ease gap-4 hover:brightness-125 hover:scale-[102%] p-8 lg:py-2 lg:px-6"
            href={track.external_urls.spotify}
            target="_blank"
          >
            <span class="text-lg">{i + 1}</span>
            <img src={track.album.images[0].url} alt="" width="75" />
            <div class="flex flex-col gap-2 w-full">
              <span class="text-lg text-center lg:text-left">{track.name}</span>
              <span class="text-zinc-400 text-center lg:text-left">
                {#each track.artists as artist, i}
                  {artist.name}{i < track.artists.length - 1 ? ', ' : ''}
                {/each}
              </span>
            </div>
            <span class="self-center lg:whitespace-nowrap"
              >{track.album.name}</span
            >
          </a>
        </li>
      {/each}
    </ul>
  </section>
{:else}
  <section class="grid place-items-center text-center gap-8">
    <Spinner />
    <p class="text-center text-xl">Loading Profile...</p>
  </section>
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
