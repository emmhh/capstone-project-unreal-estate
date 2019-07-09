import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Search from '@material-ui/icons/Search';

const useStyles = makeStyles({
  margin: {
    width: '20%',
    padding: '1%',
  },
});

export default function SearchTextBox() {
  const classes = useStyles();
  const [address, setAddress] = React.useState("");

  function handleAddressChange(event) {
    localStorage.setItem('address', event.target.value)
    setAddress(event.target.value);
  }

  return (
    <span>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="input-with-icon-adornment">Enter an Address</InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
          onChange={handleAddressChange}
        />
      </FormControl>
    </span>
  );
}