import React, { Component } from 'react';
import {
  Row,
  Form,
  FormGroup,
  FormControl,
  FormLabel
} from "react-bootstrap";
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
      console.log(result);
      fetch('http://127.0.0.1:8000/user/testlogin')
      .then((resultLogin) => {
        console.log(resultLogin.json());
        console.log(resultLogin.context);
        localStorage.setItem('user_logged_in', true);
        console.log('it is testing login');
      })
    })
    this.setState({ isLoading: true });
  }

  render() {
    return (
      <div className="login-div">
        <h1>Login</h1>
        <Form container onSubmit={this.handleSubmit}>
          <FormGroup as={Row} controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup as={Row} controlId="password" bsSize="large">
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
