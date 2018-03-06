import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import './Search.css';
import Header from './Header.js';
import ResultsA from './ResultsA.js';
import ResultsB from './ResultsB.js';

const TOP_SCROLL_PNG = require('../static/top-scroll-btn.png')
const RESULTS_PER_PAGE = 12;

class Search extends Component {
  constructor(props) {
    super(props);

    this.fetchResults = this.fetchResults.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this._handlePrevPageClick = this._handlePrevPageClick.bind(this);
    this._handleNextPageClick = this._handleNextPageClick.bind(this);

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
    if (localStorage.getItem("paginationExperimentBucket") === "B") {
      window.addEventListener("scroll", this.handleScroll);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
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

  _handlePrevPageClick() {
    this.setState({ pageNumber: this.state.pageNumber - 1 })
  }

  _handleNextPageClick() {
    if (this.state.data.length / RESULTS_PER_PAGE === this.state.pageNumber) {
      this.fetchResults();
    }

    this.scrollToTop();
    this.setState({ pageNumber: this.state.pageNumber + 1 });
  }

  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    // fetch more results when user scrolls to bottom of page
    if (windowBottom >= docHeight) this.fetchResults();
  }

  scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  renderPageNumbers() {
    return (
      <div className="pageNumber-container">
        <span
          className={`prev-page ${this.state.pageNumber === 1 ? "hidden" : ""}`}
          onClick={this._handlePrevPageClick}
        >&#9664;</span>
        <span className="current-page-number">{this.state.pageNumber}</span>
        <span
          className="next-page"
          onClick={this._handleNextPageClick}
        >&#9654;</span>
      </div>
    )
  }

  renderTopButton() {
    return (
      <div className="top-scroll-btn" onClick={this.scrollToTop}>
        <img src={TOP_SCROLL_PNG} alt="top-scroll-icon" />
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
            this.renderPageNumbers() : null
        }
        { this.renderTopButton() }
      </div>
    );
  }
}

export default Search;
