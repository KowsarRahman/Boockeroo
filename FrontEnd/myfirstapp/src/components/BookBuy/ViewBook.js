import React, { Component, useEffect, useRef } from 'react'
import ReactDOM from "react-dom"
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { createNewOrder } from '../../actions/orderActions';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';

import UserHeader from '../Layout/UserHeader';

class ViewBook extends Component {

  // Form Processing for review starts here
  constructor() {

    super();
    this.state = {
      desc: "",
      score: "",
      books:[],
      merchant: [],
      reviews: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {

    e.preventDefault();

    //Grab the User information
    const jwt = localStorage.getItem("jwtToken");
    const user = jwtDecode(jwt);
    const username = user.fullName;
    const id = user.id;
    const email = user.username;

    //Post The Review

    if(this.state.score > 100) {

      alert("You cannot give score more than 100");
    } else {

      //Post the review
      axios
      .post("http://localhost:8083/api/review/addReview", {
        desc: this.state.desc,
        score: this.state.score,
        isbn: this.state.books.isbn,
        username: email,
        title : this.state.books.title
      })
      .then(() => {
        window.location.reload();
      });
    }
    }

    //Form Processing for review ends here

    //PayPal Processing 

    createOrder(data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: this.state.books.price,
              },
              payee: {
                email_address: this.state.books.paypal_id
              }
            },
          ],
        });
    }
    
    //Successful Payment
    onApprove(data, actions) {

        //Logic to get the email from the currect user
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const email = user.username;

        //Grab the current time
        var now = new Date();
        var time = now.getHours();

        const newOrder = {
            isbn: this.state.books.isbn,
            title: this.state.books.title,
            username: email,
            seller: this.state.books.storeOwnerName,
            price: this.state.books.price,
            status: "Order Placed",
            time: time
        }
        this.props.createNewOrder(newOrder, this.props.history);
        return actions.order.capture();
    }

    //PayPal Ends here
    

    //Everytime the page reloads
    componentDidMount() {

        const book_url_param = this.props.match.params.isbn;

        //View All Current Books no matter who is ther user
        axios.get(`http://localhost:8081/api/books/findBookByISBN/${book_url_param}`)
        .then(res => {
            const books = res.data;
            this.setState( { books });
        })

        //Load the reviews by the isbn of this book
        axios.get(`http://localhost:8083/api/review/findReviewsByISBN/${book_url_param}`)
        .then(res => {
            const reviews = res.data;
            this.setState( { reviews });
        })

    }

    
  
    render() {

        //Logic to get the current user from the jwt token
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;
        const id = user.id;
        const email = user.username;

        //Stock Eligble
        const checkStock = (data) => {
          if(localStorage.urole == "Customer") {
            if(data == "1") {
              return <>{buy_with_paypal()}</>;
            } else {
              return <><button className="btn btn-lg btn-primary">Out of Stock!</button></>;
            }
          }
        }

        // Pay Pal Function
        const buy_with_paypal = () => {

           //Customers can buy through PayPal checkout

           const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

           if(localStorage.urole == "Customer") {

            return <><PayPalButton
            createOrder={(data, actions) => this.createOrder(data, actions)}
            onApprove={(data, actions) => this.onApprove(data, actions)}
          /></>;
           }
           

        }

        //PayPal Ends Here

        //Delete Review
        const deleteReview = (data, id) => {

          if(data == email) {

            return<>
            <button className="btn btn-lg btn-success"><a href={'/deleteReview/' + id} target="_blank">Delete review</a></button>
            </>
          }
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
                    {deleteReview(review.username, review.id)}
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
            
                    <div className="card card-body bg-light mb-3">
                                <div className="row">
                                    <div className="col-2">
                                        <span className="mx-auto">Book ID: {this.state.books.id}</span><br></br><br></br>

                                        <img src={this.state.books.imageLink} style={{width : "123px", height: "120px"}}/>
                                    </div>
                                    <div className="col-lg-6 col-md-4 col-8">
                                        <h3>Name: {this.state.books.title}</h3>
                                        <p>Writer: {this.state.books.author}</p>
                                        <p>Page Count: {this.state.books.pageCount}</p>
                                        <p>Price: AUD {this.state.books.price}0</p>
                                        <p>Publisher: {this.state.books.storeOwnerName}</p>
                                        <p>ISBN: {this.state.books.isbn}</p>
                                        <p>Condition: {this.state.books.condition}</p>
                                        <p>Table of Contents: <a href={this.state.books.pdf_link} target="_blank">Download!</a></p>
                                        {checkStock(this.state.books.stock)}
                                        {/* {buy_with_paypal()} */}
                                    </div>
                                </div>
                            </div>

                            <br></br>
                            <center><h5>Post your reviews here!</h5></center><br></br>
                            {/* Form for review starts here */}
                            <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <textarea type="text" className="form-control form-control-lg " 
                                placeholder="Your feedbacks are valuable and necessary actions will be taken by the Admin panel" 
                                name="desc"
                                value= {this.state.desc}
                                onChange = {this.onChange}
                                required
                                />
                                
                            </div><br></br>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg " 
                                placeholder="Score out of 100" 
                                name="score"
                                value= {this.state.score}
                                onChange = {this.onChange}
                                required
                                />
                            </div><br></br>
                            <center><input type="submit" className="btn-lg btn-danger" value="Post"/></center>
                            </form>
                            {/* THE END */}
                            <br></br>
                            {viewReviews()}
                            </div>
             </>
        );
    }
}

ViewBook.propTypes = {
    createNewOrder: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  
const mapStateToProps = state => ({
errors: state.errors
});
  
export default connect(
    mapStateToProps,
    { createNewOrder }
)(ViewBook);
