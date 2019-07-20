import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles({
  select: {
    padding: "1%",
    width: "5%",
  }
});

export default function NumGuestsSelector() {
  var initNumGuests;
  if ("numGuests" in localStorage) {
      initNumGuests = localStorage.getItem('numGuests');
  } else {
      initNumGuests = 1;
  }
  const classes = useStyles();
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

  return (
    <span>
      <FormControl className={classes.select}>
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
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
    </span>

  );
}
