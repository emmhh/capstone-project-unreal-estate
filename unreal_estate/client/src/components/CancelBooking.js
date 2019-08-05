// import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
// import { Redirect } from 'react-router-dom'

// class CancelBooking extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             redirect : false
//         }
//     }

//     async makeCancel() {
//         console.log(this.props)
//         var BID = this.props.booking_id;
//         var url = ConfigFile.Config.server + 'booking/delete/' + BID;
//         await fetch(url ,{
//             method: "GET",
//             headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/x-www-form-urlencoded',
//             }
//         })
//         .then(result => {
//             console.log(result.json());
//             this.setState({
//                 redirect: true
//             })
//         });
//     }

//     renderRedirect = () => {
//         if (this.state.redirect) {
//             return <Redirect to=''/>
//         }
//     }

//     render() {
//         return (
//             <div>
//                 {this.renderRedirect()}
//                 <Button  variant="contained" style={{margin: "1%", verticalAlign: 'top'}} onClick={() => this.makeCancel}>
//                     Cancel
//                 </Button>
//             </div>
//         )
//     }
// }

// export default CancelBooking;