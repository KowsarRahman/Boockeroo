import React, { Component, useEffect, useRef } from 'react'
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import UserHeader from '../Layout/UserHeader';

class AddUsers extends Component {

    //To Store everything
    state = {
        users : []
    }

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
        axios.get(`http://localhost:8080/api/users/getApprovals/`)
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
            </>
        );
    }

}
export default AddUsers;