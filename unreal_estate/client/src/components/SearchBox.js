import React from 'react';
import DatePickers from './DatePickers';
import SearchTextBox from './SearchTextBox';
import NumGuests from './NumGuests';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function SearchBox() {

  return (
    <div>
      <div borderRadius={20}>
        <SearchTextBox/>
        <DatePickers/>
        <NumGuests/>
        <Link to='/results' >
          <Button variant="contained" style={{margin: "1%"}}>
            Search
          </Button>
        </Link>
      </div>
    </div>
  );
}
