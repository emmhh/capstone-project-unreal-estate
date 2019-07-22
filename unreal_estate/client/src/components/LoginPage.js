import React, { Component } from 'react';
import {
  Row,
  Form,
  FormGroup,
  FormControl,
  FormLabel
} from "react-bootstrap";
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import "../css/LoginPage.css"

class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    // event.preventDefault();
    this.setState({ isLoading: true });
    await fetch('http://127.0.0.1:8000/user/login',{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(result => {
      if (result.status !== 200) {
        throw result;
      }
      console.log(result);
      fetch('http://127.0.0.1:8000/user/testlogin')
      .then((resultLogin) => {
        return resultLogin.json() 
      })
      .then((responce) => {
        // console.log(resultLogin.context);
        var user_logged_in;
        if (responce && responce.user_logged_in) {
          user_logged_in = true;
        } else {
          user_logged_in = false;
        }
        localStorage.setItem('is_user_logged_in', user_logged_in);
        console.log(responce);
        if (user_logged_in){
          window.location.href = 'http://127.0.0.1:8000/';
        }
      });
    })
    .catch((error) => {
      error.json()
        .then((errorValue) => {
          toast.error(errorValue.error);
        });
    });
  }

  render() {
    return (
      <div className="login-div" style={{textAlign: "-webkit-center"}}>
        <h1>Login</h1>
        <Form container onSubmit={this.handleSubmit}>
          <FormGroup as={Row} controlId="email" bsSize="large" style={{width: "50%"}}>
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup as={Row} controlId="password" bsSize="large" style={{width: "50%"}}>
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button className="Submit" variant="contained" color="primary" onClick={this.handleConfirmationSubmit}>
            Continue
          </Button>
        </Form>
      </div>
    );
  }
}

export default LoginPage;
