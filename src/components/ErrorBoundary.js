import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    this.setState({
      error: error.toString(),
      info: info.componentStack,
    });
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <h1>
          <details>
            <p>{this.state.error}</p>
            <p>{this.state.info}</p>
          </details>
        </h1>
      );
    }
    return this.props.children;
  }
}
