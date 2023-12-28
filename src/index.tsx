import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './component/App';
import { setupStore } from 'app/store';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={setupStore()}>
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
