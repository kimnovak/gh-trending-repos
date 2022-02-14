import { Component, ErrorInfo } from 'react';

import ErrorFallbackUI from './ErrorFallbackUI';

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component {
    state: Readonly<State> = { hasError: false };
    constructor(props: Readonly<{}>) {
        super(props);
    }

    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <ErrorFallbackUI />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
