import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { AuthProvider } from './hooks/AuthContext';

import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  // Add your custom theme configurations here
  // components: {
  //   Button: {
  //     baseStyle: {
  //       fontSize: '1rem',
  //       padding: '0.25rem 0.5rem',
  //     },
  //     sizes: {
  //       md: {
  //         fontSize: '24px',
  //         padding: '0.5rem 1rem',
  //       },
  //     },
  //   },
  // },
});

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  // <StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <App />
      </ChakraProvider>
    </AuthProvider>
  </BrowserRouter>
  // </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
