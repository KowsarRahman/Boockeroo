import React from 'react'
import {link, Link} from "react-router-dom";

 const CheckStatus=() => {
    return (
        <React.Fragment>
        <Link to="/apply"
        className="btn  btn-info">
        Check your Publishing Status
        </Link><br></br>
        </React.Fragment>
    )
};
export default CheckStatus;