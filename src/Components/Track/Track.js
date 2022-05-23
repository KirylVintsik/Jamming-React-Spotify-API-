import React, { Component } from "react";
import "./Track.css";

export class Track extends Component {

  addTrack = () => {
    this.props.onAdd(this.props.track);
  }
  removeTrack = () => {
    this.props.onRemove(this.props.track)
  }

  renderAction() {
    if (!this.props.isRemoval) {
     return <button className="Track-action" onClick={this.addTrack}> + </button>
    } else {
     return <button className="Track-action" onClick={this.removeTrack}> - </button>
    };
  }
  render() {
    const { name, album, artist } = this.props.track;

    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{name}</h3>
          <p>
            {album} | {artist}
          </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}
