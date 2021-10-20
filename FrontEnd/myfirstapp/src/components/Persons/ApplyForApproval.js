import React, { Component, useRef } from 'react'
import * as PropTypes from 'prop-types'
import { connect } from "react-redux";
import { applyForApproval } from "../../actions/personActions";
import jwtDecode from 'jwt-decode';

import UserHeader from '../Layout/UserHeader';

class ApplyForApproval extends Component {

    
    constructor(){
        super();

    this.state= {
        merchant: "",
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


        //The New Application
        const newApplication = {
            paypal_id: this.state.merchant,
            customerId: pid,
            status: "Pending"
        }

        this.props.applyForApproval(newApplication, this.props.history);
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
                        <h5 className="display-4 text-center">Add Your PayPal Merchant Id</h5>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg " 
                                placeholder="PayPal Merchant Email" 
                                name="merchant"
                                value= {this.state.merchant}
                                onChange = {this.onChange}
                                required
                                />
                            </div><br></br>
                            <p>Applying as as <strong>#ID: </strong>{user.id}, <strong>Owner: </strong>{user.fullName}</p>  
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
ApplyForApproval.propTypes = {
    applyForApproval: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};
 
const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { applyForApproval }
)(ApplyForApproval);
