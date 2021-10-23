import React, { Component, useEffect, useRef } from 'react'
import { getPerson } from '../actions/personActions';
import * as PropTypes from 'prop-types'
import { connect } from "react-redux";
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import Publisher from './Persons/Publisher';
import UserHeader from './Layout/UserHeader';
import Customer from './Persons/Customer';
import PublishBooks from './Persons/PublishBooks';
import Admin from './Persons/Admin';
import ApproveDeny from './Persons/ApproveDeny';
import DeleteBooks from './Persons/DeleteBooks';
import CheckStatus from './Persons/CheckStatus';


class Dashboard extends Component {

    
   

    //State to store the books
    state = {
        books: [],
        approved_user: []
    }

    componentDidMount(){
        //Get More Details of a user
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const uid = user.id;
        this.props.getPerson(uid, this.props.history);

        //View All Current Books no matter who is ther user
        axios.get(`${process.env.REACT_APP_BOOK_BASE_URL}api/books/findBooks/`)
        .then(res => {
            const books = res.data;
            this.setState( { books });
        })


        //Check if the publisher has the right to publish or not
        axios.get(`${process.env.REACT_APP_LOGIN_BASE_URL}api/users/getApproval/${uid}`)
        .then(res => {
            const approved_user = res.data;
            this.setState( { approved_user });
        })

    }
        

