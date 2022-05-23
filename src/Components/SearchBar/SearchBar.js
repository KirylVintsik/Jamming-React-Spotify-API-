import React, { Component } from 'react';
import './SearchBar.css'

export class SearchBar extends Component {
  
  search = () => {
    this.props.onSearch(this.state.term)
  }

  handleChange = e => {
    this.setState({term:e.target.value})
  }

  render() {
    return (
        <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleChange}  />
        <button className="SearchButton" onClick={this.search} >SEARCH</button>
      </div>
    )
  }
}
