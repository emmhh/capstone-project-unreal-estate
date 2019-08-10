import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faUser, faMapMarkerAlt, faStar} from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CanvasJSReact from './graph/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var ConfigFile = require('../config');


class PropertyReviewPage extends Component {

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
            starCount: {},
          };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.updateRatings = this.updateRatings.bind(this);
        this.componentDidMount();
    }

    componentDidMount() {
        var login = localStorage.getItem('is_user_logged_in');
        this.setState({logged_in: login});
        if (this.props && this.props.match && this.props.match.params){
            const {property_id} =  this.props.match.params;
            var req = ConfigFile.Config.server + 'advertising/' + property_id;
            var req2 = ConfigFile.Config.server + 'review/classifications/' + property_id;
            var loading1 = true
            var loading2 = true
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
                        loading1 = false;
                        if(loading2 == false){
                           this.setState({ is_loading: false });
                        }
                    });
                });

                fetch(req2, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                })
                .then((res) => {
                    res.json().then(data => {
                        if (data['results'] != null) {
                          this.state.reviews = data['results'];
                          for(var i in this.state.reviews) {
                            var r = this.state.reviews[i]
                            this.state.starCount[r['value']] = (this.state.starCount[r['value']] || 0) + 1;
                          }
                        }
                        loading2 = false;
                        if(loading1 == false){
                           this.setState({ is_loading: false });
                        }
                    });
                });
        }
    }

    updateRatings() {
        var login = localStorage.getItem('is_user_logged_in');
        this.setState({logged_in: login});
        this.setState({is_loading: true });
        if (this.props && this.props.match && this.props.match.params){
            const {property_id} =  this.props.match.params;
            var req = ConfigFile.Config.server + 'review/update/' + property_id;
            fetch(req, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                })
                .then((res) => {
                    res.json().then(data => {
                        this.state.reviews = data['results'];
                        this.setState({is_loading: false});
                    });
                });
        }
    }



    render() {
        const { is_loading } = this.state;
        const options = {
          title: {
            text: "Reviews on your property"
          },
          data: [{
                    type: "column",
                    dataPoints: [
                        { label: "1",  y: this.state.starCount[1]  },
                        { label: "2", y: this.state.starCount[2]  },
                        { label: "3", y: this.state.starCount[3] },
                        { label: "4",  y: this.state.starCount[4]  },
                        { label: "5",  y: this.state.starCount[5]  }
                    ]
           }]
        }

        if (is_loading === false) {
            return (
                <div style={{textAlign: "centre", display: "block", width: "80%", margin: "0px auto"}}>
                  <div>
                    <h3>Property</h3>
                  </div>
                  <div style={{ textAlign: 'center', display: 'block', border: '1.5px solid grey', borderRadius: '5px', width: "100%" }}>
                    <div className="row">
                      <div className="col-md-7">
                        <img src={this.state.images[0]} alt="image of property" style={{ width: '100%', height: '450px', padding: '4px' }}></img>
                      </div>
                    <div className="col-md-4 card-heading" style={{ "text-align": "left"}}>
                        <div style={{float: 'left', display: 'inline-block'}}>
                          <h4 style={{margin: '0px'}}>{this.state.name}</h4>
                        </div>
                        <div style={{clear:'both', display: 'flex', paddingTop: '5px', paddingBottom: '5px'}}>
                          <p style={{margin: '0px'}}>{this.state.building_type}</p>
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
                          <p style={{margin: '0px', paddingLeft: "5px"}}>{this.state.avg_rating}</p>
                        </div>
                        <div style={{width:'17%', display: 'inline-block', padding: '10px'}}>
                          <p style={{marginTop: '55px'}}>Price: ${this.state.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                    <br></br>
                    <hr></hr>
                    <div>
                        <h3>Reviews</h3>
                    </div>
                    <div>
                        <CanvasJSChart options = {options}/>
                    </div>
                    <div>
                      <ul style={{listStyleType: 'none', padding: "0px"}}>
                        {this.state.reviews.map(r => (
                          <li key={r['rating_id']}>
                              <div style={{textAlign: 'left', display: 'flex', border: '1.5px solid grey', borderRadius: '5px', margin: '10px'}}>
                                <div style={{width:'100%', display: 'inline-block', padding: '5px', paddingLeft: '15px'}}>
                                  <div style={{clear:'both', display: 'inline-flex'}}>
                                    <h4 style={{paddingLeft: "15px", paddingRight: "20px", margin: "0px"}}>User Rating: </h4>
                                    <FontAwesomeIcon icon={faStar} size="lg"/>
                                    <h4 style={{paddingLeft: "5px", paddingRight: "40px", margin: "0px"}}>{r['value']}</h4>
                                    <h4 style={{paddingLeft: "15px", paddingRight: "20px", margin: "0px"}}>AI Rating: </h4>
                                    <FontAwesomeIcon icon={faStar} size="lg"/>
                                    <h4 style={{paddingLeft: "5px", paddingRight: "40px", margin: "0px"}}>{r['ai_rating']}</h4>
                                  </div>
                                  <div style={{clear:'both', display: 'inline-flex'}}>
                                    <p>published on {r['date']}</p>
                                  </div>
                                  <div style={{clear:'both', display: 'block'}}>
                                    <p>{r['notes']}</p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <Button variant="contained" onClick={this.updateRatings} style={{width: "15%", margin: "1%", verticalAlign: 'top'}}>
                            Use AI Ratings
                        </Button>
                      </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <h3>Loading...</h3>
                    <p>This may take a couple of minutes (only the first time) as this page requires downloding a 180MB file for the word2vec embeddings</p>
                </div>
            );
        }
    }
}

export default PropertyReviewPage;

