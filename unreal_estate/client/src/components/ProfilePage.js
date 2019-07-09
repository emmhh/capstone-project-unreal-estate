import React, { Component } from 'react';
import UserdetailsForm from "./UserdetailsForm"
import "../css/ProfilePage.css"

class ProfilePage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profile-div">
        <h1>Edit Profile Details</h1>
        <UserdetailsForm />
      </div>
    );
  }
}

export default ProfilePage;
