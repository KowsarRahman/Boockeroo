import React, { Component } from 'react'
import { getPerson } from '../actions/personActions';
import * as PropTypes from 'prop-types'
import { connect } from "react-redux";
import jwtDecode from 'jwt-decode';

import Person from './Persons/Person';
import UserHeader from './Layout/UserHeader';
import CreatePersonButton from './Persons/CreatePersonButton';




class Dashboard extends Component {




    render() {
        

        //Logic to get the current user from the jwt token
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;
        const id = user.id;
        const email = user.username;

  
        this.props.getPerson(id, this.props.history);

        if(!jwt) {
            //Simply take out from the page
            window.location.href = "/";
        }
        

        return (
            <>
            <UserHeader username={username}/>
            <div className="Persons">
            <div className="container">
                <div className="row">

                    <div className="col-md-12">
                       <CreatePersonButton/>
                        <br />
                        <hr />
                        <Person username={username} id={id} email={email}/>
                    </div>
                </div>
            </div>
        </div>
        </>
        )
    }
}

Dashboard.propTypes = {
    getPerson: PropTypes.func.isRequired
  };
  
const mapStateToProps = state => ({
errors: state.errors
});
  
export default connect(
    mapStateToProps,
    { getPerson }
)(Dashboard);
