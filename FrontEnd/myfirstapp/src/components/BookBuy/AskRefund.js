import React, { Component, useEffect, useRef } from 'react'
import axios from 'axios';

class AskRefund extends Component {

    componentDidMount() {

        //Access Restricted
        if(localStorage.urole != "Customer") {
            window.location.href = "/";
        }

        //Grab the id of the ordered
        const order_id = this.props.match.params.id;

       //Updating the API in a different way
       axios
      .put(`http://localhost:8082/api/order/updateOrder`, {
        id: order_id,
        status: "Refund Requested"
      })
      .then((response) => {
        window.location.href = "/orders";
      });


    }

    render() {
        return(
            <>
            <p>Loading....</p>
            </>
        );
    }
}

export default AskRefund;