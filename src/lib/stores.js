import { writable } from 'svelte/store'

export const profile = writable(null)
export const tokenable = writable(null)
export const topTracks = writable(null)
export const topSearch = writable({
  timeRange: 'long_term',
  limit: '20'
})
