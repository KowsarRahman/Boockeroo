import React, { Component, useEffect, useRef } from 'react'
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import UserHeader from '../Layout/UserHeader';

class Orders extends Component {

    //To Store bunch of orders
    state = {
        orders : [],
    }

    componentDidMount() {
        //Logic to get the current user from the jwt token
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;
        const id = user.id;
        const email = user.username;

        //View Customer Orders according to his username given

        //View All Current Books no matter who is ther user
        axios.get(`http://localhost:8082/api/order/findOrdersByUsername/${email}`)
        .then(res => {
            const orders = res.data;
            this.setState( { orders });
            console.log(res.data.length);
        })
    }

    render() {

        //Logic to get the current user from the jwt token
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;
        const id = user.id;
        const email = user.username;

        return (
            <>
            <UserHeader username={username}/>
            <div className="container">
            {this.state.orders.map(order => 
                <>
                <div className="card card-body bg-light mb-3">
                                <div className="row">
                                    <div className="col-2">
                                        <span className="mx-auto">Order ID: {order.id}</span>
                                    </div>
                                    <div className="col-lg-6 col-md-4 col-8">
                                        <h3>Book Name: {order.title}</h3>
                                        <p>Price: {order.price}</p>
                                        <p>ISBN: {order.isbn}</p>
                                        <p>Buyer: {order.username}</p>
                                        <p>Seller: {order.seller}</p>
                                        <p>Status: {order.status}</p>
                                    </div>
                                </div>
                            </div>
                </>)}
            </div>
            </>
        );
    }

}
export default Orders;