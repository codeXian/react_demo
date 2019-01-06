import React, { Component, Suspense } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import Loading from '@/components/Loading';
const OtherComponent = React.lazy(() => import('./OtherComponent'));

export default class Lazy extends Component {
  render() {
    return (
      <div>
        lazy页面
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <OtherComponent />
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  }
}
