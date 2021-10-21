import React, { Component, useRef } from 'react'
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import UserHeader from '../Layout/UserHeader';

class EditBook extends Component {

  
    
    componentDidMount() {
        
        //Access Restricted (No Customer Allowed)
        if(localStorage.urole == "Customer") {
            window.location.href = "/";
        }

        //Check for the book
        const isbn = this.props.match.params.isbn;

        axios.get(`http://localhost:8081/api/books/findBookByISBN/${isbn}`)
        .then(res => {
            const edit_books = res.data;
            this.setState( { edit_books });
        })


    }
    
    constructor(){
        super();

        this.state= {
        price: "",
        edit_books: [],
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
        const pfullName = user.fullName;
        
        axios
        .put(`http://localhost:8081/api/books/updateBook`, {
            id: this.state.edit_books.id,
            price: this.state.price
        })
        .then((response) => {
            window.location.href = "/dashboard";
        });
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
                        <h5 className="display-4 text-center">Edit Books</h5>
                        <center>As per Boockeroo rules, you can only change the price.</center>
                        <hr />
                        <form onSubmit={this.onSubmit}>
                            <p>Existing Price: {this.state.edit_books.price}</p>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Price"
                                name="price"
                                value= {this.state.price}
                                onChange = {this.onChange}
                                required
                                    /><br></br>
                            </div>
                            <p>Editing as <strong>#ID: </strong>{user.id}, <strong>Owner: </strong>{user.fullName}</p>  
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


export default EditBook;
