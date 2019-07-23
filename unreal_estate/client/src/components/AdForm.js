import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faUser, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import {
  Row,
  Form,
  FormGroup,
  FormControl,
  FormLabel
} from "react-bootstrap";
// import '../css/AdForm.css';

// FIXME: if the prop_id is null, then it means we are adding new property;
const addNewProperty = props => {
    
  return (
    <div>
      <Form>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group controlId="formBasicChecbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="contained" style={{width: "150px"}} type="submit" onClick={this.submitForm}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
//FIXME: if the property id already exists, then preload the data into the page;
const editExistingProp = props => {
    
}

class AdForm extends Component {
  
  constructor(props) {
    super(props)

    this.initialState = {
      // name: '',
      // buildingType: '',
      // location: '',
      // avgRating: '',
      owner_id: null,
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
      space : null, //FIXME: add this attribute in the form
      name : null,
      building_type : null,
      prices : null,
      avg_rating : 0,
      images : null, //FIXME: add this attribute in the form
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
    // const { name, buildingType, location, avgRating } = this.state;
    return(
    <div>
      <Form>
        <Form.Group controlId="city">
          <Form.Label>1. Which city?</Form.Label>
          <Form.Control type="city" placeholder="Enter city" />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>2. Where is it located?</Form.Label>
          <Form.Control type="address" placeholder="Enter the address" />
        </Form.Group>

        <Form.Group controlId="num_beds">
          <Form.Label>3. How many bedrooms are there?</Form.Label>
          {/* <Form.Control type="num_beds" placeholder="Enter the number of bedrooms" /> */}
          {/* sample for checkbox */}
          {['checkbox'].map(type => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check inline label="1" type={type} id={`inline-${type}-1`} />
              <Form.Check inline label="2" type={type} id={`inline-${type}-2`} />
              <Form.Check
                inline
                disabled
                label="3 (disabled)"
                type={type}
                id={`inline-${type}-3`}
              />
              <Form.Check inline label="4" type={type} id={`inline-${type}-4`} />
              <Form.Check inline label="5" type={type} id={`inline-${type}-5`} />
            </div>
          ))}
        </Form.Group>

        <Form.Group controlId="num_rooms">
          <Form.Label>4. How many rooms are there?</Form.Label>
          {/* <Form.Control type="num_rooms" placeholder="Enter the number of rooms" /> */}
          {['checkbox'].map(type => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check inline label="1" type={type} id={`inline-${type}-1`} />
              <Form.Check inline label="2" type={type} id={`inline-${type}-2`} />
              <Form.Check
                inline
                disabled
                label="3 (disabled)"
                type={type}
                id={`inline-${type}-3`}
              />
              <Form.Check inline label="4" type={type} id={`inline-${type}-4`} />
              <Form.Check inline label="5" type={type} id={`inline-${type}-5`} />
            </div>
          ))}
        </Form.Group>

        <Form.Group controlId="num_guests">
          <Form.Label>5. How many guests are allowed?</Form.Label>
          {/* <Form.Control type="num_guests" placeholder="Enter the guests capacity" /> */}
          {['checkbox'].map(type => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check inline label="1" type={type} id={`inline-${type}-1`} />
              <Form.Check inline label="2" type={type} id={`inline-${type}-2`} />
              <Form.Check
                inline
                disabled
                label="3 (disabled)"
                type={type}
                id={`inline-${type}-3`}
              />
              <Form.Check inline label="4" type={type} id={`inline-${type}-4`} />
              <Form.Check inline label="5" type={type} id={`inline-${type}-5`} />
            </div>
          ))}
        </Form.Group>

        <Form.Group controlId="descriptions">
          <Form.Label>6. please add some descriptions to your property</Form.Label>
          <Form.Control type="descriptions" placeholder="Descriptions" />
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>7. What is the name of your property ?</Form.Label>
          <Form.Control type="name" placeholder="Name of property" />
        </Form.Group>

        <Form.Group controlId="building_type">
          <Form.Label>8. What type of building is it?</Form.Label>
          <Form.Control type="buiding_type" placeholder="The type of building" />
        </Form.Group>
        
        {/* maybe can introduce the average price on the neibourhood */}
        <Form.Group controlId="price">
          <Form.Label>9. What is your prefered price?</Form.Label>
          <Form.Control type="price" placeholder="price" />
        </Form.Group>
        {/* link to PropertyPage.js */}
        {/* <Link to="{/property/ + this.state.property_id}"> */}
        <Link to={'/property/' + this.state.prop_id}>
          <Button variant="contained" style={{width: "150px"}} type="submit" onClick={this.submitForm}>
            Submit
          </Button>
        </Link>
      </Form>
    </div>);
    if (this.state.prop_id == null){
      return (
        <addNewProperty />
        );
    } else {
      return (
        <editExitingProp/>
      );
    }
    
  }
  // <form>
  //   <br/>
  //   <h4>Please enter the informations of your property</h4>
  //   <br/>
  //   <label>Name</label>
  //   <input
  //     type="text"
  //     name="name"
  //     value={name}
  //     onChange={this.handleChange} />
  //   <label>BuildingType</label>
  //   <input
  //     type="text"
  //     name="buildingType"
  //     value={buildingType}
  //     onChange={this.handleChange} />
  //   <label>Location</label>
  //   <input
  //     type="text"
  //     name="location"
  //     value={location}
  //     onChange={this.handleChange} />
  //   {/* <label>AvgRating</label>
  //   <input
  //     type="text"
  //     name="avgRating"
  //     value={avgRating}
  //     onChange={this.handleChange} /> */}
  //   {/* a button that redirect to previous page; */}
  //   <Link className="button" to='/AdModule'>
  //     <Button variant="contained" style={{width: "110px"}}>
  //       Back
  //     </Button></Link>
  //   <Link className='addProperty' to='/AdModule'>
  //     {/* <input type="button" value="Add Property" onClick={this.submitForm}/> */}
  //     <Button variant="contained" style={{width: "150px"}} onClick={this.submitForm}>
  //       Add Property
  //     </Button>
  //   </Link>
  // </form>

}
export default AdForm;