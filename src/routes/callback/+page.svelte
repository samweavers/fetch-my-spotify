<script>

  export let data;
  $: profile = data.profile;

  console.log(data)
  
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
    <a href="" class="btn">Fetch top tracks</a>
    <!-- <ul>
      <li>User ID: {profile.id}</li>
      <li>Email: {profile.email}</li>
      <li>
        Spotify URI: <a href={profile.external_urls.spotify}>{profile.uri}</a>
      </li>
      <li>Link: <a href={profile.href}>{profile.href}</a></li>
    </ul> -->
  </section>
{:else}
  <p>Loading...</p>
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