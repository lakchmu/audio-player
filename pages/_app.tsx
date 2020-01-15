import App from 'next/app';
import React from 'react';
import { Provider } from 'mobx-react';

import Store from '../store';

class MyApp extends App {
  state = {
    store: Store,
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={this.state.store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default MyApp;
