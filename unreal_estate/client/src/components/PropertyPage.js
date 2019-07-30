import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faUser, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';

class PropertyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loading: true,
            prop_id: null,
            address : null,
            city  : null,
            latitude : null,
            longitude : null,
            num_beds: null,
            num_rooms : null,
            num_bathrooms : null,
            num_guests : null,
            description : null,
            space : null,
            name : null,
            building_type : null,
            prices : null,
            avg_rating : null,
            images : null,
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
                        this.setState({ is_loading: false });
                    });
                });
        }
    }

    render() {
        const { is_loading } = this.state
        if (is_loading === false) {
            return (
                <div style={{textAlign: "centre", display: "block", width: "50%", margin: "0px auto"}}>
                    <img src={this.state.images[0]}/>
                    <h1>{this.state.name}</h1>
                    <div style={{clear:'both', display: 'inline-flex', paddingTop: '5px', paddingBottom: '5px'}}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} size="2x"/>
                        <h3 style={{margin: '0px', paddingLeft: "5px"}}>{this.state.address}</h3>
                    </div>
                    <div>
                      <div style={{clear:'both', display: 'inline-flex'}}>
                        <FontAwesomeIcon icon={faBed} size="lg"/>
                        <p style={{paddingLeft: "5px", paddingRight: "20px", margin: "0px"}}>{this.state.num_beds}</p>
                        <FontAwesomeIcon icon={faBath} size="lg"/>
                        <p style={{paddingLeft: "5px", paddingRight: "20px", margin: "0px"}}>{this.state.num_bathrooms}</p>
                        <FontAwesomeIcon icon={faUser} size="lg"/>
                        <p style={{paddingLeft: "5px", paddingRight: "20px", margin: "0px"}}>{this.state.num_guests}</p>
                      </div>
                    </div>
                    <br></br>
                    <hr></hr>
                    <div>
                        <h4>Summary</h4>
                        <p>{this.state.description}</p>
                    </div>
                    {this.state.space == '' ? null: <div> <h4>Space</h4> <p>{this.state.space}</p> </div>}
                    <br></br>
                    <hr></hr>
                    <div style={{display: 'inline-block', padding: '10px'}}>
                      <h5>Price per night: ${this.state.price}</h5>
                        <Link to={'/property_booking/' + this.state.prop_id}>
                            <Button variant="contained" style={{width: "120px"}}>
                                Book
                            </Button>
                        </Link>
                    </div>
                </div>
            );
        } 
        else {
            return null;
        }
    }
}

export default PropertyPage;

