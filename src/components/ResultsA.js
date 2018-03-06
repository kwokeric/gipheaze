import React, { Component } from 'react';

import './ResultsA.css';

class ResultsA extends Component {
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
    return (
      <div
        className="gif-container"
        key={`idx-${idx}`}
      >
        <img
          className="gif"
          src={gif.images.downsized_medium.url}
          onClick={() => this.onClick(gif)}
        />
      </div>
    )
  }

  render() {
    return (
      <div className="results-container">
        <div className="results">
          {
            (Object.keys(this.props.data).length === 0) ?
            <div className="spinner"></div> :
              this.renderGifs()
            }
        </div>
      </div>
    );
  }
}

export default ResultsA;
