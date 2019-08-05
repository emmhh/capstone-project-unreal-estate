import React  from 'react';
import DatePickers from './DatePickers';
import SearchTextBox from './SearchTextBox';
import NumGuests from './NumGuests';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faBath, faUser, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons'
var ConfigFile = require('../config');

export default function SearchResults() {

  const [searched, setSearched] = React.useState(false);
  const [properties, setProperties] = React.useState([]);
  const [showMore, setShowMore] = React.useState(false);
  const [allProperties, setAllProperties] = React.useState([]);
  const [showProperties, setShowProperties] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  if(searched === false){
    getProperties();
  }


  async function getProperties() {
    setLoading(true);
    await fetch(ConfigFile.Config.server + 'search/post', {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: localStorage.getItem('address'),
        checkin: localStorage.getItem('checkin'),
        checkout: localStorage.getItem('checkout'),
        numGuests: localStorage.getItem('numGuests'),
      })
    }).then((response) => {
      response.json().then((data) => {
        if (data['results'] != null) {
          setAllProperties(data['results']);
          var varShowProperties;
          if (data['results'].length >= 10){
            varShowProperties = data['results'].slice(0, 10);
            setShowProperties(data['results'].slice(0, 10));
            setShowMore(true);
          } else {
            varShowProperties = data['results'];
            setShowProperties(data['results']);
            setShowMore(false);
          }
          setProperties(varShowProperties);
        }
        setSearched(true);
        setLoading(false);
      });
    });
  }


  function showMoreProperties() {
    console.log(showProperties)
    if (showProperties && allProperties &&
      showProperties.length < allProperties.length){
      var newLength = showProperties.length + 10;
      if (newLength < allProperties.length){
        setShowProperties(allProperties.slice(0, newLength));
        setShowMore(true);
      } else {
        setShowProperties(allProperties);
        setShowMore(false);
      }
      setProperties(showProperties);
    }
  }

  return (
    <div className="homepage-div">
      <h1>Unreal Estate</h1>
      <div style={{textAlign: "centre", display: "inlineBlock", width: "50%", margin: "0px auto"}}>
        <div style={{padding: "20px 0px", display: "inlineBlock"}}>
          <SearchTextBox/>
          <DatePickers/>
          <NumGuests/>
          <Button variant="contained" onClick={getProperties} style={{margin: "1%", verticalAlign: 'top'}}>
            Search
          </Button>
        </div>
      </div>
      <div>
        <ul style={{listStyleType: 'none', padding: "0px"}}>
          {isLoading ?
            <h4>Loading...</h4> :
            properties.length === 0 ? 
            <h2>No Results Found</h2> :
            properties.map(prop => (
            <li key={prop['property_id']}>
              <div style={{textAlign: 'center', display: 'inline-flex', border: '1.5px solid grey', borderRadius: '5px', width: "50%"}}>
                <div style={{width: "35%"}}>
                  <img src={prop['images'][0]} alt="image of property" style={{width:'300px', height:'200px', float: 'left', display: 'inline-block', padding: '4px'}}></img>
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
                    <p style={{paddingLeft: "5px", paddingRight: "20px", margin: "0px"}}>{prop['num_beds']}</p>
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
                  <p style={{marginTop: '55px'}}>Price: ${prop['price']}</p>
                  <Link to={{
                    pathname: '/property/' + prop['property_id'],
                  }}>
                    <Button variant="contained" style={{width: "120px"}}>
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {showMore ? <Button onClick={showMoreProperties}>Show More Properties</Button> : null}
      </div>
    </div>
  );
}
