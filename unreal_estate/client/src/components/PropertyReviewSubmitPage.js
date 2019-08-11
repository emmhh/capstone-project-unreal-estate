import React, { Component } from "react";
import {
  Row,
  Form,
  FormGroup,
  FormControl,
  FormLabel
} from "react-bootstrap";
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import StarRatings from 'react-star-ratings';
import "../css/SignupPage.css"
var ConfigFile = require('../config');

class PropertyReviewSubmitPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        property_id: this.props.match.params.property_id,
        booking_id : this.props.match.params.booking_id,
        rating: 0,
        notes : null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.init = this.init.bind(this);
    this.init();
  }
    async init() {
        const {booking_id} =  this.props.match.params;
        var req = ConfigFile.Config.server + 'booking/BID/' + booking_id;
        await fetch(req, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem('Token'),
            },
        }).then((response) => {
            response.json().then( async (data) => {
                if (data['bookings'] != null) {
                    this.setState({
                        property_id: data['property_id'],
                    });
                    console.log(data['bookings']);
                }
            });
        });
    }
    async handleSubmit(){
        if(this.checkDetails()){
            await fetch(ConfigFile.Config.server + 'review/', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': localStorage.getItem('Token'),
                },
                body: JSON.stringify({
                    property_id : this.state.property_id,
                    booking_id : this.state.booking_id,
                    value : this.state.rating,
                    notes : this.state.notes,
                })
            })
            .then((result)=> {
                if (result.status === 200){
                    window.location.href = ConfigFile.Config.server + '';
                }
                return result.json();
            });
        }
    }
    handleChange = event => {
        event.persist();
        this.setState({
            notes: event.target.value
        });
    }

    checkDetails() {
        if (this.state.rating === 0) {
            toast.error('Please enter an overall rating.')
            return false;
        }
        if (this.state.notes === null) {
            toast.error('Please enter a review.')
            return false;
        }
        return true;
    }

    changeRating( newRating, name ) {
        this.setState({
        rating: newRating
        });
    }
    render() {
        return (
        <div className="Review-div" style={{textAlign: "-webkit-center"}}>
            <h1>Submit A Review</h1>
            <Form container onSubmit={this.handleSubmit}>
            <FormLabel style={{ margin: "10px" }}>Give Overall Rating</FormLabel>
            <StarRatings
                rating={this.state.rating}
                starRatedColor="gold"
                changeRating={this.changeRating.bind(this)}
                numberOfStars={5}
                name='rating'
            />
            <Form.Group controlId="description" bsSize="large" style={{width: "50%"}}>
            {/* <FormLabel>Leave A Review</FormLabel> */}
            <FormControl
                as='textarea'
                autoFocus
                type="description"
                value={this.state.notes}
                onChange={this.handleChange.bind(this)}
            />
            </Form.Group>
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit Review</Button>
        </Form>
        </div>
        );
    }
}

export default PropertyReviewSubmitPage;
