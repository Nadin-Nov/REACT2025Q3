import { Component } from 'react';

export default class SearchBAr extends Component {
  render() {
    return (
      <div className="search-bar">
        <input type="text" placeholder="Search..." className="search-input" />
        <button className="search-button">Search</button>
      </div>
    );
  }
}
