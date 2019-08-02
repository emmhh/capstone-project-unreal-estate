import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: -33.8122763,
        lng: 150.9668987
      },
      zoom: 11
    };

    this.apiIsLoaded = this.apiIsLoaded.bind(this);
    this.getGeoLocation = this.getGeoLocation.bind(this);

  };

  apiIsLoaded = async(map, maps) => {
    if (map) {
      await this.getGeoLocation();
      const directionsService = new maps.DirectionsService();
      const directionsDisplay = new maps.DirectionsRenderer();
      console.log(this.props.lat);
      directionsDisplay.setMap(map);
      directionsService.route({
        origin: this.state.center,
        destination: {
            lat: this.props.lat,
            lng: this.props.lng
        },
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  };

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState(prevState => ({
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            zoom: prevState.zoom,
          }));
        }

      )
    } else {
      console.log('There was an error getting current location.')
    }
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '80%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyClDGqfGMbApqkFQ3SZbxG6dv7h7FDPCcA' }}
          defaultCenter={this.state.center}
          center={this.state.center}
          defaultZoom={this.state.zoom}
          zoom={this.state.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
        >
          {/* {this.referencePointsList}
          {this.vehiclesInRoute} */}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;