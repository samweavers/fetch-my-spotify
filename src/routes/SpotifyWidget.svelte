<script>
  import { onMount } from "svelte";
  import { Buffer } from "buffer";

  let tracks = [];
  let access_token = "";

  let client_id = "889446bf020f4a75b316332f03e4efb5";
  let client_secret = "6657e19d5feb4f3eb75a62f6a48249fc";

  async function getAccessToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json()
    access_token = data.access_token
    return access_token
  }


  async function fetchTopTracks() {
    console.log('access token:', access_token);

    const response = await fetch(
      "https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const topTracks = await response.json();
    tracks = topTracks.tracks.items
    console.log(tracks[0].track.name)
    return tracks
  }

  onMount(() => {
    getAccessToken()
      .then((data) => fetchTopTracks())
      .catch((error) => console.error("Error:", error));
  });
</script>

<section class="block-with-text">
  <h2 class="text-left">My current playlist on spotify</h2>

  {#if tracks.length > 0}
    <div class="grid gap-1">
      {#each tracks as { track}, index}
      <div class="grid grid-cols-[max-content,1fr] children:span-1">
        <strong class="pr-4 w-30px h-30px text-white">{index + 1}</strong>
        <p>{track.name} by {track.artists.map((artist) => artist.name).join(", ")}</p>
      </div>
    {/each}
  </div>
  {:else}
    <p>Loading Data...</p>
  {/if}
</section>

<style>
</style>
