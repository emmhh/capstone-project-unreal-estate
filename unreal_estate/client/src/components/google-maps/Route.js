import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
    };

    this.apiIsLoaded = this.apiIsLoaded.bind(this);
  };

  apiIsLoaded = (map, maps) => {
    if (map) {
      // do your thing with map or maps
      console.log(map);
    }
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '80%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCX7HaQnN4wU7IqNlQTDr1i5HAXt77LHQ8' }}
          defaultCenter={this.state.center}
          center={this.state.center}
          defaultZoom={this.state.zoom}
          zoom={this.state.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
        >
          {/* {this.referencePointsList} */}
          {/* {this.vehiclesInRoute} */}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;