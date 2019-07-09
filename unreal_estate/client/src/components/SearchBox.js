import React from 'react';
import DatePickers from './DatePickers';
import SearchTextBox from './SearchTextBox';
import NumGuests from './NumGuests';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export default function SearchBox() {

  async function getProperties() {
    await fetch('http://127.0.0.1:8000/search/post', {
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
    }).then(function(response) {
      response = response.json();
      setProperties(response);
    });
  }

  const [properties, setProperties] = React.useState([]);

  return (
    <div>
      <div borderRadius={20}>
        <SearchTextBox/>
        <DatePickers/>
        <NumGuests/>
        <Button variant="contained" onClick={getProperties} style={{margin: "1%"}}>
          Search
        </Button>
      </div>
      <div>
      {Object.keys(properties).map(function(key) {
        return <div>Key: {key}, Value: {properties[key]}</div>;
      })}

      </div>
    </div>


  );
}
