<script>
  import Header from './Header.svelte'
  import '../app.css'
  import { profile } from '$lib/stores'

  export let data

  $: if (data.profile) {
    console.log('Layout received profile data:', data.profile)
    profile.set(data.profile)
  }
</script>

<div class="app">
  <Header />
  <main class="bg-elevated w-full py-12 gap-20 px-8 rounded-3xl grid items-start max-w-[98%] mx-auto">
    <slot />
  </main>
  <footer>
    <p>🤓 Sam Weavers</p>
  </footer>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
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
