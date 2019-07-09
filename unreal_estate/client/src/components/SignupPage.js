import React, { Component } from 'react';
import UserdetailsForm from "./UserdetailsForm"
import "../css/SignupPage.css"

class SignupPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="signup-div">
        <h1>Signup Form</h1>
        <UserdetailsForm />
      </div>
    );
  }
}

export default SignupPage;
