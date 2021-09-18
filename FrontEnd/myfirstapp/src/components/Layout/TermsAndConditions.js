import React, { Component } from "react";
import Header from './Header';

class TermsAndConditions extends Component {
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
                  Please read our rules before joining us!
                </p>
                {/*  */}
                <p>#1 No stolen books allowed here</p>
                <p>#2 No hateful allowed here</p>
                <p>#3 Giving false information will get you banned</p>
                <p>#4 Violation of fair price rule will be given permanent ban</p>
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

export default TermsAndConditions;