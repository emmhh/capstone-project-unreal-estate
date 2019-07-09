import React, { Component } from 'react';
import SearchBox from './SearchBox';
import '../css/HomePage.css';

class HomePage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div className="homepage-div">
          <h1>Unreal Estate</h1>
          <SearchBox />
          <p>
            Gagandeep Nain, z5137193<br/>
            Emmanuel Kozman, z5120558<br/>
          </p>
        </div>
      );
    }
}

export default HomePage;
