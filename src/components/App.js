import React, { Component } from 'react';

import './App.css';
import Homepage from './Homepage.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.assignResultExperiment = this.assignResultExperiment.bind(this);
  }

  componentWillMount() {
    /*
      For a complex/production app, I would use a framework like Planout.js
      to implement A/B tests. For this case, I'll simply randomly place users
      into test buckets and store which test bucket they fall into on
      localStorage. Uncomment the comments to select test cases.
    */

    this.assignResultExperiment();
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

  render() {
    return (
      (Object.keys(this.props.params).length === 0)
      ? <Homepage />
      : <div>{this.props.children}</div>
    )
  }
}

export default App;
