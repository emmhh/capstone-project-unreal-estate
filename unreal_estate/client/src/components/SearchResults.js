import React  from 'react';
import DatePickers from './DatePickers';
import SearchTextBox from './SearchTextBox';
import NumGuests from './NumGuests';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faBath, faUser, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons'


export default function SearchResults() {

  const [searched, setSearched] = React.useState(false);
  const [properties, setProperties] = React.useState([]);

  if(searched === false){
    getProperties();
  }


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
    }).then((response) => {
      response.json().then((data) => {
        if (data['results'] != null) {
          setProperties(data['results']);
        }
        setSearched(true);
      });
    });
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
          {properties.map(prop => (
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
                    <p style={{margin: '0px'}}>{prop['buildingType']}</p>
                  </div>
                  <div style={{clear:'both', display: 'flex'}}>
                    <FontAwesomeIcon icon={faBed} size="lg"/>
                    <p style={{paddingLeft: "5px", paddingRight: "20px", margin: "0px"}}>{prop['numBeds']}</p>
                    <FontAwesomeIcon icon={faBath} size="lg"/>
                    <p style={{paddingLeft: "5px", paddingRight: "20px", margin: "0px"}}>{prop['numBathrooms']}</p>
                    <FontAwesomeIcon icon={faUser} size="lg"/>
                    <p style={{paddingLeft: "5px", paddingRight: "20px", margin: "0px"}}>{prop['numGuests']}</p>
                  </div>
                  <hr style={{margin: "2px"}}></hr>
                  <div style={{clear:'both', display: 'flex', paddingTop: '5px', paddingBottom: '5px'}}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="lg"/>
                    <p style={{margin: '0px', paddingLeft: "5px"}}>{prop['address']}</p>
                  </div>
                  <hr style={{margin: "2px"}}></hr>
                  <div style={{clear:'both', display: 'flex'}}>
                    <FontAwesomeIcon icon={faStar} size="lg"/>
                    <p style={{margin: '0px', paddingLeft: "5px"}}>x.x</p>
                  </div>
                </div>
                <div style={{width:'17%', display: 'inline-block', padding: '10px'}}>
                  <p style={{marginTop: '55px'}}>Price: ${prop['price']}</p>
                  <Link to='/property'  params={{property_id: prop['property_id']}}>
                    <Button variant="contained" style={{width: "120px"}}>
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
