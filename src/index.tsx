import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './component/App';
import { setupStore } from 'app/store';
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <Provider store={setupStore()}>
          <App />
        </Provider>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);
