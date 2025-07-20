import { Component } from 'react';

export default class Loader extends Component {
  render() {
    return (
      <div className="loader" data-testid="spinner" role="status">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
}
