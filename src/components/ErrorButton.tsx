import { Component } from 'react';

export default class ErrorButton extends Component {
  handleClick = () => {
    throw new Error('Test');
  };

  render() {
    return (
      <button onClick={this.handleClick} className="error-button">
        Throw Error
      </button>
    );
  }
}
