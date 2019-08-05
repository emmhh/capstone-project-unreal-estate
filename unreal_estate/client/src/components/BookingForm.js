import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import DatePickers from './DatePickers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faUser, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import NumGuests from './NumGuests';
import { Redirect } from 'react-router-dom'
var ConfigFile = require('../config');

class BookingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loading: true,
            prop_id: null,
            address : null,
            city  : null,
            latitude : null,
            longitude : null,
            num_beds: null,
            num_rooms : null,
            num_bathrooms : null,
            num_guests : null,
            description : null,
            space : null,
            name : null,
            building_type : null,
            price : null,
            price : null,
            avg_rating : null,
            images : null,
            focusedInput: null,
            total_price : null,
            redirect : false,
            booking_id : null
        };
        this.makeBooking = this.makeBooking.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (this.props && this.props.match && this.props.match.params) {
            const {property_id} =  this.props.match.params;
            var req = ConfigFile.Config.server + 'advertising/' + property_id;
            fetch(req, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then((res) => {
                res.json().then(data => {
                    this.setState(data);
                    this.setState({prop_id: property_id});
                    this.setState({ is_loading: false });
                    this.setState({images: data.images[0]});
                    var CheckInDate = new Date(localStorage.getItem('checkin'));
                    var CheckOutDate = new Date(localStorage.getItem('checkout'));
                    const diffTime = Math.abs(CheckOutDate.getTime() - CheckInDate.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    localStorage.setItem('days', diffDays);
                    var total = localStorage.getItem('days') * data.price;
                    this.setState({total_price: total});
                });
            });
        }
    }

    setRedirect = (result) => {
        this.setState({
            redirect: true,
            booking_id: result
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            var confirmationUrl = '/confirmation/' + this.state.booking_id;
            return <Redirect to={ confirmationUrl }/>
        }
    }

    showTotal = () => {
        return <p style={{marginTop: '55px'}}>Total Price: ${this.state.total_price}</p>
    }

    async makeBooking() {
        console.log('making booking');
        var total = localStorage.getItem('days')*this.state.price;
        var date = new Date(localStorage.getItem('checkin'));
        console.log(date.getMonth());
        var month = date.getMonth( ) + 1;
        var CheckInDate = date.getFullYear( ) + '-' + month + '-' + date.getDate( );
        date = new Date(localStorage.getItem('checkout'));
        month = date.getMonth( ) + 1;
        var CheckOutDate = date.getFullYear( ) + '-' + month + '-' + date.getDate( );
        var guest_count = localStorage.getItem('numGuests');
        await fetch(ConfigFile.Config.server + 'booking/',{
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                guests: guest_count,
                property_id: this.state.property_id,
                startDate: CheckInDate,
                endDate: CheckOutDate,
                total_price: total,
            })
        })
        .then(result => {
            return result.json();
        })
        .then( (result) => {
            this.setRedirect(result.booking_id);
            console.log(result.booking_id);
            this.renderRedirect();
        })
    }
    onChange = () => {
        return <p style={{marginTop: '55px'}}>Total Price: ${this.state.total_price}</p>
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        var total = localStorage.getItem('days') * this.state.price;
        this.setState({total_price: total});
        console.log(total + "handle change");
    }

    render() {
        return (
            <div style={{width:'80%', margin: '50px'}}>
                {this.renderRedirect()}
                <div className="mini-desc">
                    <div style={{textAlign: 'center', display: 'block', border: '1.5px solid grey', borderRadius: '5px', width: "50%"}}>
                        <div style={{width: "35%"}}>
                            <img src={this.state.images} alt="image of property" style={{width:'300px', height:'200px', float: 'left', display: 'inline-block', padding: '4px'}}></img>
                        </div>
                        <div style={{width:'58%', display: 'inline-block', padding: '5px', paddingLeft: '15px'}}>
                            <div style={{float: 'left', display: 'inline-block'}}>
                                <h4 style={{margin: '0px'}}>{this.state.name}</h4>
                            </div>
                            <div style={{clear:'both', display: 'flex', paddingTop: '5px', paddingBottom: '5px'}}>
                                <p style={{margin: '0px'}}>{this.state.buildingType}</p>
                            </div>
                            <div style={{clear:'both', display: 'flex'}}>
                                <FontAwesomeIcon icon={faBed} size="lg"/>
                                <p style={{paddingLeft: "5px", paddingRight: "20px", margin: "0px"}}>{this.state.num_beds}</p>
                                <FontAwesomeIcon icon={faBath} size="lg"/>
                                <p style={{paddingLeft: "5px", paddingRight: "20px", margin: "0px"}}>{this.state.num_bathrooms}</p>
                                <FontAwesomeIcon icon={faUser} size="lg"/>
                                <p style={{paddingLeft: "5px", paddingRight: "20px", margin: "0px"}}>{this.state.num_guests}</p>
                            </div>
                            <hr style={{margin: "2px"}}></hr>
                            <div style={{clear:'both', display: 'flex', paddingTop: '5px', paddingBottom: '5px'}}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} size="lg"/>
                                <p style={{margin: '0px', paddingLeft: "5px"}}>{this.state.address}</p>
                            </div>
                            <hr style={{margin: "2px"}}></hr>
                            <div style={{clear:'both', display: 'flex'}}>
                                <FontAwesomeIcon icon={faStar} size="lg"/>
                                <p style={{margin: '0px', paddingLeft: "5px"}}>x.x</p>
                            </div>
                        </div>
                        <div style={{width:'17%', display: 'inline-block', padding: '10px'}}>
                            <p style={{marginTop: '55px'}}>Price: ${this.state.price}</p>
                            {this.onChange()}
                        </div>
                    </div>
                    <div className="BookingingComponent-div">
                        <div style={{padding: "20px 0px", display: "inlineBlock"}}>
                            <div onClick={this.handleChange}>
                                <DatePickers/>
                                <NumGuests maxGuests={this.state.num_guests}/>
                                <Button onClick={this.makeBooking}>Confirm</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookingForm;