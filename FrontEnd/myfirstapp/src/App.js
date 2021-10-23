import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Business from "./components/UserManagement/Business";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Switch } from "react-router";
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
import Error from "./components/Layout/Error";

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
            <Switch>
            <Route exact path="/" component={Landing} />
            <Route  path="/register" component={Register} />
            <Route  path="/login" component={Login} />
            <Route  path="/welcome" component={Welcome} />
            <Route  path="/business" component={Business} />
            <Route  path="/terms-and-conditions" component={TermsAndConditions}/>
            <Route  path="/about" component={About}/>
            <Route  path="/contact" component={Contact}/>
            <Route  path="/viewBook/:isbn" component={ViewBook}/>
            <Route  path="/orders" component={Orders}/>
            <Route  path="/apply" component={ApplyForApproval}/>
            <Route  path="/addUsers" component={AddUsers}/>
            <Route  path="/changeOrder/:id" component={ChangeOrder}/>
            <Route  path="/issueRefund/:id" component={IssueRefund}/>
            <Route  path="/askRefund/:id" component={AskRefund}/>
            <Route  path="/editBooks/:isbn" component={EditBook}/>
            <Route  path="/updateStock/:isbn" component={UpdateStock}/>
            <Route  path="/reportGenerate" component={Report}/>
            <Route  path="/deleteReview/:id" component={DeleteReview}/>
            <Route  path="/viewReviews/:isbn" component={ViewReviews}/>
            {
              //Private Routes
            }

            <Route  path="/addPerson" component={AddPerson} />
            <SecuredRoute 
              
              path="/dashboard"
              component={Dashboard}
            />
            <Route  path="/delete" component={DeleteBook}/>
            <Route component={Error}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;