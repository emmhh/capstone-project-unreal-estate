import React, { Component } from 'react';
var ConfigFile = require('../config');

class PropertyBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prop_id: null,
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
        const {property_id} =  this.props.match.params;
        var req = ConfigFile.Config.server + 'advertising/' + property_id;
        fetch(req, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            })
            .then((res) => {
                res.json().then(data => {
                    this.setState(data)
                    this.setState({prop_id: property_id})
                });
            })
    }

    confirmBooking(){

    }

    render() {
        return (
            <div>
                <img src={this.state.image}/>
                <h1>{this.state.name}</h1>
                <h2>{this.state.suburb}</h2>
                <div>
                    <div>{this.state.num_guests}</div>
                    <div>{this.state.num_beds}</div>
                    <div>{this.state.num_bathroom}</div>
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
                <button onClick={this.confirmBooking}>BOOK</button>
            </div>
        );
    }
}

export default PropertyBook;

