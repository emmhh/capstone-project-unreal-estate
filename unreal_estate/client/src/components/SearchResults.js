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

  const { useState, useEffect } = React;

  function useMergeState(initialState) {
    const [state, setState] = useState(initialState);
    const setMergedState = newState =>
      setState(prevState => Object.assign({}, prevState, newState)
      );
    return [state, setMergedState];
  }


  const [propertyObject, setPropertyObject] = useMergeState({
    searched: false,
    properties: [],
    showMore: false,
    allProperties: [],
    isLoading: true,
  });

  if (propertyObject.searched === false){
    getProperties();
  }


  async function getProperties() {
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
        console.log(data)
        setPropertyObject({isLoading: true});
        if (data['results'] != null) {
          var varShowProperties, varShowMore;
          if (data['results'].length >= 10){
            varShowProperties = data['results'].slice(0, 10);
            varShowMore = true;
          } else {
            varShowProperties = data['results'];
            varShowMore = false;
          }
          setPropertyObject({
            searched: true,
            properties: varShowProperties,
            showMore: varShowMore,
            allProperties: data['results'],
            isLoading: false,
          });
        }
      });
    });
  }


  function showMoreProperties() {
    console.log(propertyObject.properties)
    if (propertyObject.properties && propertyObject.allProperties &&
      propertyObject.properties.length < propertyObject.allProperties.length){
      var newLength = propertyObject.properties.length + 10;
      var varShowProperties, varShowMore;
      if (newLength < propertyObject.allProperties.length){
        varShowProperties = propertyObject.allProperties.slice(0, newLength);
        varShowMore = true;
      } else {
        varShowProperties = propertyObject.allProperties;
        varShowMore = false;
      }
      setPropertyObject({
        properties: varShowProperties,
        showMore: varShowMore,
        isLoading: false,
      });
    }
  }

  const { searched, properties, showMore, allProperties, isLoading } = propertyObject;

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
        <ul style={{ listStyleType: 'none', padding: "0px", textAlign: 'center'}}>
          {
            isLoading ?
            <h4>Loading...</h4> :
            properties.length === 0 ?
            <h2>No Results Found</h2> :
            properties.map(prop => (
              <li key={prop['property_id']} style={{ textAlign: '-webkit-center'}}>
              <div style={{ textAlign: 'center', display: 'block', border: '1.5px solid grey', borderRadius: '5px', width: "80%", margin: "20px" }}>
                <div className="row">
                    <div className="col-md-7">
                      <img src={prop['images'][0]} alt="image of property" style={{ width: '100%', height: '450px', padding: '4px' }}></img>
                    </div>
                    <div className="col-md-4" style={{ "margin-top": "20px" }}>
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
                      <div style={{ padding: '10px'}}>
                        <p >Price: ${prop['price']}</p>
                        <Link to={{
                          pathname: '/property/' + prop['property_id'],
                        }}>
                          <Button color="primary" variant="contained" style={{width: "120px"}}>
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {propertyObject.showMore ? <Button onClick={showMoreProperties}>Show More Properties</Button> : null}
      </div>
    </div>
  );
}
