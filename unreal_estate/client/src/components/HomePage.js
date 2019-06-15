import React, { Component } from 'react';
import Nav from './Nav';
import '../css/HomePage.css';

class HomePage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div className="homepage-div">
          <Nav/>
          <h1>Unreal Estate</h1>
          <p>
            Gagandeep Nain, z5137193<br/>
            Add Names here <br/>
          </p>
        </div>
      );
    }
}

export default HomePage;
