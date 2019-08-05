import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Search from '@material-ui/icons/Search';
import scriptLoader from 'react-async-script-loader'

class SearchTextBox extends Component {

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

  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        var input = document.getElementById('input-with-icon-adornment');
        this.state.autocomplete = new window.google.maps.places.Autocomplete(input);
        this.state.autocomplete.setFields(['address_components']);
        this.state.autocomplete.addListener('place_changed', this.onSelected.bind(this));
      }
    }
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

export default scriptLoader(
  ["https://maps.googleapis.com/maps/api/js?key=AIzaSyClDGqfGMbApqkFQ3SZbxG6dv7h7FDPCcA&libraries=places"]
)(SearchTextBox)