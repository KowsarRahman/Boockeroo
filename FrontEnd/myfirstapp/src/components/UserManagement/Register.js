import React, { Component } from "react";
import { createNewUser } from "../../actions/securityActions";
import Header from "../Layout/Header";
import * as PropTypes from 'prop-types'
import { connect } from "react-redux";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      role: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  

  //On Submit Logic
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      role: "Customer"
    };

    //Checkes whether the password is matches or not

    const passwordCheck = {password: this.state.password, verifyPassword: this.state.confirmPassword};

    if (passwordCheck.password !== passwordCheck.verifyPassword) {
      alert("Passwords don't match!");
      
    } else {

      this.props.createNewUser(newUser, this.props.history); //Go for submission

    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <>
      <Header/>
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Regular User Account</p>
              <p className="lead text-center">Own a business? Then you can open an account from <a href="/business">Business Application page</a>.</p>
              
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Full Name"
                    name="fullName"
                    value={this.state.fullName}
                    required
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Email Address (Username)"
                    name="username"
                    value={this.state.username}
                    required
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    id="password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                </div>
                <p>By Signing up, you are agreeing with our terms and conditions by default.</p>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createNewUser }
)(Register);