import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    withRouter
} from 'react-router-dom';
import SearchBox from './SearchBox.js';
import BookingComponent from './BookingComponent.js';

class PropertyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            property_id : null ,
            suburb : null,
            city  : null,
            latitude : null,
            longitude : null,
            post_code : null,
            num_room : null,
            num_bathroom : null,
            num_guests : null,
            description : null,
            space : null,
            name : null,
            building_type : null,
            prices : null,
            avg_rating : null,
            image : null,
          };
    }
    componentDidMount() {
        fetch('http://127.0.0.1:8000/advertising/${property_id}')
            .then((res) => {
                console.log('maybe');
                console.log(res);
                this.setState(() => ({res}));
            })
    }


    render() {
        const { match } = this.props;
        console.log(match);
        return (
            <div>
                <img src={this.state.image}/>
                <h1>{this.state.name}</h1>
                <h2>{this.state.suburb}</h2>
                <div>
                    <div>{this.state.numGuests}</div>
                    <div>{this.state.numBeds}</div>
                    <div>{this.state.numBaths}</div>
                </div>
                <div>
                    <p>
                        {this.state.description}
                    </p>
                    <h3>
                        The space
                    </h3>
                    <p>
                        {this.state.space}
                    </p>
                </div>
            </div>
        );
    }
}

export default PropertyPage;

