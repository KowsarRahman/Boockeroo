import React, { Component } from "react";
import Header from './Header';

class Contact extends Component {
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
                  Contact us?
                </p>
                {/*  */}
                <p>Email: Bockeroo@Bockeroo.com</p>
                <p>Please include your order number for better processinng</p>
                {/*  */}
                <hr />
                
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default Contact;