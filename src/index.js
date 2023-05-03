import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'; 
import 'jquery/dist/jquery';
import {HashRouter} from 'react-router-dom';
import App from './App';
import {Provider} from 'react-redux';
import store from './Redux/store';

import { render } from "react-dom"; // add this

render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);


