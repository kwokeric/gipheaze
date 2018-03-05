import React, { Component } from 'react';

import './Results.css';

class Results extends Component {
  onClick(task) {
    // window.open(`https://app.asana.com/0/${task.workspace.id}/${task.id}`, "_blank")
  }

  renderGifs() {
    let data = this.props.data;
    return data.map((gif, idx) => (
      this.renderGif(gif, idx)
    ))
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

export default Results;
