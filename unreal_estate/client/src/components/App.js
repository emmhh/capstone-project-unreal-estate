import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ErrorPage from './ErrorPage';
import AdModule from './AdModule';
import AdForm from './AdForm';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/AdModule' component={AdModule}/>
          <Route exact path='/AdForm' component={AdForm}/>
          <Route component={ErrorPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
