import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles({
  grid: {
    display: 'inline',
  },
  field: {
    width: '8%',
    padding: '1%',
    margin: '0',
  },
});

export default function DatePickers() {
  // The first commit of Material-UI
  var dateToday = new Date();
  var minCheckOutDate = new Date();
  minCheckOutDate.setDate(dateToday.getDate()+1);
  minCheckOutDate.setHours(0,0,0,0)
  dateToday.setHours(0,0,0,0);

  const [checkInDate, setCheckInDate] = React.useState(dateToday);
  const [checkOutDate, setCheckOutDate] = React.useState(minCheckOutDate);

  const classes = useStyles();

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
  }

  return (
    <span>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid} justify="space-around">
          <KeyboardDatePicker
            margin="normal"
            id="checkin-date"
            label="Check In"
            value={checkInDate}
            onChange={handleCheckInChange}
            minDate={dateToday}
            className={classes.field}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid} justify="space-around">
          <KeyboardDatePicker
            margin="normal"
            id="checkout-date"
            label="Check Out"
            value={checkOutDate}
            onChange={handleCheckOutChange}
            minDate={minCheckOutDate}
            className={classes.field}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </span>

  );
}