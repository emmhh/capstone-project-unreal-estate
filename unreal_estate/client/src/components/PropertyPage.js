import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    withRouter
} from 'react-router-dom';


class PropertyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loding: true,
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
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidMount();
    }
    
    componentDidMount() {
        if (this.props && this.props.match && this.props.match.params){
            const {property_id} =  this.props.match.params;
            var req = 'http://127.0.0.1:8000/advertising/' + property_id;
            fetch(req, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                })
                .then((res) => {
                    res.json().then(data => {
                        this.setState(data);
                        this.setState({prop_id: property_id});
                        this.setState({ is_loding: false });
                    });
                });
        }
    }


    render() {
        if (this.state.is_loding === false) {

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
        } else {
            return (<div></div>);
        }
    }
}

export default PropertyPage;

