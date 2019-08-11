import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faUser, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import {
  Row,
  Form,
  FormGroup,
  FormControl,
  FormLabel
} from "react-bootstrap";
import { toast } from 'react-toastify';
import { elementType } from 'prop-types';
import scriptLoader from 'react-async-script-loader'
import '../css/AdForm.css';
var ConfigFile = require('../config');

class AdForm extends Component {

  constructor(props) {
    super(props)

    this.initialState = {
      existed: false,
      owner_id: null,
      prop_id: null,
      address : null,
      city  : null,
      latitude : null,
      logged_in : null,
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
      autocomplete: null,
      file: null,
    }

    this.state = this.initialState
    this.handleChange = this.handleChange.bind(this);
    this.makeSubmission = this.makeSubmission.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    // this.componentWillMount = this.componentWillMount.bind(this);
    // this.componentWillMount();
  }
  handleChange = event => {
    this.setState({
        [event.target.id]: event.target.value
    });
  }
  submitForm = async () => {
    // save the new property data to localStorage, but seems like on the other page, localStorage doesnt contain this data.
    // this.props.handleSubmit(this.state)
    delete this.state.autocomplete;
    console.log(this.state);
    if (!this.state.file) {
      var propertyData = this.state;
      propertyData["images"] = [ConfigFile.Config.server + 'static/default-house-image.jpg']
      propertyData = JSON.stringify(propertyData);
      localStorage.setItem('property', propertyData);
      window.location.href = ConfigFile.Config.server + 'AdPreview';
    } else {

      const files = Array.from(this.state.file)
      const formData = new FormData()

      formData.append('file', files[0]);
      formData.append('upload_preset', 'wiu02rqf');

      await fetch(`https://api.cloudinary.com/v1_1/dl3x9yefn/image/upload`, {
        method: "POST",
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData,
      }).then(response => {
        console.log(response)
        return response.json()
      }).then(responceJson => {
        console.log(responceJson)
        console.log(responceJson.url)
        this.setState({ ['images']: [responceJson.url]})
      }).catch(error => {
        console.log(error);
      }).finally(()=> {
        console.log('it came to finally');
        var propertyData = JSON.stringify(this.state);
        localStorage.setItem('property', propertyData);
        window.location.href = ConfigFile.Config.server + 'AdPreview';
        // window.location.href = 'http://localhost:3000/AdPreview';
      });
    }
  }

