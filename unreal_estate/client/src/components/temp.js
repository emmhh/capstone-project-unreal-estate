import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'


class MyReservationsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookings: null,
            property: null,
            isLoading: true
        };
        this.init = this.init.bind(this);
        this.init();
    }

    async init() {
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
                    isLoading: false
                });
            });
        });
    }

    showBookings =  () => {
            return (
                <div>
                {this.state.isLoading ?
                <h4>Loading...</h4> :
                this.state.bookings.length === 0 ?
                <h2>No Upcoming Reservations</h2> :
                <ul style={{listStyleType: 'none', padding: "0px"}}>
                    {this.state.bookings.map(booking => (
                        <li key={booking['property_id']}>
                            {console.log(booking)}
                            <div style={{width:'90%', margin: '50px'}}>
                                <div className="mini-desc">
                                    <div style={{textAlign: 'center', display: 'block', border: '1.5px solid grey', borderRadius: '5px', width: "50%"}}>
                                        <div style={{width: "35%"}}>
                                            {this.state.property ?
                                                <img src={this.state.property.images[0]} alt="image of property" style={{width:'300px', height:'200px', float: 'left', display: 'inline-block', padding: '4px'}}></img>
                                                : null
                                            }
                                        </div>
                                        <div style={{width:'58%', display: 'inline-block', padding: '5px', paddingLeft: '15px'}}>
                                            <div style={{float: 'left', display: 'inline-block'}}>
                                                {this.state.property ?
                                                    <h4 style={{margin: '0px'}}>{this.state.property.name}</h4>
                                                    : null
                                                }
                                            </div>
                                            <div style={{clear:'both', display: 'flex', paddingTop: '5px', paddingBottom: '5px'}}>
                                                {this.state.property ?
                                                    <p style={{margin: '0px'}}>{this.state.property.buildingType}</p>
                                                    : null
                                                } 
                                            </div>
                                            <hr style={{margin: "2px"}}></hr>
                                            <div style={{clear:'both', display: 'flex', paddingTop: '5px', paddingBottom: '5px'}}>
                                                <FontAwesomeIcon icon={faMapMarkerAlt} size="lg"/>
                                                {this.state.property ?
                                                    <p style={{margin: '0px', paddingLeft: "5px"}}>{this.state.property.address}</p>
                                                    : null
                                                }  
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{textAlign: 'center', display: 'block', border: '1.5px solid grey', borderRadius: '5px', width: "50%"}}>
                                        <div style={{width:'30%', display: 'inline-block', padding: '10px'}}>
                                            <p style={{marginTop: '55px'}}>Check In: {booking['startDate']}</p>
                                            <p style={{marginTop: '55px'}}>Check Out: {booking['endDate']}</p>
                                            <p style={{marginTop: '55px'}}>Total Price: ${booking['price']}</p>
                                        </div>
                                        <Button variant="contained" style={{width: "120px"}} onClick={() => this.handleCancellation(booking['booking_id'])}>
                                            Cancel Reservation
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>}
                </div>
            );
        }       
    }

    async handleCancellation(BID) {
        console.log("handleCancellation");
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
                <h1>Your Upcoming Reservations</h1>
                <div>
                    {
                        this.state.isLoading ? 
                        <p>Loading.....</p> :
                        this.showBookings()
                    }
                </div>
            </div>
        );
    }
}

export default MyReservationsPage;