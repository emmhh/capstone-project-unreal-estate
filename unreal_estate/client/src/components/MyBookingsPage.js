import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'


class MyBookingsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookings: null,
            properties: [],
            isLoading: true
        };
        this.init = this.init.bind(this);
        this.init();
    }

    async init() {
        var req = 'http://127.0.0.1:8000/booking/UID';
        await fetch(req, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((response) => {
            response.json().then( async (data) => { 
                if (data['bookings'] != null) {
                    var propertiesList = {};
                    for (var i = 0; i < data['bookings'].length; i++) {
                        var propUrl = 'http://127.0.0.1:8000/advertising/' + data['bookings'][i].property_id;
                        await fetch(propUrl, {
                            method: "GET",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                        }).then(async (response) => {
                            await response.json().then((propertyData) => {
                                if (propertyData && propertyData.property_id){
                                    propertiesList[propertyData.property_id] = propertyData;
                                }
                            })
                        });
                    }
                    this.setState({
                        bookings: data['bookings'],
                        properties: propertiesList,
                        isLoading : false
                    });
                    console.log('MyBookingsPage.js/componentDidMount/fetch/this.state.properties: ');                    
                    console.log(this.state.properties);
                }
            });
        });
    }

    propertyDetailsFunc = async (PID) => {
        var propUrl = 'http://127.0.0.1:8000/advertising/' + PID;
        // console.log("propertyDetailsFunc: ");
        await fetch(propUrl, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((response) => {
            response.json().then((data) => {
                // console.log(data.images[0], data.name, data.address, data.buildingType);
                return (
                    <div>
                        <div style={{width: "35%"}}>
                            <img src={data.images[0]} alt="image of property" style={{width:'300px', height:'200px', float: 'left', display: 'inline-block', padding: '4px'}}></img>
                        </div>
                        <div style={{width:'58%', display: 'inline-block', padding: '5px', paddingLeft: '15px'}}>
                            <div style={{float: 'left', display: 'inline-block'}}>
                                <h4 style={{margin: '0px'}}>{data.name}</h4>
                            </div>
                            <div style={{clear:'both', display: 'flex', paddingTop: '5px', paddingBottom: '5px'}}>
                                <p style={{margin: '0px'}}>{data.buildingType}</p>
                            </div>
                            <hr style={{margin: "2px"}}></hr>
                            <div style={{clear:'both', display: 'flex', paddingTop: '5px', paddingBottom: '5px'}}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} size="lg"/>
                                <p style={{margin: '0px', paddingLeft: "5px"}}>{data.address}</p>
                            </div>
                        </div>
                    </div>
                );
            });
        });
    }

    showBookings =  () => {
        if (this.state.properties.length === 0) {
            return <h2> No Upcoming Bookings </h2>
        }
        else {
            return (
                <ul style={{listStyleType: 'none', padding: "0px"}}>
                    { this.state.bookings.map(booking => (
                        <li key={booking['property_id']}>
                            {console.log(booking)}
                            <div style={{width:'90%', margin: '50px'}}>
                                <div className="mini-desc">
                                    <div style={{textAlign: 'center', display: 'block', border: '1.5px solid grey', borderRadius: '5px', width: "50%"}}>
                                        <div style={{width: "35%"}}>
                                            {console.log(this.state.properties[booking['property_id']])}
                                            {console.log(booking['property_id'])}
                                            {this.state.properties[booking['property_id']] ?
                                                <img src={this.state.properties[booking['property_id']].images[0]} alt="image of property" style={{width:'300px', height:'200px', float: 'left', display: 'inline-block', padding: '4px'}}></img>
                                                : null
                                            }
                                        </div>
                                        <div style={{width:'58%', display: 'inline-block', padding: '5px', paddingLeft: '15px'}}>
                                            <div style={{float: 'left', display: 'inline-block'}}>
                                                {this.state.properties[booking['property_id']] ?
                                                    <h4 style={{margin: '0px'}}>{this.state.properties[booking['property_id']].name}</h4>
                                                    : null
                                                }
                                            </div>
                                            <div style={{clear:'both', display: 'flex', paddingTop: '5px', paddingBottom: '5px'}}>
                                                {this.state.properties[booking['property_id']] ?
                                                    <p style={{margin: '0px'}}>{this.state.properties[booking['property_id']].buildingType}</p>
                                                    : null
                                                } 
                                            </div>
                                            <hr style={{margin: "2px"}}></hr>
                                            <div style={{clear:'both', display: 'flex', paddingTop: '5px', paddingBottom: '5px'}}>
                                                <FontAwesomeIcon icon={faMapMarkerAlt} size="lg"/>
                                                {this.state.properties[booking['property_id']] ?
                                                    <p style={{margin: '0px', paddingLeft: "5px"}}>{this.state.properties[booking['property_id']].address}</p>
                                                    : null
                                                }  
                                            </div>
                                        </div>
                                        <div style={{width:'30%', display: 'inline-block', padding: '10px'}}>
                                            <p style={{marginTop: '55px'}}>Check In: {booking['startDate']}</p>
                                            <p style={{marginTop: '55px'}}>Check Out: {booking['endDate']}</p>
                                            <p style={{marginTop: '55px'}}>Total Price: ${booking['price']}</p>
                                        </div>
                                        <Link to={''}>
                                            <Button variant="contained" style={{width: "120px"}}>
                                                Cancel
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

            );
        }       
    }

    render() {
        return (
            <div className="homepage-div">
                <h1>Your Upcoming Trips</h1>
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

export default MyBookingsPage;