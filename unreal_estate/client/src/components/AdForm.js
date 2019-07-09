import React, { Component } from 'react'
import {Link} from 'react-router-dom';
// import '../css/AdForm.css';

class AdForm extends Component {
  // constructor(props) {
  //   super(props)

  //   this.initialState = {
  //     name: '',
  //     buildingType: '',
  //     location: '',
  //     avgRating: '',
  //   }

  //   this.state = this.initialState
  // }
  constructor(props) {
    super(props)

    this.initialState = {
      name: '',
      buildingType: '',
      location: '',
      avgRating: '',
    }

    this.state = this.initialState
  }
  handleChange = event => {
    const { name, value } = event.target
  
    this.setState({
      [name]: value,
    })
  }
  submitForm = () => {
    // save the new property data to localStorage, but seems like on the other page, localStorage doesnt contain this data.
    // this.props.handleSubmit(this.state)
    var propertyData = JSON.stringify(this.state);
    localStorage.setItem('property', propertyData);
    this.setState(this.initialState);
  }

  render() {
    const { name, buildingType, location, avgRating } = this.state;
  
    return (
      <form>
        <h2>Please enter the informations of your property</h2>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange} />
        <label>BuildingType</label>
        <input
          type="text"
          name="buildingType"
          value={buildingType}
          onChange={this.handleChange} />
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={this.handleChange} />
        {/* <label>AvgRating</label>
        <input
          type="text"
          name="avgRating"
          value={avgRating}
          onChange={this.handleChange} /> */}
        {/* a button that redirect to previous page; */}
        <Link className="button" to='/AdModule'><button type="button">Back</button></Link>
        {/* //FIXME: how to return the form to another page and redirect to the home page*/}
        <Link className='addProperty' to='/AdModule'><input type="button" value="Add Property" onClick={this.submitForm}/></Link>
      </form>
    );
  }
  
}
export default AdForm;