import { tokenable, topTracks, topSearch, profile } from '$lib/stores'
import { get } from 'svelte/store'
export const clientId = '889446bf020f4a75b316332f03e4efb5'

export async function checkAuth() {
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  if (!code) {
    redirectToAuthCodeFlow(clientId)
    return null
  } else {
    const accessToken = await getAccessToken(clientId, code)
    tokenable.set(accessToken)
    const profileData = await fetchProfile(accessToken)
    profile.set(profileData)
    const profileTopTracks = await fetchTopItems(accessToken)
    topTracks.set(profileTopTracks)

    return profileData
  }
}
// Redirect to Spotify authorization
export async function redirectToAuthCodeFlow(clientId) {
  const verifier = generateCodeVerifier(128)
  const challenge = await generateCodeChallenge(verifier)

  localStorage.setItem('verifier', verifier)

  const params = new URLSearchParams()
  params.append('client_id', clientId)
  params.append('response_type', 'code')
  params.append(
    'redirect_uri',
    'https://spotify-fetch-top-items.pages.dev/callback'
  )
  params.append('scope', 'user-read-private user-read-email user-top-read')
  params.append('code_challenge_method', 'S256')
  params.append('code_challenge', challenge)

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`
}

// Generate a code verifier (random string)
function generateCodeVerifier(length) {
  let text = ''
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

// Generate a code challenge using SHA-256
async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier)
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

// Exchange the authorization code for an access token
export async function getAccessToken(clientId, code) {
  const verifier = localStorage.getItem('verifier')

  const params = new URLSearchParams()
  params.append('client_id', clientId)
  params.append('grant_type', 'authorization_code')
  params.append('code', code)
  params.append(
    'redirect_uri',
    'https://spotify-fetch-top-items.pages.dev/callback'
  )
  params.append('code_verifier', verifier)

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  })
  const { access_token } = await result.json()
  return access_token
}

// Fetch the user's profile data from Spotify
export async function fetchProfile(token) {
  console.log('fetchProfileToken:', token)
  const result = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  })

  return await result.json()
}

export async function fetchTopItems(token) {
  const { timeRange, limit } = get(topSearch)
  const result = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}&offset=0`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return await result.json()
}
