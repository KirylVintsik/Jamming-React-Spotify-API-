let accessToken;
const clientID = "4d4d98ca7dbe48459d087df842c3027b";
const redirectURI = "https://jamming-react-spotify.netlify.app/";

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessURL;
    }
  },
  search(searchTerm) {
    const accessToken = this.getAccessToken();
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        } else {
          return jsonResponse.tracks.items.map((track) => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
            };
          });
        }
      });
  },
  savePlaylist(playlistName, trackURIs) {
    if (!(playlistName && trackURIs.length)) {
      return;
    }
    const accessToken = this.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userID;
    return fetch("https://api.spotify.com/v1/me", {
      headers: headers,
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userID = jsonResponse.id;
        fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: playlistName }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            let playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`,
              {
                headers: headers,
                method: "POST",
                body: JSON.stringify({uris: trackURIs})
              }
            );
          });
      });
  },
};

export default Spotify;
