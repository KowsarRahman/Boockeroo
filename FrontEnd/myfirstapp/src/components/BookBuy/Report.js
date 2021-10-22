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
            url: 'http://localhost:8082/api/order/createReport', //your url
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
            <p>Click <a href='/dashboard'>here</a> to go back to dashboard</p>
            </>
        );
    }
}

export default Report;