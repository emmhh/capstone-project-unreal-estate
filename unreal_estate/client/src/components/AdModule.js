import React, {Component} from 'react';
import AdTable from './AdTable';
// import AdForm from './AdForm'
import {Link} from 'react-router-dom';

class AdModule extends Component {
    
    removeProperty = index => {
        const { properties } = this.state
        this.setState({
            properties: properties.filter((property, i) => {
                return i !== index
            }),
        })
    }
    // handleSubmit = property => {
    //     this.setState({ properties: [...this.state.properties, property] })
    // }
    state = {
        properties: [
            {
                name: 'UniLodge',
                buildingType: 'unit',
                location: 'Kensington',
                avgRating: '3.7',
            },
        ],
    }
    // static getDerivedStateFromProps(props, state) {
    //     console.log('HELLO');
    //     var propertyData = localStorage.getItem('property');
    //     localStorage.removeItem('property');
    //     var property = JSON.parse(propertyData);
    //     console.log(typeof property);
    //     this.setState({properties: [...this.state.properties, property] })
    // }
    async addProperty () {

    }
    render() {
        const {properties} = this.state

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
            <AdTable propertyData={properties} removeProperty={this.removeProperty} addProperty={this.addProperty}/>
            <Link to='/AdForm'><button type="button">Add new Property</button></Link>
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