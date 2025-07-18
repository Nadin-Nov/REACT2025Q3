import { Component } from 'react';

type State = {
  isErrorThrown: boolean;
};

export default class ErrorButton extends Component<
  Record<string, never>,
  State
> {
  state: State = {
    isErrorThrown: false,
  };

  handleClick = () => {
    this.setState({ isErrorThrown: true });
  };

  render() {
    if (this.state.isErrorThrown) {
      throw new Error('Test');
    }

    return (
      <button onClick={this.handleClick} className="error-button">
        Destroy the Universe
      </button>
    );
  }
}
