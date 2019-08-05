import React, { Component } from 'react';
import { toast } from 'react-toastify';
import UserdetailsForm from "./UserdetailsForm"
import "../css/ProfilePage.css"
var ConfigFile = require('../config');

class ProfilePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      email: null,
      firstName: null,
      lastName: null,
      gender: null,
      phone: null
    }

    this.checkDetails = this.checkDetails.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUserDetails();
  }

  async getUserDetails() {
    await fetch(ConfigFile.Config.server + 'user/')
      .then((result) => {
        console.log(result);
        if (result.status !== 200) {
          throw result;
        }
        return result.json();
      })
      .then((result) => {
        console.log(result);
        this.setState({
          email: result.email,
          firstName: result.firstName,
          lastName: result.lastName,
          gender: result.gender,
          phone: result.phone,
          isLoading: false,
        });

      })
      .catch((error) => {
        error.json()
          .then((errorValue) => {
            console.log(errorValue);
            this.setState = {
              isLoading: false,
              email: null,
              firstName: null,
              lastName: null,
              gender: null,
              phone: null
            }
            toast.error(errorValue.error);
          });
      });
  }


  async handleSubmit(userDetails) {
    console.log(userDetails)
    userDetails = this.checkDetails(userDetails);
    if (userDetails) {
      await fetch(ConfigFile.Config.server + 'user/', {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          userDetails: userDetails,
        })
      })
        .then((result) => {
          if (result.status !== 200) {
            throw result;
          }
          return result.json();
        })
        .then((result) => {
          toast.success(result.msg);
          window.location.href = ConfigFile.Config.server + '';
        })
        .catch((error) => {
          error.json()
            .then((errorValue) => {
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
    return userDetails;
  }

  render() {
    var userDetails = this.state;
    var profilePage = <div>
      <h1>Edit Profile Details</h1>
      <UserdetailsForm hidePassword={true}
        firstName={userDetails.firstName}
        lastName={userDetails.lastName}
        gender={userDetails.gender}
        phone={userDetails.phone}
        email={userDetails.email}
        onFormChange={this.handleSubmit}
      />
    </div>;
    return (
      <div className="profile-div">
        {userDetails.isLoading ? <div></div> : profilePage }
      </div>


    );
  }
}

export default ProfilePage;
