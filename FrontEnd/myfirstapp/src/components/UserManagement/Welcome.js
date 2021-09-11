import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../Layout/Header";

class Welcome extends Component {
    
    render() {

        function logout() {
            localStorage.clear();
            window.location.href = "/";
        }

        //Get Newly Registered User Information
        const username = localStorage.getItem("username"); //username
        const fullName = localStorage.getItem("fullName"); //fullName

        

        return (
            <>
            <Header/>
            <div className="welcome">
                <div className="container">
                <div className="row">
                <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Welcome :)</h1><br/>
                <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">G'Day</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Welcome</h6>
                    <p className="card-text">Hello {fullName}. Thank you for opening an account on Bockeroo! This is just a welcome page to greet you. You can view our terms and condition. However you still have to login to get access.</p>
                    <Link href="/dashboard" className="card-link">View Terms and Conditions</Link>
                    <Link href="/logout"  className="card-link">Landing Page</Link>
                </div>
                </div>
                    </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default Welcome;