import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import './Search.css';
import Header from './Header.js';
import Results from './Results.js';

class Search extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      searchQuery: props.params.query || "",
      data: {}
    };
  }

  handleSearch(query) {
    browserHistory.push(`/search/${query}`);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.query != this.state.searchQuery) {
      this.fetchResults(nextProps.params.query);
    }
  }

  fetchResults(query) {
    fetch("https://api.giphy.com/v1/gifs/search?api_key=7PdF03M1ELI9KIt5L6EmkA9fjndmIa38&q=" + query + "&limit=25&offset=0&rating=G&lang=en")
    .then((response) => (
      response.json()
    ))
    .then((JSON) => {
      this.setState({data: JSON.data});
    });
  }

  render() {
    return (
      <div className="search">
        <Header
          query={this.state.searchQuery}
          handleSearch={this.handleSearch}
        />
        <Results
          data={this.state.data}
        />
      </div>
    );
  }
}

export default Search;
