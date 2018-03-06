import React, { Component } from 'react';

import './ResultsB.css';

class ResultsB extends Component {
  constructor(props) {
    super(props);
  }

  onClick(gif) {
    // open modal or show div
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
        <div
          className="gif"
          onClick={() => this.onClick(gif)}
        >
          <img src={gif.images.downsized.url} />
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
