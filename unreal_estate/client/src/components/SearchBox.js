import React from 'react';
import DateRangePickerWrapper from './DateRangePickerWrapper';
import SearchTextBox from './SearchTextBox';
import NumGuests from './NumGuests';
import DatePickers from './DatePickers';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropertyRecoms from './PropertyRecoms';

export default function SearchBox() {

  return (
    <div style={{textAlign: "centre", display: "inlineBlock", width: "50%", margin: "0px auto"}}>
      <div style={{padding: "20px 0px", display: "inlineBlock"}}>
        <SearchTextBox/>
        <DatePickers/>
        <NumGuests/>
        <Link to='/results'>
          <Button variant="contained" style={{margin: "1%", verticalAlign: 'top'}}> Search </Button>
        </Link>
      </div>
      <div>
        <PropertyRecoms/>
      </div>
    </div>
  );
}