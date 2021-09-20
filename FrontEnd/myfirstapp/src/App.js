import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Business from "./components/UserManagement/Business";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddPerson from "./components/Persons/AddBooks";
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import Welcome from "./components/UserManagement/Welcome";
import SecuredRoute from "./securityUtils/SecuredRoute";
import DeleteBook from "./components/Persons/DeleteBook";
import TermsAndConditions from "./components/Layout/TermsAndConditions";
import About from "./components/Layout/About";
import Contact from "./components/Layout/Contact";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });
  //Commented because it was causing the most problem
  const currentTime = Date.now() / 10000000000000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            
            {
              //Public Routes
            }
           
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/business" component={Business} />
            <Route exact path="/terms-and-conditions" component={TermsAndConditions}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/contact" component={Contact}/>
            {
              //Private Routes
            }

            <Route exact path="/addPerson" component={AddPerson} />
            <SecuredRoute 
              exact
              path="/dashboard"
              component={Dashboard}
            />
            <Route exact path="/delete" component={DeleteBook}/>
          
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;