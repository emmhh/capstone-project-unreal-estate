import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './HomePage';
import SignupPage from './SignupPage';
import BookingConfirmation from './BookingConfirmation';
import BookingForm from './BookingForm';
import PropertyPage from './PropertyPage'
import PropertyReviewSubmitPage from './PropertyReviewSubmitPage'
import PropertyReviewPage from './PropertyReviewPage'
import ProfilePage from './ProfilePage';
import LoginPage from './LoginPage';
import ErrorPage from './ErrorPage';
import AdModule from './AdModule';
import AdForm from './AdForm';
import AdPreview from './AdPreview';
import Nav from './Nav';
import SearchResults from './SearchResults';
import GoogleMaps from './google-maps/Route';
import MyBookingsPage from './MyBookingsPage';
import MyReservationsPage from './MyReservationsPage';


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
          <Route exact path='/AdModule' component={AdModule}/>   {/** fix css later */}
          <Route exact path='/AdPreview' component={AdPreview} />  {/** fix css later */}
          <Route exact path='/AdForm/:property_id' component={AdForm}/>
          <Route exact path='/AdReservations/:property_id' component={MyReservationsPage} /> {/** fix css later */}
          <Route exact path='/signup' component={SignupPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/profile' component={ProfilePage} />
          <Route exact path='/mybookings' component={MyBookingsPage} />
          <Route exact path='/property/:property_id' component={PropertyPage} />
          <Route exact path='/submitReview/:property_id/:booking_id' component={PropertyReviewSubmitPage} />
          {/* <Route exact path='/review/:booking_id' component={PropertyReviewViewPage} /> */}
          <Route exact path='/propertyReviews/:property_id' component={PropertyReviewPage} />
          <Route exact path='/property_booking/:property_id' component={BookingForm} />
          <Route exact path='/confirmation/:booking_id' component={BookingConfirmation} />
          <Route exact path='/results' component={SearchResults} />
          <Route component={ErrorPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
