import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

axios.defaults.baseURL =
  process.env.REACT_APP_NODE_ENV === 'production'
    ? 'https://rapebook-server.herokuapp.com/api'
    : 'http://localhost:5000/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <Toaster position="bottom-center" />
    </React.StrictMode>
  </Provider>
);
