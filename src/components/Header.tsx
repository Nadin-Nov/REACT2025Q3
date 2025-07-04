import { Component } from 'react';

import SearchBar from './SearchBar';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1 className="header-title">Search App</h1>
        <SearchBar />
      </header>
    );
  }
}
