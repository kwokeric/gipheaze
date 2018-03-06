import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import './Search.css';
import Header from './Header.js';
import ResultsA from './ResultsA.js';
import ResultsB from './ResultsB.js';

const RESULTS_PER_PAGE = 12;

class Search extends Component {
  constructor(props) {
    super(props);

    this.fetchResults = this.fetchResults.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePrevPageClick = this.handlePrevPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);

    this.state = {
      searchQuery: props.params.query || "",
      pageNumber: 1,
      data: []
    };
  }

  componentWillMount() {
    this.fetchResults(this.props.params.query);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.query !== this.state.searchQuery) {
      const isNewQuery = true;
      this.fetchResults(nextProps.params.query, isNewQuery);
    }
  }

  handleSearch(query) {
    browserHistory.push(`/search/${query}`);
  }

  fetchResults(query = this.props.params.query, isNewQuery = false) {
    // the API key should not be hardcoded in a production app
    fetch("https://api.giphy.com/v1/gifs/search?api_key=7PdF03M1ELI9KIt5L6EmkA9fjndmIa38&q=" +
      query + "&limit=" + RESULTS_PER_PAGE + "&offset=" + (this.state.data.length) + "&rating=G&lang=en")
    .then((response) => (
      response.json()
    ))
    .then((JSON) => {
      if (isNewQuery) {
        // replace previous data
        this.setState({ data: JSON.data });
      } else {
        // add to previous data
        this.setState({ data: this.state.data.concat(JSON.data) });
      }
    });
  }

  handlePrevPageClick() {
    this.setState({ pageNumber: this.state.pageNumber - 1 })
  }

  handleNextPageClick() {
    if (this.state.data.length / RESULTS_PER_PAGE === this.state.pageNumber) {
      this.fetchResults();
    }

    this.setState({ pageNumber: this.state.pageNumber + 1 });
  }

  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) this.fetchResults();
  }

  renderPage() {
    return (
      <div className="pageNumber-container">
        <span
          className={`prev-page ${this.state.pageNumber === 1 ? "hidden" : ""}`}
          onClick={this.handlePrevPageClick}
        >&#9664;</span>
        <span className="current-page-number">{this.state.pageNumber}</span>
        <span
          className="next-page"
          onClick={this.handleNextPageClick}
        >&#9654;</span>
      </div>
    )
  }

  render() {
    let data;
    if (localStorage.getItem("paginationExperimentBucket") === "A") {
      data = this.state.data.slice((this.state.pageNumber - 1) * RESULTS_PER_PAGE, (this.state.pageNumber) * RESULTS_PER_PAGE);
    } else {
      data = this.state.data;
    }

    return (
      <div className="search">
        <Header
          query={this.state.searchQuery}
          handleSearch={this.handleSearch}
        />
        {
          localStorage.getItem("resultExperimentBucket") === "A" ?
          <ResultsA
            data={data}
          /> :
          <ResultsB
            data={data}
          />
        }
        {
          localStorage.getItem("paginationExperimentBucket") === "A" ?
            this.renderPage() : null
        }
      </div>
    );
  }
}

export default Search;
