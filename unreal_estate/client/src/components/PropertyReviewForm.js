import React, { Component } from "react";
import {
  Row,
  Form,
  FormGroup,
  FormControl,
  FormLabel
} from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import 'date-fns';
import "../css/UserdetailsForm.css";

export default class PropertyReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      rating: null,
      text: null,
    };

    this.onFormChange = this.onFormChange.bind(this);
  }

  validateForm() {
    return (
      this.state.rating != null &&
      this.state.text.length > 0 
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });
  }

  onFormChange() {
    var userDetails = this.state;
    delete userDetails.isLoading;
    if (this.props.hidePassword){
      delete userDetails.password;
      delete userDetails.confirmPassword;
    }
    this.props.onFormChange(this.state);
  }

  renderForm() {
    var passwordElement = <div>
      <FormGroup as={Row} controlId="password" bsSize="large" style={{width: "50%"}}>
      <FormLabel >Password</FormLabel>
      <FormControl
        className="input"
        value={this.state.password}
        onChange={this.handleChange}
        type="password"
      />
      </FormGroup>
      <FormGroup as={Row} controlId="confirmPassword" bsSize="large" style={{width: "50%"}}>
        <FormLabel>Confirm Password</FormLabel>
        <FormControl
          value={this.state.confirmPassword}
          onChange={this.handleChange}
          type="password"
        />
      </FormGroup></div>;

    return (
      <Form container onSubmit={this.handleSubmit}>
        <FormGroup as={Row} controlId="firstName" bsSize="large" style={{width: "50%"}}>
          <FormLabel>First Name</FormLabel>
          <FormControl 
            value={this.state.firstName}
            onChange={this.handleChange}
            type="text"
          />
        </FormGroup>
        <FormGroup as={Row} controlId="lastName" bsSize="large" style={{width: "50%"}}>
          <FormLabel>Last Name</FormLabel>
          <FormControl 
            value={this.state.lastName}
            onChange={this.handleChange}
            type="text"
          />
        </FormGroup>
        <FormGroup as={Row} controlId="gender" bsSize="large" style={{width: "50%"}}>
          <FormLabel>Gender</FormLabel>
          <FormControl 
            value={this.state.gender}
            onChange={this.handleChange}
            as="select"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </FormControl>
        </FormGroup>
        <FormGroup as={Row} controlId="phoneNumber" bsSize="large" style={{width: "50%"}}>
          <FormLabel>Phone Number</FormLabel>
          <FormControl
            value={this.state.phone}
            onChange={this.handleChange}
            type="text"
          />
        </FormGroup>
        <FormGroup as={Row} controlId="email" bsSize="large" style={{width: "50%"}}>
          <FormLabel>Email</FormLabel>
          <FormControl 
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        {this.props.hidePassword !== true ? passwordElement : <div></div>}
        <Button variant="contained" color="primary" onClick={this.onFormChange}>Continue</Button>
      </Form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.renderForm()}
      </div>
    );
  }
}
