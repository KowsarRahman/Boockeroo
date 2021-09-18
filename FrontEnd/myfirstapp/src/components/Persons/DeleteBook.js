import React, { Component, useRef } from 'react'
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import UserHeader from '../Layout/UserHeader';

class DeleteBook extends Component {
    //File Input
    
    constructor(){
        super();

        this.state= {
        id: "",
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

        const did = this.state.id;

        //Axios Delete
        axios.delete(`http://localhost:8081/api/books/deleteByID/${did}`)
        .then(res => {
            window.location.href = "/dashboard";
        })


        
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
                        <h5 className="display-4 text-center">Delete Book</h5>
                        <p><center>Please type the <i>id</i> number of the book and then press submit</center></p>
                        <hr />
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg " 
                                placeholder="Book Id" 
                                name="id"
                                value= {this.state.id}
                                onChange = {this.onChange}
                                required
                                />
                                
                            </div>
                            <p>Deleting as <strong>#ID: </strong>{user.id}, <strong>Owner: </strong>{user.fullName}</p>  
                            <input type="submit" className="btn btn-danger btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
        )
    }
}
export default DeleteBook;
