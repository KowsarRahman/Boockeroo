import React from 'react'
import {link, Link} from "react-router-dom";

 const PublishBooks=() => {
    return (
        <React.Fragment>
        <Link to="/addPerson"
        className="btn btn-lg btn-success">
        Publish Books
        </Link><br></br>
        </React.Fragment>
    )
};
export default PublishBooks;