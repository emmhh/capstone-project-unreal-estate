import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './css/index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render((
  <Router>
    <App />
  </Router>
), document.getElementById('root'));
