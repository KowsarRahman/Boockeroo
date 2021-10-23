import React, { Component, useEffect, useRef } from 'react'
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import UserHeader from '../Layout/UserHeader';

class AddUsers extends Component {


    //Form for the constructor
    constructor() {

        super(); 
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //To Store everything
        this.state = {
            users : [],
            id: "",
            customerId: "",
            status: "",
            paypal_id: "",
            errors: {}
        }
    }

    //On Changing the input
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }


    //On Submitting the form 
    onSubmit(e) {
        e.preventDefault();

        //Submit the form and the main magic starts
        axios
        .put(`${process.env.REACT_APP_LOGIN_BASE_URL}api/users/updateApproval`, {
            id: this.state.id,
            customerId: this.state.customerId,
            status: "Approved",
            paypal_id: this.state.paypal_id
        })
        .then((response) => {
            window.location.href = "/addUsers";
        });
    }


    //Everytime the page loads
    componentDidMount() {

        //Access restricted
        if(localStorage.urole != "Admin") {
            window.location.href = "/";
        }
        //Logic to get the current user from the jwt token
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;
        const id = user.id;
        const email = user.username;

        //View All Applications
        axios.get(`${process.env.REACT_APP_LOGIN_BASE_URL}api/users/getApprovals/`)
        .then(res => {
            const users = res.data;
            this.setState( { users });
        })
    }

    render() {

        //Logic to get the current user from the jwt token
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;
        const id = user.id;
        const email = user.username;

        
        return (
            <>
            <UserHeader username={username}/>
            <div className="container">
                <h1><center>All Publishers's Application</center></h1>
                <p><center>Approve a user by typing out his credentials</center></p>
                {/* Form to Fill up an approval */}
                <form onSubmit={this.onSubmit}>
                <input type="text" className="form-control form-control-lg " 
                                name="id"
                                value= {this.state.id}
                                onChange = {this.onChange}
                                placeholder= "Application Id"
                                required
                />
                <input type="text" className="form-control form-control-lg " 
                                name="customerId"
                                value= {this.state.customerId}
                                onChange = {this.onChange}
                                placeholder= "Merchant Id"
                                required
                />
                <input type="text" className="form-control form-control-lg " 
                                name="paypal_id"
                                value= {this.state.paypal_id}
                                onChange = {this.onChange}
                                placeholder = "PayPal Email"
                                required
                />
                <center><input type="submit" value="Approve this user" className="btn btn-primary btn-block mt-4"/></center>
                </form><br></br>
                {/* THE END */}

                {/* All Applications */}
            {this.state.users.map(user => 
                <>
                <div className="card card-body bg-light mb-3">
                                <div className="row">
                                    <div className="col-2">
                                        <span className="mx-auto">Applcation ID: {user.id}</span>
                                    </div>
                                    <div className="col-lg-6 col-md-4 col-8">
                                        <h3>Publisher Id: {user.customerId}</h3>
                                        <p>Status: {user.status}</p>
                                        <p>PayPal: {user.paypal_id}</p>
                                    </div>
                                </div>
                            </div>
                </>)}
            </div>
            {/* THE END */}
            </>
        );
    }

}
export default AddUsers;