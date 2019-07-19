import React, { Component } from "react";
import {
  Row,
  Form,
  FormGroup,
  FormControl,
  FormLabel
} from "react-bootstrap";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import 'date-fns';
// import LoaderButton from "../components/LoaderButton";
import "../css/UserdetailsForm.css";

export default class UserdetailsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: props.email ? props.email : null,
      password: null,
      confirmPassword: null,
      firstName: props.firstName ? props.firstName : null,
      lastName: this.props.lastName ? this.props.lastName : null,
      gender: this.props.gender ? this.props.gender : "Male",
      phone: this.props.phone ? this.props.phone : null
    };

    this.onFormChange = this.onFormChange.bind(this);
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
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

  // handleSubmit = async event => {
  //   event.preventDefault();

  //   this.setState({ isLoading: true });

  //   this.setState({ newUser: "test" });
  //   this.props.userDetails = this.state;
  //   this.setState({ isLoading: false });
  // }

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

  // renderConfirmationForm() {
  //   return (
  //     <form onSubmit={this.handleConfirmationSubmit}>
  //       <FormGroup as={Row} controlId="confirmationCode" bsSize="large">
  //         <FormLabel>Confirmation Code</FormLabel>
  //         <FormControl 
  //           autoFocus
  //           type="tel"
  //           value={this.state.confirmationCode}
  //           onChange={this.handleChange}
  //         />
  //       </FormGroup>
  //       {/* <LoaderButton
  //         block
  //         bsSize="large"
  //         disabled={!this.validateConfirmationForm()}
  //         type="submit"
  //         isLoading={this.state.isLoading}
  //         text="Verify"
  //         loadingText="Verifying…"
  //       /> */}
  //     </form>
  //   );
  // }

  renderForm() {
    var passwordElement = <div>
      <FormGroup as={Row} controlId="password" bsSize="large">
      <FormLabel>Password</FormLabel>
      <FormControl
        value={this.state.password}
        onChange={this.handleChange}
        type="password"
      />
      </FormGroup>
      <FormGroup as={Row} controlId="confirmPassword" bsSize="large">
        <FormLabel>Confirm Password</FormLabel>
        <FormControl
          value={this.state.confirmPassword}
          onChange={this.handleChange}
          type="password"
        />
      </FormGroup></div>;

    return (
      <Form container onSubmit={this.handleSubmit}>
        <FormGroup as={Row} controlId="firstName" bsSize="large">
          <FormLabel>First Name</FormLabel>
          <FormControl 
            value={this.state.firstName}
            onChange={this.handleChange}
            type="text"
          />
        </FormGroup>
        <FormGroup as={Row} controlId="lastName" bsSize="large">
          <FormLabel>Last Name</FormLabel>
          <FormControl 
            value={this.state.lastName}
            onChange={this.handleChange}
            type="text"
          />
        </FormGroup>
        <FormGroup as={Row} controlId="gender" bsSize="large">
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
        <FormGroup as={Row} controlId="phoneNumber" bsSize="large">
          <FormLabel>Phone Number</FormLabel>
          <FormControl
            value={this.state.phone}
            onChange={this.handleChange}
            type="text"
          />
        </FormGroup>
        <FormGroup as={Row} controlId="email" bsSize="large">
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
