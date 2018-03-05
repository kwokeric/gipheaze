import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import './Homepage.css';
import Header from './Header.js';

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillMount() {
    
  }

  handleSearch(query) {
    console.log(query)
    browserHistory.replace(`/search/${query}`);
  }

  render() {
    return (
      <div className="Homepage">
        <Header
          handleSearch={this.handleSearch}
        />

        <p className="Homepage-intro">
          To get started, edit <code>src/Homepage.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Homepage;
