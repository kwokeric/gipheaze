import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import './App.css';
import Homepage from './Homepage.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(query) {
    browserHistory.replace(`/search/${query}`);
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
