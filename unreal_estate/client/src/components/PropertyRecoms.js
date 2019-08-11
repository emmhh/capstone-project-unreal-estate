import Geocode from "react-geocode";
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faUser, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import AdModule from './AdModule';
import { toast } from 'react-toastify';
import AdTable from './AdTable';
var ConfigFile = require('../config');

const Entries = props => {
  // const {propertyData, removeProperty, addProperty} = props;
  const Entries = props.propertyData.map((prop) => {
    return (
    <li key={prop.prop_id}>
        <div style={{textAlign: 'center', display: 'inline-flex', border: '1.5px solid grey', borderRadius: '5px', width: "80%"}}>
          <div style={{width: "35%"}}>
            <img src={prop.images} alt="image of property" style={{width:'300px', height:'200px', float: 'left', display: 'inline-block', padding: '4px'}}></img>
          </div>
          <div style={{width:'58%', display: 'inline-block', padding: '5px', paddingLeft: '15px'}}>
            <div style={{float: 'left', display: 'inline-block'}}>
              <h4 style={{margin: '0px'}}>{prop['name']}</h4>
            </div>
            <div style={{clear:'both', display: 'flex', paddingTop: '5px', paddingBottom: '5px'}}>
              <p style={{margin: '0px'}}>{prop['building_type']}</p>
            </div>
            <div style={{clear:'both', display: 'flex'}}>
              <FontAwesomeIcon icon={faBed} size="lg"/>
              <p style={{paddingLeft: "5px", paddingRight: "20px", margin: "0px"}}>{prop['num_rooms']}</p>
              <FontAwesomeIcon icon={faBath} size="lg"/>
              <p style={{paddingLeft: "5px", paddingRight: "20px", margin: "0px"}}>{prop['num_bathrooms']}</p>
              <FontAwesomeIcon icon={faUser} size="lg"/>
              <p style={{paddingLeft: "5px", paddingRight: "20px", margin: "0px"}}>{prop['num_guests']}</p>
            </div>
            <hr style={{margin: "2px"}}></hr>
            <div style={{clear:'both', display: 'flex', paddingTop: '5px', paddingBottom: '5px'}}>
              <FontAwesomeIcon icon={faMapMarkerAlt} size="lg"/>
              <p style={{margin: '0px', paddingLeft: "5px"}}>{prop['address']}</p>
            </div>
            <hr style={{margin: "2px"}}></hr>
            <div style={{clear:'both', display: 'flex'}}>
              <FontAwesomeIcon icon={faStar} size="lg"/>
              <p style={{margin: '0px', paddingLeft: "5px"}}>{prop['avg_rating']}</p>
            </div>
          </div>
          <div style={{width:'17%', display: 'inline-block', padding: '10px'}}>
            <p style={{marginTop: '60px'}}>Price: ${prop.price}</p>
            <Link to={'/AdReservations/'+ prop['prop_id']}>
              <Button variant="contained" style={{width: "110px"}}>
                Show Reservations
              </Button>
            </Link>
            {/* <Link to={'/property/' + 11156}> */}
            {/* <Link to={'/AdForm/'+ prop['prop_id']}>
              <Button variant="contained" style={{width: "110px"}}>
                Edit
              </Button>
            </Link> */}
            {/* <Link to={'/AdModule'}> */}
              {/* <Button variant="contained" style={{width: "110px"}} onClick={() => {removeProperty(prop['prop_id'])}}>
                Delete
              </Button> */}
            {/* </Link> */}
          </div>
        </div>
    </li>
    )
  });
  return <li>{Entries}</li>
}

const getFirstTen = (data) => {
  return data.slice(0, 9);
}

