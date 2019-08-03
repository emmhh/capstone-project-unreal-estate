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
import { toast } from 'react-toastify';

// import '../css/AdForm.css';

class AdForm extends Component {
  
  constructor(props) {
    super(props)

    this.initialState = {
      existed: false,
      // owner_id: null,
      prop_id: null,
      address : null,
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
  submitForm = () => {
    // save the new property data to localStorage, but seems like on the other page, localStorage doesnt contain this data.
    // this.props.handleSubmit(this.state)
    var propertyData = JSON.stringify(this.state);
    localStorage.setItem('property', propertyData);
    //this.setState(this.initialState);
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
    console.log(propertyInfo);
    propertyInfo = this.checkProperty(propertyInfo);
    var req = 'http://127.0.0.1:8000/advertising/' + propertyInfo.prop_id;
    if (propertyInfo){}
      await fetch(req, {
        credentials: 'include',
        method: "PUT",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
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
    <div>
      <Form>
        {/* <Form.Group controlId="city">
          <Form.Label>1. Which city?</Form.Label>
          <Form.Control type="city" placeholder="Enter the city" value={this.state.city} onChange={this.handleChange}/>
        </Form.Group> */}

        <Form.Group controlId="address">
          <Form.Label>2. Where is it located?</Form.Label>
          <Form.Control type="address" placeholder="Enter the address" value={this.state.address} onChange={this.handleChange}/>
        </Form.Group>
        {/* FIXME: seprate the address. */}
        <Form.Group controlId="num_beds">
          <Form.Label>3. How many bedrooms are there?</Form.Label>
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
          <Form.Label>4. How many rooms are there?</Form.Label>
          {/* <Form.Control type="num_rooms" placeholder="Enter the number of rooms" /> */}
          <Form.Control as="select" value ={this.state.num_rooms} onChange={this.handleChange}>
            <option value="null">select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="num_bathrooms">
          <Form.Label>5. How many bathrooms are there?</Form.Label>
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
          <Form.Label>6. How many guests are allowed?</Form.Label>
          <Form.Control type="num_guests" placeholder="Enter the guests capacity" value={this.state.num_guests} onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>7. please add some descriptions to your property</Form.Label>
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
        { this.state.existed ?
          <Link to='/AdModule'>
            <Button variant="contained" style={{width: "150px"}} type="submit" onClick={()=>{this.makeSubmission(this.state)}}>
              Update
            </Button>
          </Link>
        :
          <Link to='/AdPreview'>
            <Button variant="contained" style={{width: "150px"}} type="submit" onClick={this.submitForm}>
              Preview
            </Button>
          </Link>
        }
        <Link to='/AdModule'><Button variant="contained" style={{width: "150px"}}>Return</Button></Link>
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
export default AdForm;