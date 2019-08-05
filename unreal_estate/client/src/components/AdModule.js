import React, {Component} from 'react';
import AdTable from './AdTable';
import Button from '@material-ui/core/Button';
// import AdForm from './AdForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faUser, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
var ConfigFile = require('../config');

class AdModule extends Component {
    // FIXME: need to pass in user_id to make fecth and initialise the state.
    // AdModule: initialise the sate from GET request, to get the properties based on owner_ids;
    //          Within the AdModule load the AdTable after the component is loaded.
    // redirect to AdForm if "Add property" is clicked.
    // redirect to AdForm if "Edit" is clicked.
    // redirect to PropertyPage if "view" is clicked,  need to form a new page as a preview page without "Book" button,
    //

    // in the AdForm: submit the form that contains the property data into property page, which is a preview page.
        // if "submit is clicked, the page is redirected to confirmation page, user will be able to see the preview and click confirm to actually add the property into database"
    constructor(props) {
        super(props)
        this.state = {
            owned_properties:[

            ],
        }
    }
    async componentWillMount(){
        var req = ConfigFile.Config.server + 'advertising/user';
        await fetch(req, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then((res) => {
            res.json().then(data => {
                this.setState({owned_properties : data});
            });
        });
    }
    // async removeProperty(property_id) {
    //     var req = ConfigFile.Config.server + 'advertising/' + property_id;
    //     await fetch(req, {
    //         method: "DELETE",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //     })
    //     .then((result)=>{
    //         return result.json();
    //     })
    //     .then((result)=>{
    //         console.log(result);
    //     })
    //     .then((property_id) => {
    //         this.handle_deletion(property_id);
    //     });
    //   }
    // handle_deletion = property_id => {
    //     const { properties } = this.state
    //     this.setState({
    //         properties: properties.filter((property) => {
    //             console.log("setstate called in handle_deletion, propertyid is " + property_id);
    //             return property.prop_id !== property_id
    //         }),
    //     })
    // }
    reload = async () => {
        console.log("reload function took place ;)")
        var req = ConfigFile.Config.server + 'advertising/user';
        await fetch(req, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then((res) => {
            res.json().then(data => {
                this.setState({owned_properties : data});
            });
        });
    }
    // handleSubmit = property => {
    //     this.setState({ properties: [...this.state.properties, property] })
    // }
    // state = {
    //     properties: [
    //         {
    //             name: 'UniLodge',
    //             buildingType: 'unit',
    //             location: 'Kensington',
    //             avgRating: '3.7',
    //         },
    //     ],
    // }

    // static getDerivedStateFromProps(props, state) {
    //     console.log('HELLO');
    //     var propertyData = localStorage.getItem('property');
    //     localStorage.removeItem('property');
    //     var property = JSON.parse(propertyData);
    //     console.log(typeof property);
    //     this.setState({properties: [...this.state.properties, property] })
    // }
    render() {
        console.log(this.state.owned_properties)
        return (
            <div className="container">
                {/* <Nav /> */}
                <h2>My Properties</h2>
                <AdTable propertyData={this.state.owned_properties} reload={this.reload}/>
                <Link to={'/AdForm/'+ null}><Button variant="contained" style={{width: "px"}}>Add new Property</Button></Link>
            </div>
        )
    }
}
export default AdModule;