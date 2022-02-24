import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import store from '@app/store';
import theme from '@app/constants/theme';
import Loader from '@app/components/Loader';
import ToastHandler from '@app/components/ToastHandler';

import AppRouter from './Router';
import Header from './components/navbar';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Loader />}>
          <BrowserRouter>
            <Header />
            <AppRouter />
          </BrowserRouter>
          <ToastHandler />
        </Suspense>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
