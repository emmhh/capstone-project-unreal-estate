import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    withRouter
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faUser, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';

class PropertyPage extends Component {

    constructor(props) {
        super(props);
        this.initialState = {
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
            price : null,
            avg_rating : null,
            images : null,
          };
        this.state = this.initialState;
    }

    componentWillMount() {
        var propertyData = localStorage.getItem('property');
        if (propertyData != null){
            localStorage.removeItem('property');
            var property = JSON.parse(propertyData);
            console.log(property);
            this.setState(property);
        }
    }
    //FIXME:  submit requests are forbidden for some reason
    handleSubmit = (propertyInfo) => {
        console.log(propertyInfo);
        propertyInfo = this.checkProperty(propertyInfo);
        var req = 'http://127.0.0.1:8000/advertising/' + propertyInfo.prop_id;
        if (propertyInfo){}
            fetch(req, {
                credentials: 'include',
                method: "PUT",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                propertyInfo: propertyInfo,
            })
            })
            .then((result)=> {
            if (result.status !== 201){
                throw result;
            }
            return result.json();
            })
            .then((result) => {
            toast.success(result.msg);
            window.location.href = 'http://127.0.0.1:8000/';
            })
            .catch((error) => {
            error.json()
            .then( (errorValue) => {
                console.log(errorValue);
                toast.error(errorValue.error);
            })
            
            });
    }

    checkProperty = (propertyInfo) => {
        if (!propertyInfo.address){
          toast.error('Please enter your address')
          return null
        }
        if (!propertyInfo.price){
          toast.error('Please enter your preferred price')
          return null
        }
        if (!propertyInfo.building_type){
          toast.error('Please enter your building type')
          return null
        }
        return propertyInfo;
      }

    render() {
        return (
            <div style={{textAlign: "centre", display: "block", width: "50%", margin: "0px auto"}}>
                {/* <img src={this.state.images[0]}/> */}
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
                {this.state.space ? null: <div> <h4>Summary</h4> <p>{this.state.space}</p> </div>}
                <br></br>
                <hr></hr>
                <div style={{display: 'inline-block', padding: '10px'}}>
                    <h5>Price per night: ${this.state.price}</h5>
                    <Button variant="contained" style={{width: "120px"}} onClick={this.handleSubmit}>
                        Book
                    </Button>
                </div>
            </div>
        );
    }
}

export default PropertyPage;

