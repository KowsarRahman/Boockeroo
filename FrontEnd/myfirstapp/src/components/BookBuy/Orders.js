import React, { Component, useEffect, useRef } from 'react'
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import UserHeader from '../Layout/UserHeader';

class Orders extends Component {

    //To Store bunch of orders
    state = {
        orders : [],
        refund: [],
        sell: [],
        admin: []
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

        //Look for refunded orders
        axios.get(`http://localhost:8082/api/order/findOrdersForRefund/${email}`)
        .then(res => {
            const refund = res.data;
            this.setState( { refund });
            //console.log(res.data.length);
        })

        //Calling from the publisher perspective

        //Publishers can see their transactions
        axios.get(`http://localhost:8082/api/order/findOrdersBySeller/${username}`)
        .then(res => {
            const sell = res.data;
            this.setState( { sell });
            //console.log(res.data.length);
        })

        //Admins can see every single orders that took place on bookeroo
        axios.get(`http://localhost:8082/api/order/findOrders`)
        .then(res => {
            const admin = res.data;
            this.setState( { admin });
            //console.log(res.data.length);
        })

    }

    render() {

        //Logic to get the current user from the jwt token
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;
        const id = user.id;
        const email = user.username;

        // View refund eligble orders
        const isrefund = () => {

            if(localStorage.urole == "Customer") {

                if(this.state.refund.length === 0) {
                    return <><h1><center>Your recent orders</center></h1><br></br>
                    <center><p>Sorry you are not eligible for any refunds now!</p></center>
                    </>;
                } else {
                    return <>
                    <h1><center>Refund Eligble Orders</center></h1>
                    {this.state.refund.map(refunds => 
                    <>
                    <div className="card card-body bg-light mb-3">
                    <div className="row">
                    <div className="col-2">
                    <span className="mx-auto">Order ID: {refunds.id}</span>
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                    <h3>Book Name: {refunds.title}</h3>
                    <p>Price: {refunds.price}</p>
                    <p>ISBN: {refunds.isbn}</p>
                    <p>Buyer: {refunds.username}</p>
                    <p>Seller: {refunds.seller}</p>
                    <p>Status: {refunds.status}</p>
                    <button className="btn btn-lg btn-info"><a href={'/askRefund/' + refunds.id}>Ask Refund</a></button>
                    </div>
                    </div>
                    </div>
                    </>)}
                    </>;
                }
            }
        }

        //Publishers can tick if the item has been delivered or not 
        const isDelivered = (check, link) => {

            if(localStorage.urole == "Publisher") {
                if(check == "Order Placed") {
                    return <>
                    <button className="btn btn-lg btn-info"><a href={'/changeOrder/' + link}>Mark as Shipped</a></button>
                    </>;
                }
            }
        }

        //Publisher can issue refund if requested
        const issueRefund = (check, link) => {

            if(localStorage.urole == "Publisher") {
                if(check == "Requested Refund") {
                    return <>
                    <button className="btn btn-lg btn-danger"><a href={'/issueRefund/' + link}>Refund Issued</a></button>
                    </>;
                }
            }
        }

        //View summary of transactions from publisher POV and necessary
        const viewsell = () => {

            if(localStorage.urole == "Publisher") {

                if(this.state.sell.length === 0) {
                    //No records
                    return <><h1><center>Sorry no sell records</center></h1></>;
                } else {
                    //View all the Transactions
                    return <>
                    {this.state.sell.map(sells => 
                    <>
                    <div className="card card-body bg-light mb-3">
                    <div className="row">
                    <div className="col-2">
                    <span className="mx-auto">Order ID: {sells.id}</span>
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                    <h3>Book Name: {sells.title}</h3>
                    <p>Price: {sells.price}</p>
                    <p>ISBN: {sells.isbn}</p>
                    <p>Buyer: {sells.username}</p>
                    <p>Seller: {sells.seller}</p>
                    <p>Status: {sells.status}</p>
                    {isDelivered(sells.status, sells.id)} 
                    {issueRefund(sells.status, sells.id)} 
                    </div>
                    </div>
                    </div>
                    </>)}
                    </>;
                }
            }
        }

        //Admins can see all orders going on 
        const viewEveryOrders = () => {

            if(localStorage.urole == "Admin") {

                if(this.state.admin.length === 0) {

                    return <><h1><center>No activity going on your website!</center></h1></>;
                } else {
                    return <>
                    {this.state.admin.map(admins => 
                    <>
                    <div className="card card-body bg-light mb-3">
                    <div className="row">
                    <div className="col-2">
                    <span className="mx-auto">Order ID: {admins.id}</span>
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                    <h3>Book Name: {admins.title}</h3>
                    <p>Price: {admins.price}</p>
                    <p>ISBN: {admins.isbn}</p>
                    <p>Buyer: {admins.username}</p>
                    <p>Seller: {admins.seller}</p>
                    <p>Status: {admins.status}</p>
                    </div>
                    </div>
                    </div>
                    </>)}
                    </>;
                }
            }
        }

        return (
            <>
            <UserHeader username={username}/>
            <div className="container">
                <h1><center>Your Normal Orders/Transactions</center></h1>
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
            {viewsell()}
            {isrefund()}
            {viewEveryOrders()}
            </div>
            </>
        );
    }

}
export default Orders;