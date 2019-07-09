import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './css/index.css';
import App from './components/App';
import Nav from './components/Nav';
ReactDOM.render((
  <Router>
    <Nav />
    <App />
  </Router>
), document.getElementById('root'));
