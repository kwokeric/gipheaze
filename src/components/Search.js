import React, { Component } from 'react';
import './Search.css';

import Header from './Header.js';

class Search extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      searchQuery: props.params.query || ""
    };
  }

  handleSearch(query) {
    console.log(query)
    // browserHistory.push(`/search{this.state.searchQuery}`);
  }

  render() {
    console.log(this.state.searchQuery)
    return (
      <div className="App">
        <Header
          query={this.state.searchQuery}
          handleSearch={this.handleSearch}
        />

        <div className="lit">
          SEARCHHH
        </div>
      </div>
    );
  }
}

export default Search;
