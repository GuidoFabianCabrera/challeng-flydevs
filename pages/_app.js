import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';

import createEmotionCache from '../utility/createEmotionCache';

import store from './../store';

import theme from '../styles/theme/theme';
import '../styles/globals.scss';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  return (
    <Provider store={store}>
      <Wrapper {...props} />
    </Provider>
  );
};

const Wrapper = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
