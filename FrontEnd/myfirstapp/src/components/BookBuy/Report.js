import React, { Component, useEffect, useRef } from 'react'
import axios from 'axios';

class Report extends Component {

    state = {
        status: "Downloading..."
    }

   

    componentDidMount() {

        if(localStorage.urole != "Admin") {
            window.location.href = "/dashboard";
        }

        axios({
            url: `${process.env.REACT_APP_ORDER_BASE_URL}api/order/createReport`, //your url
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Transaction.csv'); //or any other extension
            document.body.appendChild(link);
            link.click();
            this.setState({status: "Downloaded.."});
        });
    }

    render() {

        return (
            <>
            <h1>{this.state.status}</h1>
            <p><button className="btn btn-lg btn-primary" onClick={() => window.close()}>Close the window!</button></p>
            </>
        );
    }
}

export default Report;