import * as React from 'react';

export interface ErrorBoundaryProps {}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, any> {
  state = { error: null };

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.error) {
      return null;
    }
    return this.props.children;
  }
}
