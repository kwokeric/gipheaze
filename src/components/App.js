import React, { Component } from 'react';
import './App.css';

import Header from './Header.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      searchQuery: ""
    };
  }

  handleSearch(query) {
    console.log(query)
    // browserHistory.push(`/search{this.state.searchQuery}`);
  }

  render() {
    return (
      <div className="App">
        <Header
          handleSearch={this.handleSearch}
        />

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
