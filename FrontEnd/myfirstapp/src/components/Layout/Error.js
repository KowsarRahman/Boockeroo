import React, { Component } from "react";
import Header from './Header';

class Error extends Component {
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
                  Error 404! Ah 0h!
                </p>
                {/*  */}
                <p><strong>Couple of actions you can take:</strong></p>
                <p>#1 Check again</p>
                <p>#2 Go back to <a href='/dashboard'>Dashboard</a> if you are logged in!</p>
                <p>#2 Go back to <a href='/'>Home</a> if you want to login/register</p>
                <p>Sorry,</p>
                <p>Sorry boockeroo team!</p>
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

export default Error;