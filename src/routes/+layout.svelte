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
  <main>
    <slot />
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
