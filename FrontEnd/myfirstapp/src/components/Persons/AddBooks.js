import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { connect } from "react-redux";
import {createNewBook} from "../../actions/personActions";
import jwtDecode from 'jwt-decode';

import UserHeader from '../Layout/UserHeader';

class AddBooks extends Component {
    constructor(){
        super();

        this.state= {
        title: "",
        author: "",
        condition: "",
        pageCount: "",
        genre: "",
        price: "",
        isbn: "",
        imageLink : "",
        errors: {}
     
    }; 
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
        }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit(e){
        e.preventDefault();

        //Getting the current user id to grab the id

        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const pid = user.id;

        //The New Book Object
        const newBook = {
            title: this.state.title,
            author : this.state.author,
            pageCount : this.state.pageCount,
            condition : this.state.condition,
            genre: this.state.genre,
            price: this.state.price,
            storeOwnerID: pid,
            isbn: this.state.isbn,
            imageLink: this.state.imageLink
        }

        this.props.createNewBook(newBook, this.props.history);
    }
    render() {

        //To verify the existing username
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;
        const id = user.id;
        const email = user.username;

        return (
            <>
            <UserHeader username={username}/>
            <div className="Person">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Add Books</h5>
                        <hr />
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg " 
                                placeholder="Book Name" 
                                name="title"
                                value= {this.state.title}
                                onChange = {this.onChange}
                                required
                                />
                                
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="ISBN Code"
                                name="isbn"
                                value= {this.state.isbn}
                                onChange = {this.onChange}
                                required
                                    />
                            </div>
                        

                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Price"
                                name="price"
                                value= {this.state.price}
                                onChange = {this.onChange}
                                required
                                    /><br></br>
                            </div>

                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Author"
                                name="author"
                                value= {this.state.author}
                                onChange = {this.onChange}
                                required
                                    />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Page Counts"
                                name="pageCount"
                                value= {this.state.pageCount}
                                onChange = {this.onChange}
                                required
                            />
                            </div><br></br>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Condition"
                                name="condition"
                                value= {this.state.condition}
                                onChange = {this.onChange}
                                required
                                    />
                            </div><br></br>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Genre"
                                name="genre"
                                value= {this.state.genre}
                                onChange = {this.onChange}
                                required
                                    />
                            </div><br></br>
                            <div className="form-group">
                                <input type="file" className="form-control form-control-lg" 
                                name="imageLink"
                                value= {this.state.imageLink}
                                onChange = {this.onChange}
                                required
                                    />
                            </div><br></br>
                            <p>Publishing as <strong>#ID: </strong>{user.id}, <strong>Owner: </strong>{user.fullName}</p>  
                            <input type="submit" className="btn btn-primary btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
        )
    }
}
AddBooks.propTypes = {
    createNewBook: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};
 
const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { createNewBook }
)(AddBooks);