    render() {

        if(!localStorage.getItem("jwtToken")) {
            //Simply take out from the page
            window.location.href = "/";
        }
    
        //Logic to get the current user from the jwt token
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;
        const id = user.id;
        const email = user.username;

        // Conditional Renders

        //Checks the role of the user and gives him the necessary actions to do 
        const actions = () => {
            if(localStorage.urole == "Publisher") {
                return <>{canIPublish()}</>;
            }
            if(localStorage.urole == "Customer") {
    
                return <></>;
            }
            if(localStorage.urole == "Admin") {
                return <><PublishBooks/><br></br><ApproveDeny/><br></br></>;
            }
        }

        //View the status of publishing for the Publisher
        const canIPublish = () => {
            if(localStorage.urole == "Publisher") {
                if(this.state.approved_user.length === 0) {
                    return <>
                    <p>Sorry! It seems you are not yet eligble for publishing!</p>
                    <p>Don't worry! Click <a href='/apply'>here</a> to apply for approval</p>
                    </>;
                } else if(this.state.approved_user.status == "Approved") {
                    //User can publish books 
                    return <><PublishBooks/></>;
                } else if(this.state.approved_user.status == "Denied") {
                    return <><p>Sorry you are blocked fron publishing</p></>;
                } else if(this.state.approved_user.status == "Pending") {
                    return <><p>Application under process</p></>;
                }
            }
        }

        //Display User Profile based on type
        const detectUser = () => {
            if(localStorage.urole == "Publisher") {
                return <Publisher username={username} id={id} email={email} abn={localStorage.getItem("abn")} address_business={localStorage.getItem("address_business")} phone_number={localStorage.getItem("phone_number")} role={localStorage.urole}/>;
            }
            if(localStorage.urole == "Customer") {
                return <Customer username={username} id={id} email={email} role={localStorage.urole}/>;
          
            }
            if(localStorage.urole == "Admin") {
                return <Admin username={username} id={id} email={email} role={localStorage.urole}/>;
          
            }
        }

        //Giving the delete right to Admins and Publishers only
        const deleteBooks = (data) => {
            if(localStorage.urole == "Publisher"){
                if(data == username) {

                    return <><DeleteBooks/></>;
                }
            }
        }

        //Only Customer can view books and buy them
        const buythebooks = (data) => {

            if(localStorage.urole == "Customer") {

                return <><button className="btn-lg btn-success"><a href={ '/viewBook/' + data }>View This</a></button></>;
            }
        }
        // END OF CONDITIONAL RENDERS


        //BOOK EDITING FEATURE

        //Publisher edits if he is the owner
        const editBooksByPublisher = (data, isbn) => {

            if(localStorage.urole == "Publisher") {
                if(data == username) {
                    return <>
                    <button className="btn btn-lg btn-success"><a href={'/editBooks/' + isbn} target="_blank">Edit Price</a></button>
                    </>;
                }
            }
        }

        //Admin edits irrespective of his owning status
        const editBooksByAdmin = (isbn) => {
            if(localStorage.urole == "Admin") {
                    return <>
                    <button className="btn btn-lg btn-success"><a href={'/editBooks/' + isbn} target="_blank">Edit Price</a></button>
                    </>;
            }
        }

        //Out of Stock
        const markOutOfStock = (data, owner) => {

            if(localStorage.urole == "Publisher") {
                if(owner == username) {

                    return <>
                    <button className="btn btn-lg btn-warning"><a href={'/updateStock/' + data} target="_blank">Update Stock</a></button>
                    <button className="btn btn-lg btn-danger"><a href={'/viewReviews/' + data} target="_blank">View Reviews</a></button>
                    </>
                }
            }
        }

        const markOutOfStockByAdmin = (data) => {

            if(localStorage.urole == "Admin") {
                return <>
                <button className="btn btn-lg btn-warning"><a href={'/updateStock/' + data} target="_blank">Update Stock</a></button>
                <button className="btn btn-lg btn-danger"><a href={'/viewReviews/' + data} target="_blank">View Reviews</a></button>
                </>
            }
        }

        const deleteBooksByAdmin = () => {

            if(localStorage.urole == "Admin") {
                return <><DeleteBooks/></>;
            }
        }


        //Report Thing

        const generateReport = () => {

            if(localStorage.urole == "Admin") {

                return<>
                <button  className="btn-lg btn-warning"><a href='/reportGenerate' target='_blank'>Generate a report</a></button>
                </>
            }
        }

        //The End of Report Thing

        //// THE END 

        
        return (
            <>
            {/* User Header Column */}
            <UserHeader username={username}/>
            {/* Main Body */}
            <div className="Persons">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                       {detectUser()}
                       {actions()}
                       {generateReport()}
                        <br />
                    </div>
                    
                    {/* Book Column */}
                    <h1><center>All Books</center></h1>
                    {this.state.books.map(book => 
                        <>
                        <div className="card" style={{width : "18rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">#{book.id} {book.title}</h5>
                            <img src={book.imageLink} style={{width : "123px", height: "120px"}}/>
                            <p className="card-text"><strong>Author</strong>: {book.author}</p>
                            <p className="card-text"><strong>ISBN:</strong> {book.isbn}</p>
                            <p className="card-text"><strong>Price</strong>: AUD {book.price}0</p>
                            <p className="card-text"><strong>Page Count:</strong> {book.pageCount}</p>
                            <p className="card-text"><strong>Category:</strong> {book.genre}</p>
                            <p className="card-text"><strong>Condition:</strong> {book.condition}</p>
                            <p className="card-text"><strong>Published by:</strong> {book.storeOwnerName}</p>
                            {deleteBooks(book.storeOwnerName)}
                            {buythebooks(book.isbn)}
                            {editBooksByPublisher(book.storeOwnerName, book.isbn)}
                            {editBooksByAdmin(book.isbn)}
                            {markOutOfStock(book.isbn, book.storeOwnerName)}
                            {markOutOfStockByAdmin(book.isbn)}
                            {deleteBooksByAdmin()}
                           
                        </div>
                        </div>
                        </>)}
                        {/* THE END */}
                </div>
                
            </div>
        </div>
        </>
        )
    }
}

Dashboard.propTypes = {
    getPerson: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  
const mapStateToProps = state => ({
errors: state.errors
});
  
export default connect(
    mapStateToProps,
    { getPerson }
)(Dashboard);
