import React, {Component} from 'react';
import AdTable from './AdTable';
import Button from '@material-ui/core/Button';
// import AdForm from './AdForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faUser, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

class AdModule extends Component {
    // FIXME: need to pass in user_id to make fecth and initialise the state.
    constructor(props) {
        super(props)
        this.state = {
            user_id: 1,
            owned_properties:[
                {
                    prop_id: 1,
                    owner_id: 1,
                    address : "432/8 Victoria Park Parade",
                    city  : "Zetland",
                    latitude : 33.9080,
                    longitude : 151.2105,
                    num_beds: 3,
                    num_rooms : 3,
                    num_bathrooms : 2,
                    num_guests : 6,
                    description : "Beautifully renovated, spacious and quiet, our 3 Bedroom, 3 Bathroom home is only a 10 minute walk to beaches in Fairlight or Forty Baskets, or a 30 minute walk to Manly via the coastal promenade, or an Express bus runs every 20 mins at your door.",
                    space : "Our home is a thirty minute walk along the seashore promenade to Manly, one of Sydney's most beautiful beaches, with its village restaurants, cafes, and shopping. If you prefer more variety, the Manly ferry will take you to the Sydney CBD in 15 minutes. The residence is sited in a sought-after family-friendly street only a short stroll to nearby North Harbour reserve and Forty Baskets cafe and beach. It's a short walk further to express CBD buses, ferries, and Manly entertainment. Or there is a bus (#131 or #132) around the corner that drops you in Manly in 8 minutes. Our home features a stainless steel galley kitchen, including Ilve oven and gas cooktop. We have two separate living areas on the ground floor. The front lounge enjoys P&amp;O window surrounds with a fireplace, Grand piano and wall mounted TV. The separate family/ dining room at the rear has two long white leather lounge sofas and a 65&acirc;&euro; wall mounted TV. The dining room table extends to seat 8 comfortably. There is a cov",
                    name : "Unilodge",
                    building_type : "House",
                    price : "600.0",
                    avg_rating : 6.7,
                    images : "https://a0.muscache.com/im/pictures/56935671/fdb8c0bf_original.jpg?aki_policy=large" ,
                },{
                    prop_id: 2,
                    owner_id: 1,
                    address : "1008/4 Lachlan St",
                    city  : "Waterloo",
                    latitude : 33.9004,
                    longitude : 151.2066,
                    num_beds: 3,
                    num_rooms : 3,
                    num_bathrooms : 2,
                    num_guests : 6,
                    description : "Beautifully renovated, spacious and quiet, our 3 Bedroom, 3 Bathroom home is only a 10 minute walk to beaches in Fairlight or Forty Baskets, or a 30 minute walk to Manly via the coastal promenade, or an Express bus runs every 20 mins at your door.",
                    space : "Our home is a thirty minute walk along the seashore promenade to Manly, one of Sydney's most beautiful beaches, with its village restaurants, cafes, and shopping. If you prefer more variety, the Manly ferry will take you to the Sydney CBD in 15 minutes. The residence is sited in a sought-after family-friendly street only a short stroll to nearby North Harbour reserve and Forty Baskets cafe and beach. It's a short walk further to express CBD buses, ferries, and Manly entertainment. Or there is a bus (#131 or #132) around the corner that drops you in Manly in 8 minutes. Our home features a stainless steel galley kitchen, including Ilve oven and gas cooktop. We have two separate living areas on the ground floor. The front lounge enjoys P&amp;O window surrounds with a fireplace, Grand piano and wall mounted TV. The separate family/ dining room at the rear has two long white leather lounge sofas and a 65&acirc;&euro; wall mounted TV. The dining room table extends to seat 8 comfortably. There is a cov",
                    name : "Manly Harbour House",
                    building_type : "House",
                    price : "100.0",
                    avg_rating : 9.9,
                    images : "https://ca-times.brightspotcdn.com/dims4/default/ef603a9/2147483647/strip/true/crop/2000x1125+0+0/resize/840x473!/quality/90/?url=https%3A%2F%2Fca-times.brightspotcdn.com%2F7a%2Fde%2F13f73a188b9136b484391d474301%2Fla-1546546158-5xiyt1vqgf-snap-image" ,
                },
            ],
            new_property: {
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
            }
        }
        // this.componentDidMount = this.componentDidMount(this);
        // this.componentDidMount();
    }
    componentDidMount(){
        // to fecth the list of owned properties from databse;
        if (this.props && this.props.match && this.props.match.params){
            const {property_id} =  this.props.match.params;
            var req = 'http://127.0.0.1:8000/advertising/' + this.state.user_id;
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
                    // this.setState({ is_loading: false });
                });
            });
        }
    }
    async removeProperty(property_id) {
        var req = 'http://127.0.0.1:8000/advertising/' + property_id;
        await fetch(req, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then((result)=>{
            return result.json();
        })
        .then((result)=>{
            console.log(result);
        })
        .then((property_id) => {
            this.handle_deletion(property_id);
        });
    }
    
    handle_deletion = property_id => {
        const { properties } = this.state
        this.setState({
            properties: properties.filter((property) => {
                return property.prop_id !== property_id
            }),
        })
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
    // async addProperty () {
    //     var req = 'http://127.0.0.1:8000/advertising/' + property_id;
    //     fetch(req, {
    //         method: "POST",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         body: JSON.stringify({
    //             city: this.
    //             // property_id: match.params.property_id,
    //             // startDate: this.state.startDate,
    //             // endDate: this.state.startDate,
    //             // bookingTime: 
    //             // price:
    //         })
    //     });
    // }
    render() {
        // const {properties} = this.state.owned_properties;

        var propertyData = localStorage.getItem('property');
        if (propertyData != null){
            localStorage.removeItem('property');
            var property = JSON.parse(propertyData);
            console.log(property);
            this.setState({properties: [...this.state.properties, property] })
        }
        return (
            <div className="container">
                {/* <Nav /> */}
                <h2>My Properties</h2>

                {/* <AdTable propertyData={properties} removeProperty={this.removeProperty} addProperty={this.addProperty}/> */}
                <AdTable propertyData={this.state.owned_properties} removeProperty={this.removeProperty} addProperty={this.addProperty}/>
                
                <Link to='/AdForm'><Button variant="contained" style={{width: "px"}}>Add new Property</Button></Link>
                {/* <AdForm handleSubmit={this.handleSubmit}/> */}
            </div>
        )
    }
}
//notes:
/**
 * 1. validation check for each input value, handle the error
 * 2. pathways for each html
 * 3. css
 * 4. how to connect frontend to backend
 * 5. build up the backend side for advertising Accomodation module
 * 6. add more attributes for each property
 * */
export default AdModule;