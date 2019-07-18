import React, { Component } from 'react';
// import '../css/BookingComponent.css';
import DateRangePickerWrapper from './DateRangePickerWrapper';
import Button from 'react-bootstrap/Button';
import {
    Row,
    Form,
    FormGroup,
    FormControl,
    FormLabel
} from "react-bootstrap";

class BookingComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            price: null,
            guests: null,
            focusedInput: null,
          };
        this.onDatesChange = this.onDatesChange.bind(this);
    }

    onDatesChange(dateChange) {
        console.log(dateChange)
        if (dateChange.startDate) {
            console.log('change startdate');
            // this.props.DateRangePickerWrapper.startDate = dateChange.startDate;
            this.setState((prevState)=>{
                return {
                    startDate: dateChange.startDate,
                    endDate: prevState.endDate,
                    price: prevState.price,
                    guests: prevState.guests,
                }
            });
            
            if (dateChange.endDate) {
                console.log('change enddate');
                // this.DateRangePickerWrapper.endDate = dateChange.endDate;
                this.setState((prevState)=>{
                    return {
                        startDate: prevState.startDate,
                        endDate: dateChange.endDate,
                        price: prevState.price,
                        guests: prevState.guests,
                    }
                });
            }

        } else if (dateChange.endDate) {
            console.log('change enddate');
            // this.DateRangePickerWrapper.endDate = dateChange.endDate;
            this.setState((prevState)=>{
                return {
                    startDate: prevState.startDate,
                    endDate: dateChange.endDate,
                    price: prevState.price,
                    guests: prevState.guests,
                }
            });
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        console.log(this.state.guests);
    }

    dateChange() {
        this.setState({
            startDate: DateRangePickerWrapper.startDate,
            endDate: DateRangePickerWrapper.endDate
        });
    }

    guestsDropdownMenu() {
        let menuItems = [];
        for (var i = 1; i < 10 + 1; i++) { // TODO: MAX GUESTS FROM PROPERTY
            if (i == 1) {
                menuItems.push(<option> {parseInt(i)} </option>);
            }
            else {
                menuItems.push(<option> {parseInt(i)} </option>);            
            }
        }
        return menuItems;
    }

    async makeBooking() {
        await fetch('http://127.0.0.1:8000/booking',{
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                // property_id: match.params.property_id,
                // startDate: this.state.startDate,
                // endDate: this.state.startDate,
                // bookingTime: 
                // price:
            })
          })
          .then(result => {
              return result.json();
          })
          .then( (result) => {
            console.log(result);
           // 
          })
          this.setState({ isLoading: true });
    }
    render() {
      return (
        <div className="BookingingComponent-div">
            <h1>Price:</h1>
            
            <h1>Dates:</h1>
            <DateRangePickerWrapper
                function={this.onDatesChange}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
            />
            <FormGroup as={Row} controlId="guests" bsSize="large">
            <FormLabel>Guests</FormLabel>
                <FormControl 
                    value={this.state.guests}
                    onChange={this.handleChange}
                    as="select">
                    {this.guestsDropdownMenu()}
                </FormControl>
            </FormGroup>
            <Button onClick={this.makeBooking}>Book</Button>
        </div>
      );
    }
}

export default BookingComponent;
