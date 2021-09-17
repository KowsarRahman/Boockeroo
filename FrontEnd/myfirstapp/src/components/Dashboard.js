import React, { Component, useEffect } from 'react'
import { getPerson } from '../actions/personActions';
import * as PropTypes from 'prop-types'
import { connect } from "react-redux";
import jwtDecode from 'jwt-decode';

import Publisher from './Persons/Publisher';
import UserHeader from './Layout/UserHeader';
import Customer from './Persons/Customer';
import PublishBooks from './Persons/PublishBooks';
import Admin from './Persons/Admin';
import ApproveDeny from './Persons/ApproveDeny';




class Dashboard extends Component {

    componentDidMount(){
        //Get More Details of a user
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const uid = user.id;
        this.props.getPerson(uid, this.props.history);
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

        //Checks the role of the user and gives him the necessary actions to do 
        const actions = () => {
            if(localStorage.urole == "Publisher") {
                return <>
                <PublishBooks/><br></br></>;
            }
            if(localStorage.urole == "Customer") {
                return <></>;
            }
            if(localStorage.urole == "Admin") {
                return <><PublishBooks/><br></br><ApproveDeny/><br></br></>;
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
        
        return (
            <>
            <UserHeader username={username}/>
            <div className="Persons">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                       {actions()}
                       {detectUser()}
                        <br />
                        <hr />
                        
                    </div>
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
