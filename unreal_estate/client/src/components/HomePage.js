import React, { Component } from 'react';
import SearchBox from './SearchBox';
import '../css/HomePage.css';
import PropertyPage from './PropertyPage';

class HomePage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div className="homepage-div">
          <h1>Unreal Estate</h1>
          <SearchBox/>
          <PropertyPage/>
        </div>
      );
    }
}

export default HomePage;
