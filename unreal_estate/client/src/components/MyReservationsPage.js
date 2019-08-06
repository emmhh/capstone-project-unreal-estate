import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import '../css/MyReservationsPage.css';
var ConfigFile = require('../config');

class MyReservationsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: null,
            bookings: null,
            isLoading: true,
            property_id: null,
            address: null,
            latitude: null,
            longitude: null,
            num_rooms: null,
            num_bathrooms: null,
            num_guests: null,
            num_beds: null,
            description: null,
            space: null,
            name: null,
            features: null,
            building_type: null,
            price: null,
            avg_rating: null,
            images: null,
            owner_id: null,
        };
        this.init = this.init.bind(this);
        this.init();
    }

    async init() {
        this.setState({date:new Date()})
        const {property_id} =  this.props.match.params;
        var req = ConfigFile.Config.server + 'booking/PID/' + property_id;
        var propUrl = ConfigFile.Config.server + 'advertising/' + property_id;
        await fetch(req, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((response) => {
            response.json().then( async (data) => {
                this.setState({
                    bookings: data['bookings'],
                });
            });
        });
        await fetch(propUrl, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((response) => {
            response.json().then(async (data) => {
                this.setState(data);
                this.setState({
                    isLoading: false
                });
            });
        });
    }

    async handleCancellation(BID) {
        console.log("handleCancellation");
        // this.setState({isLoading:false});
        const {property_id} =  this.props.match.params;
        var propertyUrl = ConfigFile.Config.server + 'booking/PID/' + property_id;
        var cancelUrl = ConfigFile.Config.server + 'booking/delete/' + BID;
        await fetch(cancelUrl ,{
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then(result => {
            console.log(result.json());
        }).then(() => fetch(propertyUrl, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((response) => {
            response.json().then(async (data) => {
                this.setState({
                    bookings: data['bookings'],
                });
            });
        })
        );
    }

    render() {
        return (
            <div className="homepage-div">
                <h1>Your Reservations</h1>
                <div>
                {this.state.isLoading ?
                <h4>Loading...</h4> :
                this.state.bookings.length === 0 ?
                <h2>No Reservations</h2> :
                <ul style={{listStyleType: 'none', padding: "0px"}}>
                    <div style={{textAlign: 'center', display: 'block', border: '1.5px solid grey', borderRadius: '5px', width: "50%"}}>
                        <div style={{width: "35%"}}>
                            <img src={this.state.images[0]} alt="image of property" style={{width:'300px', height:'200px', float: 'left', display: 'inline-block', padding: '4px'}}></img>
                        </div>
                        <div style={{width:'58%', display: 'inline-block', padding: '5px', paddingLeft: '15px'}}>
                            <div style={{float: 'left', display: 'inline-block'}}>
                                <h4 style={{margin: '0px'}}>{this.state.name}</h4>
                            </div>
                            <div style={{clear:'both', display: 'flex', paddingTop: '5px', paddingBottom: '5px'}}>
                                <p style={{margin: '0px'}}>{this.state.buildingType}</p> 
                            </div>
                            <hr style={{margin: "2px"}}></hr>
                            <div style={{clear:'both', display: 'flex', paddingTop: '5px', paddingBottom: '5px'}}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} size="lg"/>
                                <p style={{margin: '0px', paddingLeft: "5px"}}>{this.state.address}</p>
                            </div>
                        </div>
                    </div>
                    {this.state.bookings.map(booking => (
                        <li key={booking['property_id']}>
                            {/* {console.log(booking)} */}
                            {console.log("now " + Math.round(new Date()))}
                            {/* {console.log("3 " + booking['endDate'])} */}
                            {console.log("endDate " + Date.parse(booking['endDate']))}
                            {console.log(Date.parse(booking['endDate']) < Math.round(new Date()))}
                            <div style={{width:'90%', margin: '50px'}}>
                                <div className="mini-desc">
                                    <div style={{textAlign: 'center', display: 'block', border: '1.5px solid grey', borderRadius: '5px', width: "50%"}}>
                                        <div style={{width:'30%', display: 'inline-block', padding: '10px'}}>
                                            <p style={{marginTop: '55px'}}>Check In: {booking['startDate']}</p>
                                            <p style={{marginTop: '55px'}}>Check Out: {booking['endDate']}</p>
                                            <p style={{marginTop: '55px'}}>Total Price: ${booking['price']}</p>
                                        </div>
                                        {/* {Date.parse(booking['endDate']) < Math.round(new Date()) ?
                                        <Link to={'/review/' + booking['booking_id']}>
                                            <Button variant="contained" style={{width: "120px"}}>
                                                View Review
                                            </Button>
                                        </Link>: */}
                                        <Button variant="contained" style={{width: "120px"}} onClick={() => this.handleCancellation(booking['booking_id'])}>
                                            Cancel Reservation
                                        </Button>
                                        {/* } */}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>}
                </div>
            </div>
        );
    }
}

export default MyReservationsPage;