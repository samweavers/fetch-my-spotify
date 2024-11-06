<script>
  import { profile } from '$lib/stores'
  import { topTracks } from '$lib/stores'
  import { tokenable } from '$lib/stores'
  import { page } from '$app/stores'
  import spotify from '$lib/images/spotify.svg'
  import { checkAuth } from '$lib/auth'
  import { onMount } from 'svelte'

  // onMount(() => {
  //   console.log('accessToken', $tokenable)
  // })

  async function callCheckProfile() {
    if (!$profile) {
      const profileData = await checkAuth()
      if (profileData) {
        profile.set(profileData) // Add this line to update the store
      }
      console.log('Fetched profile data:', profileData)
    }
  }
</script>

<header class="">
  <nav class="flex justify-between w-full p-4 items-center">
    <a href="/">
      <img width="50px" src={spotify} alt="Spotify" />
    </a>

    <li
      class="nav-item"
      aria-current={$page.url.pathname === '/' ? 'page' : undefined}
    >
      {#if $profile}
        <img
          class="rounded-full"
          src={$profile.images[0].url}
          alt="Profile image"
          width="50"
          height="50"
        />
      {:else}
        <button class="btn" on:click={callCheckProfile}
          >Connect to Spotify</button
        >
      {/if}
    </li>
  </nav>
</header>
