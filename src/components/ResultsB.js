import React, { Component } from 'react';

import './ResultsB.css';

class ResultsB extends Component {
  onClick(gif) {
    // log click data to analyze how many users click through to the gif page
    window.open(`${gif.url}`, "_blank");
  }

  renderGifs() {
    let data = this.props.data;

    return data.map((gif, idx) => (
      this.renderGif(gif, idx)
    ));
  }

  renderGif(gif, idx) {
    // meta-data has some faker start rating data
    return (
      <div
        className="gif-container-b"
        key={`idx-${idx}`}
      >
        <div
          className="gif-b"
          onClick={() => this.onClick(gif)}
        >
          <img src={gif.images.downsized.url} alt={`gif-${idx}`}/>
        </div>
        <div className="gif-b-meta">
          RATING: ★★★★☆
          <br/>
          TITLE: {gif.title ? gif.title : "none" }
          <br/>
          USER: {gif.username ? gif.username : "n/a" }
          <br/>
          <a href={gif.source}>SOURCE</a>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="results-container">
        {
          (Object.keys(this.props.data).length === 0) ?
          <div className="spinner"></div> :
          this.renderGifs()
        }
      </div>
    );
  }
}

export default ResultsB;
