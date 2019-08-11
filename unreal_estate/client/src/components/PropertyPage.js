import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faUser, faMapMarkerAlt, faStar} from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
var ConfigFile = require('../config');


class PropertyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logged_in: null,
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
            prices : null,
            avg_rating : null,
            images : null,
            reviews : null,
          };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidMount();
    }

    componentDidMount() {
        var login = localStorage.getItem('is_user_logged_in');
        this.setState({logged_in: login});
        if (this.props && this.props.match && this.props.match.params){
            const {property_id} =  this.props.match.params;
            var req = ConfigFile.Config.server + 'advertising/' + property_id;
            var req2 = ConfigFile.Config.server + 'review/' + property_id;
            var loading1 = true
            var loading2 = true
            fetch(req, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': localStorage.getItem('Token'),
                },
                })
                .then((res) => {
                    res.json().then(data => {
                        this.setState(data);
                        this.setState({prop_id: property_id});
                        loading1 = false
                        if(loading2 === false){
                           this.setState({ is_loading: false });
                        }
                    });
                });

                fetch(req2, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': localStorage.getItem('Token'),
                },
                })
                .then((res) => {
                    res.json().then(data => {
                        if (data['results'] != null) {
                          this.state.reviews = data['results'];
                        }
                        console.log(this.state.reviews);
                        loading2 = false
                        if(loading1 === false){
                           this.setState({ is_loading: false });
                        }
                    });
                });
        }
    }

    render() {
        const { is_loading } = this.state
        if (is_loading === false) {
            return (
                <div className="container" style={{textAlign: "centre", "margin-top": "20px", border: "solid"}}>
                    <h1>{this.state.name}</h1>
                <img src={this.state.images[0]} style={{margin: "10px"}}/>
                    <div style={{clear:'both', display: 'inline-flex', paddingTop: '5px', paddingBottom: '5px'}}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} size="2x"/>
                        <h3 style={{margin: '0px', paddingLeft: "5px"}}>{this.state.address}</h3>
                    </div>
                    <div>
                      <div style={{clear:'both', display: 'inline-flex'}}>
                        <FontAwesomeIcon icon={faStar} size="lg"/>
                        <h4 style={{paddingLeft: "5px", paddingRight: "20px", margin: "0px"}}>{this.state.avg_rating}</h4>
                      </div>
                    </div>
                    <div>
                      <div style={{clear:'both', display: 'inline-flex'}}>
                        <FontAwesomeIcon icon={faBed} size="lg"/>
                        <p style={{paddingLeft: "5px", paddingRight: "20px", margin: "0px"}}>{this.state.num_beds}</p>
                        <FontAwesomeIcon icon={faBath} size="lg"/>
                        <p style={{paddingLeft: "5px", paddingRight: "20px", margin: "0px"}}>{this.state.num_bathrooms}</p>
                        <FontAwesomeIcon icon={faUser} size="lg"/>
                        <p style={{paddingLeft: "5px", paddingRight: "20px", margin: "0px"}}>{this.state.num_guests}</p>
                      </div>
                    </div>
                    <br></br>
                    <hr></hr>
                    <div>
                        <h4>Summary</h4>
                        <p>{this.state.description}</p>
                    </div>
                    {this.state.space === '' ? null: <div> <h4>Space</h4> <p>{this.state.space}</p> </div>}
                    <br></br>
                    <hr></hr>
                    <div style={{display: 'inline-block', padding: '10px'}}>
                      <h5>Price per night: ${this.state.price}</h5>
                        {this.state.logged_in ?
                        <Link to={'/property_booking/' + this.state.prop_id}>
                            <Button variant="contained" style={{width: "120px"}}>
                                Book
                            </Button>
                        </Link> :
                        <Link to={'/login'}>
                            <Button variant="contained" style={{width: "240px"}}>
                                Login to Book
                            </Button>
                        </Link>}
                    </div>
                    <br></br>
                    <hr></hr>
                    <div>
                        <h4>Reviews</h4>
                    </div>
                    <div>
                      <ul style={{listStyleType: 'none', padding: "0px"}}>
                        {this.state.reviews.map(r => (
                          <li key={r['rating_id']}>
                              <div style={{textAlign: 'left', display: 'flex', border: '1.5px solid grey', borderRadius: '5px', margin: '10px'}}>
                                <div style={{width:'100%', display: 'inline-block', padding: '5px', paddingLeft: '15px'}}>
                                  <div style={{clear:'both', display: 'inline-flex'}}>
                                    <FontAwesomeIcon icon={faStar} size="lg"/>
                                    <h4 style={{paddingLeft: "5px", paddingRight: "20px", margin: "0px"}}>{r['value']}</h4>
                                    <p>published on {r['date'].slice(8,10)}/{r['date'].slice(5,7)}/{r['date'].slice(0,4)}</p>
                                  </div>
                                  <div style={{clear:'both', display: 'block'}}>
                                    <p>{r['notes']}</p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                </div>
            );
        }
        else {
            return null;
        }
    }
}

export default PropertyPage;