  componentWillMount() {
    var login = localStorage.getItem('is_user_logged_in');
    if (login === "true") {
      this.setState({logged_in: true});
    } else {
      this.setState({logged_in: false});
    }
    if (this.props && this.props.match && this.props.match.params){
      // if the property_id passed in is null, it means user wants to add new property.
      // if the property_id is not null, it means user wants to edit existed property.
      const {property_id} =  this.props.match.params;
      if (property_id != null){
        var req = ConfigFile.Config.server + 'advertising/' + property_id;
        fetch(req, {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('Token'),
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
          })
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }
  }

  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        var input = document.getElementById('address');
        this.state.autocomplete = new window.google.maps.places.Autocomplete(input);
        this.state.autocomplete.setFields(['address_components','geometry']);
        this.state.autocomplete.addListener('place_changed', this.onSelected.bind(this));
      }
    }
  }


  onSelected() {
    var fullAddress;
    console.log(this.state.autocomplete.getPlace());
    this.state.autocomplete.getPlace()["address_components"].forEach(element => {
      var excludeElement = false;
      element['types'].forEach(elementType => {
        if (elementType.toLowerCase() === "administrative_area_level_2"){
          excludeElement = true;
        }
      });
      if (!excludeElement){
        if (fullAddress){
          fullAddress = fullAddress + element['long_name'] + ", "
        } else {
          fullAddress = element['long_name'] + ", "
        }
      }
    });
    this.setState({
      ["address"]: fullAddress.slice(0, -2),
      ["latitude"]: this.state.autocomplete.getPlace().geometry.location.lat(),
      ["longitude"]: this.state.autocomplete.getPlace().geometry.location.lng(),
    });
  }

  //FIXME: submit requests are forbidden
  async makeSubmission (propertyUpdateInfo){
    console.log(propertyUpdateInfo);
    delete propertyUpdateInfo.autocomplete
    propertyUpdateInfo = this.checkProperty(propertyUpdateInfo);
    var req = ConfigFile.Config.server + 'advertising/' + propertyUpdateInfo.prop_id;
    if (propertyUpdateInfo){
      await fetch(req, {
        // credentials: 'include',
        method: "PUT",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': localStorage.getItem('Token'),
        },
        body: JSON.stringify({
          // property_id: this.state.prop_id,
          // address: s.address,
          // num_beds: s.num_beds,
          // num_rooms: s.num_rooms,
          // num_guests: s.guests,
          // num_bathrooms: s.num_bathrooms,
          // description: s.description,
          // name: s.name,
          // building_type: s.building_type,
          // price: s.price,
          propertyInfo: propertyUpdateInfo,
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
        window.location.href = ConfigFile.Config.server;
      })
      .catch((error) => {
        error.json()
        .then( (errorValue) => {
          console.log(errorValue);
          toast.error(errorValue.error);
        })

      });
    }
  }

  handleFileUpload = (event) => {
    var errorFound = false;
    Array.from(event.target.files).forEach(element => {
      if (element.type === "image/png" || element.type === "image/jpeg") {
        console.log(element.type);
      } else {
        toast.error("You can only upload Image files.");
        errorFound = true;
        return;
      }
    });
    if (!errorFound) {
      this.setState({ file: event.target.files });
    } else {
      this.setState({ file: null });
      event.target.files = null;
    }
  }

  checkProperty (propertyInfo){
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
    // const { name, buildingType, location, avgRating } = this.state;
    return(
    <div class='container container-div'>
        {localStorage.getItem('is_user_logged_in') === "false" ? <Redirect to={'/login'}/> : null}
        <h1>Create Property</h1>
      <Form>
        {/* <Form.Group controlId="city">
          <Form.Label>1. Which city?</Form.Label>
          <Form.Control type="city" placeholder="Enter the city" value={this.state.city} onChange={this.handleChange}/>
        </Form.Group> */}

        <Form.Group >
          <Form.Label>1. Where is it located?</Form.Label>
            <Form.Control id="address" type="address" placeholder="Enter the address" value={this.state.address} onChange={this.handleChange}/>
        </Form.Group>
        {/* FIXME: seprate the address. */}
        <Form.Group controlId="num_beds">
          <Form.Label>2. How many bedrooms are there?</Form.Label>
          {/* <Form.Control type="num_beds" placeholder="Enter the number of beds" /> */}
          <Form.Control as="select" value ={this.state.num_beds} onChange={this.handleChange}>
            <option value="null">select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="num_rooms">
          <Form.Label>3. How many rooms are there?</Form.Label>
          {/* <Form.Control type="num_rooms" placeholder="Enter the number of rooms" /> */}
          <Form.Control as="select" value ={this.state.num_rooms} onChange={this.handleChange}>
            <option value="null">select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="1">7</option>
            <option value="2">8</option>
            <option value="3">9</option>
            <option value="4">10</option>
            <option value="5">11</option>
            <option value="6">12</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="num_bathrooms">
          <Form.Label>4. How many bathrooms are there?</Form.Label>
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

        <Form.Group controlId="num_guests">
          <Form.Label>5. How many guests are allowed?</Form.Label>
          <Form.Control type="num_guests" placeholder="Enter the guests capacity" value={this.state.num_guests} onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>6. please add some descriptions to your property</Form.Label>
          <Form.Control as="textarea" type="descriptions" placeholder="Descriptions" value={this.state.description} onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="space">
          <Form.Label>7. please add some descriptions to the neighbourhood of your property</Form.Label>
          <Form.Control as="textarea" type="descriptions" placeholder="Descriptions" value={this.state.space} onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>8. What is the name of your property ?</Form.Label>
          <Form.Control type="name" placeholder="Name of property" value={this.state.name} onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="building_type">
          <Form.Label>9. What type of building is it?</Form.Label>
          <Form.Control type="buiding_type" placeholder="The type of building" value={this.state.building_type} onChange={this.handleChange}/>
        </Form.Group>

        {/* maybe can introduce the average price on the neibourhood */}
        <Form.Group controlId="price">
          <Form.Label>10. What is your prefered price?</Form.Label>
          <Form.Control type="price" placeholder="price" value={this.state.price} onChange={this.handleChange}/>
        </Form.Group>
        {/* 1. if the property already exists ,user can click update button after update the property to submit the form directly, and get redirected to homepage;
            2. if the property doesnot exist, user can click finsih button to be redirected to a preview page to double
          check the info provided, and user is able to click submit button from preview page to post the info to the databse. */}
        {this.state.existed ? null :
          <Form.Group controlId="image">
          <Form.Label>11. Please upload an image of your property</Form.Label>
            <input label='upload file' type='file' onChange={this.handleFileUpload} />
          </Form.Group>
        }
        <div class='button'>
          { this.state.existed ?
            <Link to='/AdModule'>
                <Button color="primary" variant="contained" style={{width: "150px"}} onClick={this.makeSubmission(this.state)}>
                Update
              </Button>
            </Link>
            :
            // <Link to='/AdPreview'>
            <Button color="primary"  variant="contained" style={{width: "150px"}} onClick={this.submitForm}>
                  Preview
                </Button>

            // </Link>
          }
          <Link to='/AdModule' class="button"><Button color="secondary"  variant="contained" style={{width: "150px"}}>Return</Button></Link>
        </div>
      </Form>
    </div>);
    // if (this.state.prop_id == null){
    //   return (
    //     <addNewProperty />
    //     );
    // } else {
    //   return (
    //     <editExitingProp/>
    //   );
    // }

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
export default scriptLoader(
  ["https://maps.googleapis.com/maps/api/js?key=AIzaSyClDGqfGMbApqkFQ3SZbxG6dv7h7FDPCcA&libraries=places"]
)(AdForm)