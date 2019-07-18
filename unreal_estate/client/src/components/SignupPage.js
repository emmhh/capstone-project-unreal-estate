import React, { Component } from 'react';
import { toast } from 'react-toastify';
import UserdetailsForm from "./UserdetailsForm"
import "../css/SignupPage.css"

class SignupPage extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(userDetails){
    userDetails = this.checkDetails(userDetails);
    if (userDetails) {
      await fetch('http://127.0.0.1:8000/user/', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          userDetails: userDetails,
        })
      })
      .then((result)=> {
        if (result.status !== 201){
          throw result;
        }
        return result.json();
      })
      .then((result) => {
        toast.success(result.msg);
        window.location.href = 'http://127.0.0.1:8000/';
      })
      .catch((error) => {
        error.json()
        .then( (errorValue) => {
          console.log(errorValue);
          toast.error(errorValue.error);
        })
        
      });
    }
  }


  checkDetails(userDetails) {
    if (!userDetails.firstName) {
      toast.error('Please enter your first name.')
      return null;
    }
    if (!userDetails.lastName) {
      toast.error('Please enter your last name.')
      return null;
    }
    if (!userDetails.email) {
      toast.error('Please enter your email.')
      return null;
    }
    if (!userDetails.password){
      toast.error('Please enter your password.')
      return null;
    }
    if (!userDetails.confirmPassword){
      toast.error('Password do not match.')
      return null;
    }
    if (userDetails.password !== userDetails.confirmPassword) {
      toast.error('Password do not match.');
      return null;
    }
    return userDetails;
  }

  render() {
    return (
      <div className="signup-div">
        <h1>Signup Form</h1>
        <UserdetailsForm onFormChange={this.handleSubmit}/>
      </div>
    );
  }
}

export default SignupPage;
