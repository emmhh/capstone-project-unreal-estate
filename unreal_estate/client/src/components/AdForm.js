import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faUser, faMapMarkerAlt, faStar, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import {
  Row,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  InputGroup
} from "react-bootstrap";
import { toast } from 'react-toastify';
import {Redirect} from 'react-router-dom';
import '../css/AdForm.css';

class AdForm extends Component {
  
  constructor(props) {
    super(props)

    this.initialState = {
      redirect: false,
      existed: false,
      // owner_id: null,
      prop_id: null,
      address : null,
      address_suburb: null,
      address_state: null,
      address_country: null,
      // city  : null,
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
      avg_rating : 0,
      images : null, //FIXME: add this attribute in the form
    }

    this.state = this.initialState
    this.handleChange = this.handleChange.bind(this);
    this.makeSubmission = this.makeSubmission.bind(this);
    // this.componentWillMount = this.componentWillMount.bind(this);
    // this.componentWillMount();
  }
  handleChange = event => {
    this.setState({
        [event.target.id]: event.target.value
    });
  }
  submitForm = (propertyInfo) => {
    // save the new property data to localStorage, but seems like on the other page, localStorage doesnt contain this data.
    // this.props.handleSubmit(this.state)
    propertyInfo.address = propertyInfo.address_suburb + ", " + propertyInfo.address_state + ", " + propertyInfo.address_country;
    propertyInfo = this.checkProperty(propertyInfo);
    if (propertyInfo){
      var propertyData = JSON.stringify(propertyInfo);
      localStorage.setItem('property', propertyData);
      this.setState({redirect: true});
    } else {
      return null;
    }
    // else {
      // window.confirm("Failed, essential fields are missing");
    // }
    //this.setState(this.initialState);
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/AdPreview' />
    }
  }

  componentWillMount() {
    if (this.props && this.props.match && this.props.match.params){
      // if the property_id passed in is null, it means user wants to add new property.
      // if the property_id is not null, it means user wants to edit existed property.
      const {property_id} =  this.props.match.params;
      if (property_id != null){
        var req = 'http://127.0.0.1:8000/advertising/' + property_id;
        fetch(req, {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then((res)=>{
          if (res.status != 200) {
            throw res;
          } else {
            return res;
          }
        })
        .then((res)=>{
          res.json().then(data=>{
            this.setState(data);
            // this.setState({owner_id: owner_id});
            this.setState({prop_id: property_id});
            this.setState({existed: true});
            // split up the address
            var addressArr = this.state.address.split(", ");
            this.setState({address_suburb: addressArr[0]});
            this.setState({address_state: addressArr[1]});
            this.setState({address_country: addressArr[2]});
          })
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }
  }
  //FIXME: submit requests are forbidden
  async makeSubmission (propertyInfo){
    propertyInfo.address = propertyInfo.address_suburb + ", " + propertyInfo.address_state + ", " + propertyInfo.address_country;
    console.log(propertyInfo);
    propertyInfo = this.checkProperty(propertyInfo);
    var req = 'http://127.0.0.1:8000/advertising/' + propertyInfo.prop_id;
    if (propertyInfo){
      await fetch(req, {
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
        toast.success("Successfully updated the property info");
        window.location.href = 'http://127.0.0.1:8000/AdModule';
      })
      .catch((error) => {
        error.json()
        .then( (errorValue) => {
          console.log(errorValue);
          toast.error("Error.....");
        })
        
      });
    }
  }
  
  
  checkProperty (propertyInfo){
    if (!propertyInfo.address){
      toast.error('Please enter your address');
      window.confirm("address missing");
      return null;
    }
    if (!propertyInfo.num_beds){
        toast.error('Please enter the number of beds');
        window.confirm("number of beds missing");
        return null;
    }
    if (!propertyInfo.price){
      toast.error('Please enter your preferred price');
      window.confirm("price missing");
      return null;
    }
    if (!propertyInfo.description){
        toast.error('Please enter some description');
        window.confirm("description missing");
        return null;
    }
    if (!propertyInfo.name){
      toast.error('Please enter the name of your property');
      window.confirm("name of property missing");
      return null;
    }
    if (!propertyInfo.building_type){
      toast.error('Please enter your building type');
      window.confirm("building type missing");
      return null;
    }
    var reg = new RegExp("^[0-9]+$");
    if (!reg.test(propertyInfo.price)) {
      toast.error('Please enter your building type');
      window.confirm("only numbers are allowed for the price :) ");
      return null;
    }
    if (!reg.test(propertyInfo.num_guests)) {
      toast.error('Please enter the number of guests allowed');
      window.confirm("only numbers are allowed for number of guests :) ");
      return null;
    }
    return propertyInfo;
  }
  
  render() {
    // const { name, buildingType, location, avgRating } = this.state;
    return(
    <div className="form-div">
      <Form>
        {/* <Form.Group controlId="city">
          <Form.Label>1. Which city?</Form.Label>
          <Form.Control type="city" placeholder="Enter the city" value={this.state.city} onChange={this.handleChange}/>
        </Form.Group> */}

        {/* <Form.Group controlId="address" bsSize="large" style={{width: "50%"}}>
          <Form.Label>Where is it located?*</Form.Label>
          <Form.Control type="address" placeholder="Enter the address" value={this.state.address} onChange={this.handleChange}/>
        </Form.Group> */}
        <Form.Group controlId="address_suburb" bsSize="large" style={{width: "50%"}}>
          <Form.Label>Which suburb?*</Form.Label>
          <Form.Control type="address_suburb" placeholder="Enter the address" value={this.state.address_suburb} onChange={this.handleChange}/>
        </Form.Group>
        <Form.Group controlId="address_state" bsSize="large" style={{width: "50%"}}>
          <Form.Label>Which state?*</Form.Label>
          <Form.Control type="address_state" placeholder="Enter the address" value={this.state.address_state} onChange={this.handleChange}/>
        </Form.Group>
        <Form.Group controlId="address_country" bsSize="large" style={{width: "50%"}}>
          <Form.Label>Which country?*</Form.Label>
          <Form.Control type="address_country" placeholder="Enter the address" value={this.state.address_country} onChange={this.handleChange}/>
        </Form.Group>
        {/* FIXME: seprate the address. */}
        <Form.Group controlId="num_beds" bsSize="large" style={{width: "50%"}}>
          <Form.Label>How many beds are there?*</Form.Label>
          {/* <Form.Control type="num_beds" placeholder="Enter the number of beds" /> */}
          <Form.Control as="select" value ={this.state.num_beds} onChange={this.handleChange}>
            <option value="null">select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="num_rooms" bsSize="large" style={{width: "50%"}}>
          <Form.Label>How many rooms are there?</Form.Label>
          {/* <Form.Control type="num_rooms" placeholder="Enter the number of rooms" /> */}
          <Form.Control as="select" value ={this.state.num_rooms} onChange={this.handleChange}>
            <option value="null">select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="num_bathrooms" bsSize="large" style={{width: "50%"}}>
          <Form.Label>How many bathrooms are there?</Form.Label>
          {/* <Form.Control type="num_rooms" placeholder="Enter the number of bathrooms" /> */}
          <Form.Control as="select" value ={this.state.num_bathrooms} onChange={this.handleChange}>
            <option value="null">select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="num_guests" bsSize="large" style={{width: "50%"}}>
          <Form.Label>How many guests are allowed?*</Form.Label>
          <Form.Control type="num_guests" placeholder="Enter the guests capacity" value={this.state.num_guests} onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="description" bsSize="large" style={{width: "50%"}}>
          <Form.Label>Please add some descriptions to your property.*</Form.Label>
          <Form.Control as="textarea" type="descriptions" placeholder="Descriptions" value={this.state.description} onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="space" bsSize="large" style={{width: "50%"}}>
          <Form.Label>Please add some descriptions to the neighbourhood of your property</Form.Label>
          <Form.Control as="textarea" type="descriptions" placeholder="Descriptions" value={this.state.space} onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="name" bsSize="large" style={{width: "50%"}}>
          <Form.Label>What is the name of your property?*</Form.Label>
          <Form.Control type="name" placeholder="Name of property" value={this.state.name} onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="building_type" bsSize="large" style={{width: "50%"}}>
          <Form.Label>What type of building is it?*</Form.Label>
          <Form.Control type="buiding_type" placeholder="The type of building" value={this.state.building_type} onChange={this.handleChange}/>
        </Form.Group>
        
        <Form.Group controlId="price" bsSize="large" style={{width: "50%"}}>
          <Form.Label>What is your prefered price?*</Form.Label>
          <InputGroup>  
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="price" placeholder="price" value={this.state.price} onChange={this.handleChange}/>
          </InputGroup>
        </Form.Group>
        {this.renderRedirect()}
        {/* 1. if the property already exists ,user can click update button after update the property to submit the form directly, and get redirected to homepage;
            2. if the property doesnot exist, user can click finsih button to be redirected to a preview page to double
          check the info provided, and user is able to click submit button from preview page to post the info to the databse. */}
        { this.state.existed ?
          <Link to='/AdModule'>
            <Button variant="contained" style={{width: "150px"}} type="submit" onClick={()=>{this.makeSubmission(this.state)}}>
              Update
            </Button>
          </Link>
        :
          // <Link to='/AdPreview'>
            <Button variant="contained" style={{width: "150px"}} type="submit" onClick={()=>{this.submitForm(this.state)}}>
              Continue
            </Button>
          // </Link>
        }
        <Link to='/AdModule'><Button variant="contained" style={{width: "150px"}}>Return</Button></Link>
      </Form>
    </div>);
  }
}
export default AdForm;