class PropertyRecoms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendations:[],
            address: "",
        }
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    //load the recommendation property
    componentWillMount(){
        let currentComponent = this;
        // Check if the browser has support for the Geolocation API
        if (!navigator.geolocation) {
            window.confirm("Sorry, the Geolocation API isn't supported in Your browser.");//FIXME:
            return null;
        } else {
            navigator.geolocation.getCurrentPosition(function(position) {
                // Get the coordinates of the current possition.
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                console.log("current lat: " + lat + " current lng :" + lng);
                Geocode.setApiKey("AIzaSyC23bKL0NuMcy492R2awciNWqwh_lSgr-w");
                Geocode.enableDebug();
                Geocode.fromLatLng(lat, lng).then(
                    response => {
                        const address = response.results[0].formatted_address;
                        currentComponent.setState({address: address});
                        console.log("current address: " + address);
                        console.log("state.address: " + currentComponent.state.address);
                        fetch(ConfigFile.Config.server + 'search/recom', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('Token'),
                            },
                            body: JSON.stringify({
                                address: currentComponent.state.address,
                            })
                        }).then((response) => {
                            response.json().then((data) => {
                                if (data['results'] != null) {
                                    console.log(data['results']);
                                    const firstTen = getFirstTen(data['results']);
                                    console.log(firstTen);
                                    currentComponent.setState({recommendations: firstTen});
                                } else {
                                    console.log("failed to find property recommendations")
                                }
                            });
                        });
                    },
                    error => {
                        window.confirm("Error occurred on Geocode in PropertyRecoms.js!");//FIXME:
                        console.error(error);
                    }
                );
            });
        }
    }
    // fetchCurrentAddress = () => {
    //     // Check if the browser has support for the Geolocation API
    //     if (!navigator.geolocation) {
    //         window.confirm("Sorry, the Geolocation API isn't supported in Your browser.");//FIXME:
    //         return null;
    //     } else {
    //         navigator.geolocation.getCurrentPosition(function(position) {
    //             // Get the coordinates of the current possition.
    //             var lat = position.coords.latitude;
    //             var lng = position.coords.longitude;
    //             console.log("current lat: " + lat + " current lng :" + lng);
    //             Geocode.setApiKey("AIzaSyC23bKL0NuMcy492R2awciNWqwh_lSgr-w");
    //             Geocode.enableDebug();
    //             Geocode.fromLatLng(lat, lng).then(
    //                 response => {
    //                     const add = response.results[0].formatted_address;
    //                     // console.log("current address: " + address);
    //                     window.confirm("check the current address in console!"); //FIXME:
    //                     this.setState({address: add});
    //                     return add;
    //                 },
    //                 error => {
    //                     window.confirm("Error occurred on Geocode in PropertyRecoms.js!");//FIXME:
    //                     console.error(error);
    //                     return null;
    //                 }
    //             );
    //         });
    //     }
    // }

    // //load the recommendation property
    // componentWillMount(){
    //     this.fetchCurrentAddress().then(()=>{
    //         console.log("current address in component will mount: " + this.state.address);
    //         window.confirm("ComponentWillMount: check the current address in console!"); //FIXME:
    //         fetch(ConfigFile.Config.server + 'search/recom', {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 address: "Kensington, New South Wales, Australia, 2033",
    //             })
    //         }).then((response) => {
    //             response.json().then((data) => {
    //                 if (data['results'] != null) {
    //                     console.log(data['results']);
    //                     this.setState({recommendations: data['results']});
    //                 } else {
    //                     console.log("failed to find property recommendations")
    //                 }
    //             });
    //         });
    //     });
    // }
    render() {
        return (
            <div>
                <hr
                    style={{
                        color: "#333333",
                        backgroundColor: "#333333",
                        height: 5
                    }}
                />
            <ul style={{listStyleType: 'none', padding: "0px"}}>
            <h5>Here are some properties around you</h5>
            {/* <Entries propertyData={this.state.recommendations}/> */}
            <AdTable propertyData={this.state.recommendations} hideButtons={true}/>
            </ul>
            </div>
        )
    }
}

export default PropertyRecoms