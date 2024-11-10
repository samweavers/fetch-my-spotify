import { checkAuth } from '$lib/auth'

export async function load({ url }) {
  if (typeof window !== 'undefined') {
    try {
      const profile = await checkAuth()
      return { profile }
    } catch (error) {
      console.error('Error in layout load function:', error)
      return { profile: null }
    }
  }
  return { profile: null }
}