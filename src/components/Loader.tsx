import { Component } from 'react';

export default class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
}
