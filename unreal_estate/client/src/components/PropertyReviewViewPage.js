import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
var ConfigFile = require('../config');

class PropertyReviewViewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booking_id : this.props.match.params.booking_id,
            review: null,
            isLoading: true,
        };
        this.init = this.init.bind(this);
        this.init();
    }

    async init() {
        await fetch(ConfigFile.Config.server + 'review/getReview/' + this.state.booking_id, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem('Token'),
            },
        })
        .then((res) => {
            res.json().then(data => {
                this.setState({
                    review: data,
                    isLoading: false,
                });
                console.log(data);
            })
        });
    }

    render() {
        return(
            <div className="Review-div" style={{textAlign: "-webkit-center"}}>
                {this.state.isloading ?
                    <h4> Loading... </h4>
                    :
                    <div>
                        <h1>Reviewed</h1>
                        <StarRatings
                            rating={this.state.review['value']}
                            starRatedColor="gold"
                            numberOfStars={5}
                            name='rating'
                        />
                        <p>{this.state.review['notes']}</p>
                        <Link to={''}>
                            <Button variant="contained" color="primary">Return to Home</Button>
                        </Link>
                    </div>
                }
            </div>
        );
    }
}

export default PropertyReviewViewPage;
