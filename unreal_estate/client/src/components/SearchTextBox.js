import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Search from '@material-ui/icons/Search';
const google = window.google

export default class SearchTextBox extends Component {

  constructor(props) {
    super(props)
    var initAddress;
    if ("address" in localStorage) {
      initAddress = localStorage.getItem('address');
    } else {
      initAddress = "";
    }
    this.state = {
      address: initAddress
    };
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }



  componentDidMount() {
    var input = document.getElementById('input-with-icon-adornment');
    this.state.autocomplete = new google.maps.places.Autocomplete(input);
    this.state.autocomplete.setFields(['address_components']);
    this.state.autocomplete.addListener('place_changed', this.onSelected.bind(this));
  }

  onSelected() {
    var fullAddress;
    this.state.autocomplete.getPlace()["address_components"].forEach(element => {
      var excludeElement = false;
      element['types'].forEach(elementType => {
        if (elementType.toLowerCase() === "administrative_area_level_2") {
          excludeElement = true;
        }
      });
      if (!excludeElement) {
        if (fullAddress) {
          fullAddress = fullAddress + element['long_name'] + ", "
        } else {
          fullAddress = element['long_name'] + ", "
        }
      }
    });
    localStorage.setItem('address', fullAddress.slice(0, -2));
    this.setState({
      ["address"]: fullAddress.slice(0, -2)
    });
  }


  handleAddressChange(event) {
    localStorage.setItem('address', event.target.value)
    this.setState({
      ["address"]: event.target.value
    });
  }


  render() {
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
            onChange={this.handleAddressChange}
            value={this.state.address}
          />
        </FormControl>
      </div>
    );
  }
}