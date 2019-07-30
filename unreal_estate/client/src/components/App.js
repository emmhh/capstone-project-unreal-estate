import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './HomePage';
import SignupPage from './SignupPage';
import PropertyPage from './PropertyPage'
import ProfilePage from './ProfilePage';
import LoginPage from './LoginPage';
import ErrorPage from './ErrorPage';
import AdModule from './AdModule';
import AdForm from './AdForm';
import AdPreview from './AdPreview';
import Nav from './Nav';
import SearchResults from './SearchResults';

toast.configure({
  autoClose: 8000,
  draggable: false,
  position: toast.POSITION.TOP_RIGHT,
  //etc you get the idea
});
class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        {/* <ToastContainer /> */}
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/AdModule' component={AdModule}/>
          <Route exact path='/AdPreview' component={AdPreview}/>
          <Route exact path='/AdForm/:property_id' component={AdForm}/>
          <Route exact path='/signup' component={SignupPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/profile' component={ProfilePage} />
          <Route exact path='/property/:property_id' component={PropertyPage} />
          <Route exact path='/results' component={SearchResults} />
          <Route component={ErrorPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
