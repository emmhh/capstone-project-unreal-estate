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
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null,
      birthdate: new Date()
    };
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

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    this.setState({ newUser: "test" });

    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup as={Row} controlId="confirmationCode" bsSize="large">
          <FormLabel>Confirmation Code</FormLabel>
          <FormControl 
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
        </FormGroup>
        {/* <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        /> */}
      </form>
    );
  }

  renderForm() {
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
        <FormGroup as={Row} controlId="birthdate" bsSize="large">
          <FormLabel>Birthdate</FormLabel>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="checkin-date"
                label="Check In"
                value={this.state.birthdate}
                onChange={this.handleChange}
                minDate={this.state.birthdate}
                // className={classes.field}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
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
        </FormGroup>
        <Button className="Submit" variant="contained" color="primary" >Continue</Button>
      </Form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}
