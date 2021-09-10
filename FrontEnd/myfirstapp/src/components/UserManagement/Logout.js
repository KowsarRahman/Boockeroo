import React, { Component } from "react";
import { logout } from "../../actions/securityActions";
import store from "../../store";
const jwtToken = localStorage.jwtToken;




class Logout extends Component {

    componentDidMount() {
        if(jwtToken) {
            //Destroys all the local storages
            localStorage.clear();
            store.dispatch(logout());
            window.location.href= "/";
        } else {
            window.location.href = "/";
        }
    }
    
    render() {
        return (

            <>
            </>

        );
    }
}
export default Logout;