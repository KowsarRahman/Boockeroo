import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Business from "./components/UserManagement/Business";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddPerson from "./components/Persons/AddBooks";
import { Provider } from "react-redux";
import store from "./store";

import ViewBook from "./components/BookBuy/ViewBook";
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
import Orders from "./components/BookBuy/Orders";
import ApplyForApproval from "./components/Persons/ApplyForApproval";
import AddUsers from "./components/Persons/AddUsers";
import ChangeOrder from "./components/BookBuy/ChangeOrder";
import IssueRefund from "./components/BookBuy/IssueRefund";
import AskRefund from "./components/BookBuy/AskRefund";
import EditBook from "./components/Persons/EditBook";
import UpdateStock from "./components/Persons/UpdateStock";
import Report from "./components/BookBuy/Report";
import DeleteReview from "./components/BookBuy/DeleteReview";
import ViewReviews from "./components/BookBuy/ViewReviews";

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
            <Route exact path="/viewBook/:isbn" component={ViewBook}/>
            <Route exact path="/orders" component={Orders}/>
            <Route exact path="/apply" component={ApplyForApproval}/>
            <Route exact path="/addUsers" component={AddUsers}/>
            <Route exact path="/changeOrder/:id" component={ChangeOrder}/>
            <Route exact path="/issueRefund/:id" component={IssueRefund}/>
            <Route exact path="/askRefund/:id" component={AskRefund}/>
            <Route exact path="/editBooks/:isbn" component={EditBook}/>
            <Route exact path="/updateStock/:isbn" component={UpdateStock}/>
            <Route exact path="/reportGenerate" component={Report}/>
            <Route exact path="/deleteReview/:id" component={DeleteReview}/>
            <Route exact path="/viewReviews/:isbn" component={ViewReviews}/>


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