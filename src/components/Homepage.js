import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import './Homepage.css';
import Header from './Header.js';
import ResultsA from './ResultsA.js';
import ResultsB from './ResultsB.js';

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      query: "",
      data: {}
    }
  }

  componentWillMount() {
    this.fetchHomepage();
  }

  fetchHomepage() {
    fetch("https://api.giphy.com/v1/gifs/trending?api_key=7PdF03M1ELI9KIt5L6EmkA9fjndmIa38&limit=24&rating=G")
    .then((response) => (
      response.json()
    ))
    .then((JSON) => {
      this.setState({data: JSON.data});
    });
  }

  handleSearch(query) {
    browserHistory.push(`/search/${query}`);
  }

  render() {
    return (
      <div className="Homepage">
        <Header
          handleSearch={this.handleSearch}
        />
        <div className="homepage-title">TRENDING NOW</div>
        {
          localStorage.getItem("resultExperimentBucket") === "A" ?
          <ResultsA
            data={this.state.data}
          /> :
          <ResultsB
            data={this.state.data}
          />
        }
      </div>
    );
  }
}

export default Homepage;
