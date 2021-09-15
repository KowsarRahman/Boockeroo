import React from 'react'
import {link, Link} from "react-router-dom";

 const ApproveDeny=() => {
    return (
        <React.Fragment>
        <Link to="/addPerson"
        className="btn btn-lg btn-danger">
        Approve/Deny Users
        </Link><br></br>
        </React.Fragment>
    )
};
export default ApproveDeny;