import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SignupPage from './SignupPage';
import ProfilePage from './ProfilePage';
import ErrorPage from './ErrorPage';
import Nav from './Nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/signup' component={SignupPage} />
          <Route exact path='/profile' component={ProfilePage} />
          <Route component={ErrorPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
