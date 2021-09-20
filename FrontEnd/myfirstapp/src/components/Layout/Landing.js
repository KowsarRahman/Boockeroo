import React, { Component } from "react";
import Header from './Header';
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <>
      <Header/>
      <div className="landing">
        <div className="light-overlay landing-inner text-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">
                  Bockeroo
                </h1>
                <p className="lead">
                  No matter you are a publisher or a seller, one platform for all of you!
                </p>
                <hr />
                <Link className="btn btn-lg btn-primary mr-2" to="/register">
                  Sign Up
                </Link>
                <Link className="btn btn-lg btn-secondary mr-2" to="/login">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default Landing;