import React, { Component } from "react";
import Header from './Header';

class About extends Component {
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
                  About us!
                </p>
                {/*  */}
                <p>#1 We sale books</p>
                <p>#2 We allow free thought</p>
                <p>#3 We value pen more than sword</p>
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

export default About;