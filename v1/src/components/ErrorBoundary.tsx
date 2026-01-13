'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

function ErrorBoundaryContent({ hasError }: State) {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (hasError && !isRedirecting) {
      setIsRedirecting(true);
      const timer = setTimeout(() => {
        router.push('/');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [hasError, router, isRedirecting]);

  if (hasError) {
    return (
      <div className="text-center p-4">
        <p className="text-neutral-400">Something went wrong. Redirecting to homepage...</p>
      </div>
    );
  }

  return null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <ErrorBoundaryContent {...this.state} />
          {this.props.children}
        </div>
      );
    }

    return this.props.children;
  }
}
