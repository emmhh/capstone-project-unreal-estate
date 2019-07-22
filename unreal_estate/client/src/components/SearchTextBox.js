import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Search from '@material-ui/icons/Search';

export default function SearchTextBox() {
  var initAddress;
  if ("address" in localStorage) {
      initAddress = localStorage.getItem('address');
  } else {
      initAddress = "";
  }
  const [address, setAddress] = React.useState(initAddress);

  function handleAddressChange(event) {
    localStorage.setItem('address', event.target.value)
    setAddress(event.target.value);
  }

  return (
    <div style={{textAlign: 'center', display: 'inline', verticalAlign: 'top'}}>
      <FormControl style={{width: "40%", padding: "0 1% 0 0"}}>
        <InputLabel htmlFor="input-with-icon-adornment">Enter an Address</InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
          onChange={handleAddressChange}
          value={address}
        />
      </FormControl>
    </div>
  );
}