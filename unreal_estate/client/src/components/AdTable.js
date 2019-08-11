import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faUser, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import AdModule from './AdModule';
import { toast } from 'react-toastify';
var ConfigFile = require('../config');

const removeProperty = (property_id)=>{
  var req = ConfigFile.Config.server + 'advertising/' + property_id;
  console.log("prop_id in delete request: " + property_id)
  fetch(req, {
    method: "DELETE",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  .then((result)=>{
    return result.json();
  })
  .then((result)=>{
    // window.location.reload();
    console.log(result);
  }).then((result)=>{
    // toast.success(result.msg);
    window.location.href = ConfigFile.Config.server;
  })
  .catch((error)=>{
    console.log(error);
  });

}
const Entries = props => {
  const Entries = props.propertyData.map((prop) => {
    return (
      <li key={prop.prop_id} style={{margin: '10px'}}>
        <div style={{ textAlign: '-webkit-center', display: 'block', border: '1.5px solid grey', borderRadius: '5px', width: "100%" , margin: '10px'}}>
          <div className="row">
            <div className="col-md-7">
              <img src={prop.images} alt="image of property" style={{ width: '100%', height: '450px', padding: '4px' }}></img>
            </div>
            <div className="col-md-4" style={{ "margin-top": "20px" }}>
              <div style={{float: 'left', display: 'inline-block'}}>
                <h4 style={{margin: '0px'}}>{prop['name']}</h4>
              </div>
              <div style={{clear:'both', display: 'flex', paddingTop: '5px', paddingBottom: '5px'}}>
                <p style={{margin: '0px'}}>{prop['building_type']}</p>
              </div>
              <div style={{clear:'both', display: 'flex', margin: "2px"}}>
                <FontAwesomeIcon icon={faBed} size="lg"/>
                <p style={{paddingRight: '5px'}}>{prop['num_beds']}</p>
                <FontAwesomeIcon icon={faBath} size="lg"/>
                <p style={{paddingRight: '5px'}}>{prop['num_bathrooms']}</p>
                <FontAwesomeIcon icon={faUser} size="lg"/>
                <p style={{paddingRight: '5px'}}>{prop['num_guests']}</p>
              </div>
              <hr style={{margin: "2px"}}></hr>
              <div style={{ clear: 'both', display: 'flex', paddingTop: '5px', paddingBottom: '5px', margin: "2px" }}>
                <FontAwesomeIcon icon={faMapMarkerAlt} size="lg"/>
                <p style={{margin: '0px', paddingLeft: "5px"}}>{prop['address']}</p>
              </div>
              <hr style={{margin: "2px"}}></hr>
              <div style={{clear:'both', display: 'flex', margin: "2px"}}>
                <FontAwesomeIcon icon={faStar} size="lg"/>
                <p style={{margin: '0px', paddingLeft: "5px"}}>{prop['avg_rating']}</p>
              </div>

              <div style={{padding: '10px'}}>
                <p>Price: ${prop.price}</p>
                {props.hideButtons ?
                  <Link to={'/property/' + prop.property_id}>
                    <Button variant="contained" color="primary" style={{ width: "110px", margin: "10px" }}>
                      View
                    </Button>
                  </Link> :
                  <div>
                    <Link to={'/AdReservations/'+ prop['prop_id']}>
                      <Button variant="contained" style={{width: "110px", margin: "10px"}}>
                        Reservations
                      </Button>
                    </Link>
                    <Link to={'/propertyReviews/'+ prop['prop_id']}>
                      <Button variant="contained" style={{ width: "110px", margin: "10px"}}>
                        Reviews
                      </Button>
                    </Link>
                    {/* <Link to={'/property/' + 11156}> */}
                    <Link to={'/AdForm/'+ prop['prop_id']}>
                      <Button variant="contained" style={{ width: "110px", margin: "10px"}}>
                        Edit
                      </Button>
                    </Link>
                    {/* <Link to={'/AdModule'}> */}
                    <Button variant="contained" style={{ width: "110px", margin: "10px"}} onClick={() => {removeProperty(prop['prop_id'])}}>
                        Delete
                      </Button>
                  </div>
                }
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  })
  return <li>{Entries}</li>
}

class AdTable extends Component {
  render() {
    const { propertyData, hideButtons} = this.props
    return (
      <ul style={{listStyleType: 'none', padding: "0px"}}>
        <Entries propertyData={propertyData} hideButtons={hideButtons}/>
      </ul>
    )
  }
}

export default AdTable