import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './app/store';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
