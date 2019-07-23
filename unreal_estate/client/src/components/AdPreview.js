// import React, {Component} from 'react';
// import AdTable from './AdTable';
// // import AdForm from './AdForm'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBed, faBath, faUser, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
// import {Link} from 'react-router-dom'


// class PropertyPreview {

//     constructor(props) {
//         super(props)
//         this.state = {
//             new_property: {
//                 user_id: null,
//                 prop_id: null,
//                 address : null,
//                 city  : null,
//                 latitude : null,
//                 longitude : null,
//                 num_beds: null,
//                 num_rooms : null,
//                 num_bathrooms : null,
//                 num_guests : null,
//                 description : null,
//                 space : null,
//                 name : null,
//                 building_type : null,
//                 prices : null,
//                 avg_rating : null,
//                 images : null,
//             }
//         }
//     }

//     async submitProperty(){
//         var req = 'http://127.0.0.1:8000/advertising/' + property_id;
//         await fetch(req, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             boday: JSON.stringify({
//                 property_id: this.state.prop_id,
//                 // suburb: this.state.suburb,
//                 address: this.state.address,
//                 city: this.state.city,
//                 num_beds: this.state.num_beds,
//                 num_rooms: this.state.num_rooms,
//                 num_bathrooms: this.state.num_bathrooms,
//                 num_guests: this.state.num_guests,
//                 description: this.state.description,
//                 name: this.state.name,
//                 building_type: this.state.building_type,
//                 images: this.state.building_type,
//             })
//         }).then(result => {
//             return result.json();
//         })
//         .then((result)=>{
//             console.log(result);
//         })
//     }

//     async getOwnedProperty () {

//         await fetch ()
//     }


//     render () {
//         <ul> 

//         </ul>
//     }
// }