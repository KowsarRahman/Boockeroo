import React, { Component, useEffect, useRef } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

class DeleteReview extends Component {

   state = {
       status: "Deleting.."
   }

    componentDidMount() {

        //Access Restricted
        if(localStorage.urole != "Customer") {
            window.location.href = "/dashboard"
        }

        //Grab the id of the ordered
        const review_id = this.props.match.params.id;

       //Updating the API in a different way
        axios.delete(`http://localhost:8083/api/review/deleteById/${review_id}`)
        .then(res => {
          this.setState({status: "Deleted. Close the tab"});
          this.props.history.goBack();
        })


    }

    render() {
        return(
            <>
            <p>{this.state.status}</p>
            </>
        );
    }
}

export default DeleteReview;