import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DatePickers() {
  // The first commit of Material-UI
  var dateToday = new Date();
  var minCheckOutDate = new Date();
  minCheckOutDate.setDate(dateToday.getDate()+1);
  minCheckOutDate.setHours(0,0,0,0)
  dateToday.setHours(0,0,0,0);

  var initCheckIn;
  if ("checkin" in localStorage) {
      initCheckIn = new Date(localStorage.getItem('checkin'));
  } else {
      initCheckIn = dateToday;
  }

  var initCheckOut;
  if ("checkout" in localStorage) {
      initCheckOut = new Date(localStorage.getItem('checkout'));
  } else {
      initCheckOut = minCheckOutDate;
  }

  const [checkInDate, setCheckInDate] = React.useState(initCheckIn);
  const [checkOutDate, setCheckOutDate] = React.useState(initCheckOut);

  function handleCheckInChange(date) {
    setCheckInDate(date);
    localStorage.setItem('checkin', date)
    var dayAfter = new Date();
    dayAfter.setHours(0,0,0,0);
    dayAfter.setDate(date.getDate()+1);
    setCheckOutDate(dayAfter);  
    localStorage.setItem('checkout', dayAfter)
    minCheckOutDate = dayAfter;
  }

  function handleCheckOutChange(date) {
    localStorage.setItem('checkout', date)
    setCheckOutDate(date);
    if ("checkin" in localStorage) {
      var CheckInDate = new Date(localStorage.getItem('checkin'));
      var CheckOutDate = new Date(localStorage.getItem('checkout'));
      const diffTime = Math.abs(CheckOutDate.getTime() - CheckInDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      localStorage.setItem('days', diffDays);
    }
  }

  return (
    <div style={{textAlign: 'center', display: 'inline-flex', width: "30%", verticalAlign: 'top'}}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container style={{display: "flex"}} justify="space-around">
          <KeyboardDatePicker
            margin="normal"
            id="checkin-date"
            label="Check In"
            value={checkInDate}
            onChange={handleCheckInChange}
            minDate={dateToday}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            style={{padding: "0 5%", margin: "0"}}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container style={{display: "flex"}} justify="space-around">
          <KeyboardDatePicker
            margin="normal"
            id="checkout-date"
            label="Check Out"
            value={checkOutDate}
            onChange={handleCheckOutChange}
            minDate={minCheckOutDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            style={{padding: "0 5%", margin: "0"}}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </div>

  );
}