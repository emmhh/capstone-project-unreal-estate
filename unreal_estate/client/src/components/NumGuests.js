import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from '@material-ui/core/FormControl';

export default function NumGuestsSelector(props) {

  var maxGuests = 10;
  if (props.maxGuests != null) {
    maxGuests = props.maxGuests;
  }

  var initNumGuests;
  if ("numGuests" in localStorage) {
      initNumGuests = localStorage.getItem('numGuests');
  } else {
      initNumGuests = 1;
      localStorage.setItem('numGuests', 1);
  }
  const [numGuests, setNumGuests] = React.useState(initNumGuests);
  const [open, setOpen] = React.useState(false);

  function handleNumGuestsChange(event) {
    localStorage.setItem('numGuests', event.target.value)
    setNumGuests(event.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  let menuItems = [];
  for (var i = 1; i <= maxGuests; i++) {
    menuItems.push(parseInt(i));
  }


  return (
    <div style={{textAlign: 'center', display: 'inline', verticalAlign: 'top'}}>
      <FormControl style={{padding: "0 1%", width: "15%"}}>
        <InputLabel shrink>Number of Guests</InputLabel>
        <Select
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={numGuests}
          onChange={handleNumGuestsChange}
          inputProps={{
            name: "numGuests",
            id: "numGuests"
          }}
        >
        {menuItems.map(single => (
          <MenuItem
            value={single}
          >
            {single}
          </MenuItem>
        ))}
        </Select>
      </FormControl>
    </div>

  );
}
