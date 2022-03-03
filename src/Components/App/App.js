import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        // { name: "Deez", artist: "Nuts", album: "DeezNuts", id: 1 },
        // { name: "Joshua", artist: "Gimme", album: "MyBlood", id: 2 },
        // { name: "Joji", artist: "Gorgo", album: "Govani", id: 3 },
      ],
      playlistName: "My Top",
      playlistTracks: [
        { name: "Rise", artist: "Again", album: "Givarol", id: 4 },
        { name: "Krab", artist: "Goyll", album: "Krbankoyl", id: 5 },
        { name: "My", artist: "Name", album: "DeezNuts", id: 6 },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if(tracks.find(savedTrack => 
      savedTrack.id === track.id)) {
        return
      } else {
        tracks.push(track);
      }
    this.setState({playlistTracks: tracks})
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(removedTrack => 
      removedTrack.id !== track.id);
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName:name})
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    .then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults
      })
    })
    
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
                            onAdd={this.addTrack} 
                            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
