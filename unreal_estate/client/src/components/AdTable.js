import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faUser, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import AdModule from './AdModule';
import { toast } from 'react-toastify';
var ConfigFile = require('../config');

// const TableHeader = () => {
//     return (
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>BuildingType</th>
//           <th>Location</th>
//           <th>AvgRating</th>
//         </tr>
//       </thead>
//     )
// }
// const TableBody = props => {
//   const rows = props.propertyData.map((row, index) => {
//     return (
//         <tr key={index}>
//         <td>{row.name}</td>
//         <td>{row.buildingType}</td>
//         <td>{row.location}</td>
//         <td>{row.avgRating}</td>
//         <td>
//           <button onClick={() => props.removeProperty(index)}>Delete</button>
//         </td>
//       </tr>
//     )
//   })

//   return <tbody>{rows}</tbody>
// }
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
    console.log(result);
  }).then((result)=>{
    // toast.success(result.msg);
    window.location.href = ConfigFile.Config.server;
  })
  .catch((error)=>{
    console.log(error);
  });
  // .then(() => {
  //   console.log("reload function called");
  //   this.reload();
  // });
}
const Entries = props => {
  // const {propertyData, removeProperty, addProperty} = props;
  const Entries = props.propertyData.map((prop) => {
    return (
      // <li key={index}>
      //   <div>
      //     <img src={prop['images'][0]} alt="image of property" style={{width:'300px', height:'200px', float: 'left', display: 'inline-block', padding: '4px'}}></img>
      //   </div>
      //   <div>
      //     <button onClick={() => props.removeProperty(index)}>Delete</button>
      //   </div>
      // </li>
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
            <Link to={'/AdForm/'+ prop['prop_id']}>
              <Button variant="contained" style={{width: "110px"}}>
                Edit
              </Button>
            </Link>
            {/* <Link to={'/AdModule'}> */}
              <Button variant="contained" style={{width: "110px"}} onClick={() => {removeProperty(prop['prop_id'])}}>
                Delete
              </Button>
            {/* </Link> */}
          </div>
        </div>
      </li>
    )
  })
  return <li>{Entries}</li>
}

class AdTable extends Component {
  render() {
    const { propertyData} = this.props
    return (
      <ul style={{listStyleType: 'none', padding: "0px"}}>
        <Entries propertyData={propertyData}/>
      </ul>
    )
  }
}

export default AdTable