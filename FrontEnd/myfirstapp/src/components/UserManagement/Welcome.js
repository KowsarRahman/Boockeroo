import React, { Component } from "react";
import Header from "../Layout/Header";

class Welcome extends Component {
    
    render() {


        //Get Newly Registered User Information
        const username = localStorage.getItem("username"); //username
        const fullName = localStorage.getItem("fullName"); //fullName
        const d = new Date();
        const role = localStorage.getItem("role"); //role of that user
        if(!username) {
            window.location.href = "/login"
        }

        

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
                    <h5 className="card-title">G'Day New User</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Welcome</h6>
                    <p className="card-text">Hello {fullName}. Thank you for opening an account on Bockeroo! This is just a welcome page to greet you. You can view our terms and condition. However you still have to login to get access.</p>
                    <p>What is next?</p>
                    <p className="card-text">If you are a <strong>customer</strong>, you just have to add more details to start buying/selling books.</p>
                    <p className="card-text">If you are a <strong>publisher</strong>, your account needs to be approved by our team. However you can login but you cannot start selling right now.</p>

                    <a href="/terms-and-conditions" className="card-link">View Terms and Conditions</a>
                    <a href="/login"  className="card-link">Login Page</a>
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