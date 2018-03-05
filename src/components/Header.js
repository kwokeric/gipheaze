import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import './Header.css';

const LOGO_PNG = require('../static/logo.png')
const SEARCH_PNG = require('../static/search-icon.png')

class Header extends Component {
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
    this._handleHomepageClick = this._handleHomepageClick.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);

    this.state = {
      query: this.props.query || ""
    }
  }

  componentDidMount() {
    if (this.state.query) {
      // putting the query on the store via Redux would make this cleaner
      let input = document.getElementById("search-input");
      input.value = this.props.query;
    }
  }

  _handleHomepageClick() {
    browserHistory.push("/")
  }

  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.handleSearch(e.target.value);
    }
  }

  _handleClick() {
    let input = document.getElementById("search-input");
    this.props.handleSearch(input.value);
  }

  render() {
    return (
      <div className="header">
        <div className="header-container">
          <div className="top-container" onClick={this._handleHomepageClick}>
            <img src={LOGO_PNG} alt="logo" />
            <div className="logo">GIPHEAZE</div>
          </div>
          <div className="search-container">
            <input
              id="search-input"
              type="text"
              name="search-input"
              onKeyPress={this._handleKeyPress}
            />
            <div className="search-icon" onClick={this._handleClick}>
              <img src={SEARCH_PNG} alt="search-icon" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
