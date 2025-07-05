import { Component } from 'react';

type State = {
  throwError: boolean;
};

export default class ErrorButton extends Component<
  Record<string, never>,
  State
> {
  state: State = {
    throwError: false,
  };

  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Test');
    }

    return (
      <button onClick={this.handleClick} className="error-button">
        Destroy the Universe
      </button>
    );
  }
}
