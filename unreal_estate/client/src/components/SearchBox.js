import React from 'react';
import SearchTextBox from './SearchTextBox';
import NumGuests from './NumGuests';
import DatePickers from './DatePickers';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropertyRecoms from './PropertyRecoms';

export default function SearchBox() {

  return (
    <div style={{ textAlign: "-webkit-center",  margin: "0px auto"}}>
      <div style={{ textAlign: "centre", padding: "20px 0px", display: "inlineBlock", width: "50%"}}>
        <SearchTextBox/>
        <DatePickers/>
        <NumGuests/>
        <Link to='/results'>
          <Button variant="contained" style={{margin: "1%", verticalAlign: 'top'}}> Search </Button>
        </Link>
      </div>
      <div style={{ textAlign: "centre", width: "80%"}}>
        <PropertyRecoms/>
      </div>
    </div>
  );
}