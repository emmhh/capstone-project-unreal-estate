import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

class BookingConfirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booking_id : null,
            property_id : null,
            address : null,
            city : null,
            num_guests : null,
            description : null,
            space : null,
            name : null,
            building_type : null,
            images : null,
            total_price : null,
            startDate : null,
            endDate : null,
            price : null,
            total_price : null,
        };
    }
    componentDidMount() {
        if (this.props && this.props.match && this.props.match.params) {
            const {booking_id} =  this.props.match.params;
            this.setState({ booking_id: booking_id });
            var req = 'http://127.0.0.1:8000/booking/BID' + booking_id;
            fetch(req, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then((res) => {
                res.json().then(data => {
                    console.log(data);
                    this.setState({ is_loading: false });
                    this.setState(data);
                    this.setState({ total_price: data.price })

                    var req = 'http://127.0.0.1:8000/advertising/' + data.property_id;
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
                                this.setState({ images: data.images[0] });
                            });
                        });

                });
            });
        }
    }

    showTotal = () => {
        return 
    }

    render() {
        return (
            <div style={{width:'90%', margin: '50px'}}>
                <div className="mini-desc">
                    <h1> Booking Confirmation: {this.state.booking_id} </h1>
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
                        <hr style={{margin: "2px"}}></hr>
                        <div style={{clear:'both', display: 'flex', paddingTop: '5px', paddingBottom: '5px'}}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} size="lg"/>
                            <p style={{margin: '0px', paddingLeft: "5px"}}>{this.state.address}</p>
                        </div>
                        </div>
                        <div style={{width:'17%', display: 'inline-block', padding: '10px'}}>
                            <p style={{marginTop: '55px'}}>Check In: {this.state.startDate}</p>
                            <p style={{marginTop: '55px'}}>Check Out: {this.state.endDate}</p>
                            <p style={{marginTop: '55px'}}>Total Price: ${this.state.total_price}</p>
                        </div>
                        <Link to={''}>
                            <Button  variant="contained" style={{margin: "1%", verticalAlign: 'top'}}>
                                Change
                            </Button>
                        </Link>
                        <Link to={''}>
                            <Button  variant="contained" style={{margin: "1%", verticalAlign: 'top'}}>
                                Cancel
                            </Button>
                        </Link>
                    </div>
                    <Link to={''}>
                        <Button  variant="contained" style={{margin: "1%", verticalAlign: 'top'}}>
                            Return to Homepage
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default BookingConfirmation;