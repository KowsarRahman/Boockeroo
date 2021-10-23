import React, { Component, useEffect, useRef } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

class DeleteReview extends Component {

   state = {
       status: "Deleting.."
   }

    componentDidMount() {



        //Grab the id of the ordered
        const review_id = this.props.match.params.id;

       //Updating the API in a different way
        axios.delete(`${process.env.REACT_APP_REVIEW_BASE_URL}api/review/deleteById/${review_id}`)
        .then(res => {
          this.setState({status: "Deleted. Close the tab"});
        })


    }

    render() {
        return(
            <>
            <p>{this.state.status}</p>
            <p><button className="btn btn-lg btn-primary" onClick={() => window.close()}>Close the window!</button></p>
            </>
        );
    }
}

export default DeleteReview;