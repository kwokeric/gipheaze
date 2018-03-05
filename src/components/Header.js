import React, { Component } from 'react';
import './Header.css';

const LOGO_PNG = require('../static/logo.png')
const SEARCH_PNG = require('../static/search-icon.png')

class Header extends Component {
  constructor(props) {
    super(props);

    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.handleSearch(e.target.value);
    }
  }

  render() {
    return (
      <div className="header">
        <div className="header-container">
          <div className="top-container">
            <img src={LOGO_PNG} alt="logo" />
            <div className="logo">GIPHEAZE</div>
          </div>
          <div className="search-container">
            <input
              className="search-input"
              type="text"
              name="search-input"
              onKeyPress={this._handleKeyPress}
              value={this.props.query ? this.props.query : ""}
            />
            <div className="search-icon">
              <img src={SEARCH_PNG} alt="search-icon" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
