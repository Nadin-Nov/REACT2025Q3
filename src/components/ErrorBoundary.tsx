import { Component, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary error-message">
          <h2>Uh oh… You just broke the multiverse!</h2>
          <p>
            Try refreshing the page, Morty. It *might* help… or not. Wubba Lubba
            Dub Dub!
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
