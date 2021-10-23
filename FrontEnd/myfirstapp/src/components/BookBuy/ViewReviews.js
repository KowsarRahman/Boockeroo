import React, { Component, useEffect, useRef } from 'react'
import ReactDOM from "react-dom"
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import UserHeader from '../Layout/UserHeader';


class ViewReviews extends Component {

    state = {
        reviews: []
    }
    componentDidMount() {

        const book_url_param = this.props.match.params.isbn;

        //Load the reviews by the isbn of this book
        axios.get(`${process.env.REACT_APP_REVIEW_BASE_URL}api/review/findReviewsByISBN/${book_url_param}`)
        .then(res => {
            const reviews = res.data;
            this.setState( { reviews });
        })
    }

    render(){

        //Logic to get the current user from the jwt token
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;
        const id = user.id;
        const email = user.username;

        const deleteReview = (id) => {
            return<>
            <button className="btn btn-lg btn-success"><a href={'/deleteReview/' + id}>Delete review</a></button>
            </>   
        }

        //View Review from here
        const viewReviews = ()=> {

            if(this.state.reviews.length === 0) {
    
                return <>
                <center><h1>No reviews!</h1></center>
                </>;
            } else {
    
                return <>
                {this.state.reviews.map(review => 
                        <>
                        <div className="card card-body bg-light mb-3">
                        <div className="row">
                        <div className="col-2">
                        <span className="mx-auto">Review No: {review.id}</span>
                        </div>
                        <div className="col-lg-6 col-md-4 col-8">
                        <p>Review by: {review.username}</p>
                        <p>Review: {review.desc}</p>
                        <p>Score: {review.score}</p>
                        {deleteReview(review.id)}
                        </div>
                        </div>
                        </div>
                        </>)}
                </>
            }
        
        }

        return (
            <>
            <UserHeader username={username}/>
            <div className="container">
            {viewReviews()}
            </div>
            </>
        );
    }
}

export default ViewReviews;