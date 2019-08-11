import React  from 'react';
import DatePickers from './DatePickers';
import SearchTextBox from './SearchTextBox';
import NumGuests from './NumGuests';
import Button from '@material-ui/core/Button';
import AdTable from './AdTable';
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
            <div>
              <h3> Showing {properties.length} of {allProperties.length} </h3>
              <AdTable propertyData={properties} hideButtons={true} />
            </div>
          }
        </ul>

        {propertyObject.showMore ?
            <div>
              <h3> Showing {properties.length} of {allProperties.length} </h3>
              <Button onClick={showMoreProperties}>Show More Properties</Button>
            </div>
          :
            null
        }
      </div>
    </div>
  );
}
