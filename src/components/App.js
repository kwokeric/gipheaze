import React, { Component } from 'react';

import './App.css';
import Homepage from './Homepage.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.assignResultExperiment = this.assignResultExperiment.bind(this);
    this.assignPaginationExperiment = this.assignPaginationExperiment.bind(this);
  }

  componentWillMount() {
    /*
      For a complex/production app, I would use a framework like Planout.js
      to implement A/B tests. For simplicity, I'll simply randomly place users
      into test buckets and store which test bucket they fall into on
      localStorage. Uncomment the comments to select specific test cases
      or change it in dev tools (Application > Local Storage)
    */

    this.assignResultExperiment();
    this.assignPaginationExperiment();
  }

  assignResultExperiment() {
    // check local storage for Result Experiment bucketting
    if (!localStorage.getItem("resultExperimentBucket")) {
      let resultTestCase = Math.random() < 0.5 ? "A" : "B";
      localStorage.setItem("resultExperimentBucket", resultTestCase);
    }
    /*
      A: condensed grid without text
      B: each gif takes up a full row. metadata displayed
    */
    // localStorage.setItem("resultExperimentBucket", "A");
    // localStorage.setItem("resultExperimentBucket", "B");
  }

  assignPaginationExperiment() {
    // check local storage for Result Experiment bucketting
    if (!localStorage.getItem("paginationExperimentBucket")) {
      let resultTestCase = Math.random() < 0.5 ? "A" : "B";
      localStorage.setItem("paginationExperimentBucket", resultTestCase);
    }
    /*
      A: user must click arrows to load more gifs
      B: user scrolls to bottom to load more gifs (infinite scroll)
    */
    // localStorage.setItem("paginationExperimentBucket", "A");
    // localStorage.setItem("paginationExperimentBucket", "B");
  }

  render() {
    return (
      (Object.keys(this.props.params).length === 0)
      ? <Homepage />
      : <div>{this.props.children}</div>
    )
  }
}

export default App;
