import React from 'react'
import {link, Link} from "react-router-dom";

 const DeleteBooks=() => {
    return (
        <React.Fragment>
        <Link to="/delete"
        className="btn btn-lg btn-info">
        Delete Book
        </Link><br></br>
        </React.Fragment>
    )
};
export default DeleteBooks;