const clientId = 'fe207a45cb314a09b46b7833cdede288'
const redirectURI = 'http://localhost:3000/'
let acessToken;



const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    // check for access acess token match

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1]
      const expiresIn = Number(expiresInMatch[1])

      //Clears parameters, allowing me to grab a new access Token
      //when it expires

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/')
      return accessToken;
    } else {
      const accessUrl = 'https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}'

      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch('https://api.spotify.com/v1/search?type=track&q=${term}', {
      headers: {
        Authorization: 'Bearer ${accessToken}'
      }
    }).then(response => {
      return response.json();
    }).then(jsonReponse => {
        if (!jsonReponse) {
          return [];
        }
        return jsonReponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }))
    })
  }
}

export default Spotify;
