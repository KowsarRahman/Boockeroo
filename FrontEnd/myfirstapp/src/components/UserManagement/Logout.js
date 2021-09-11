import React, { Component } from "react";
import jwtDecode from 'jwt-decode';



class Logout extends Component {

    


    render() {
        //Checks an existing session
        const jwt = localStorage.getItem("jwtToken");

        if(jwt) {
            localStorage.clear();
            window.location.href = "/";

        } 

        return (

            <>
            </>

        );
    }
}
export default Logout;