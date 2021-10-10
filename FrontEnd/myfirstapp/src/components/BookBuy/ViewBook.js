import React, { Component, useEffect, useRef } from 'react'
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import PaypalExpressBtn from 'react-paypal-express-checkout';

import UserHeader from '../Layout/UserHeader';

class ViewBook extends Component {


    //Particular Book
    state = {
        books: []
    }

    

    componentDidMount() {

        const book_url_param = this.props.match.params.isbn;

        //View All Current Books no matter who is ther user
        axios.get(`http://localhost:8081/api/books/findBookByISBN/${book_url_param}`)
        .then(res => {
            const books = res.data;
            this.setState( { books });
        })

    }
  
    render() {

        const buy_with_paypal = () => {

            const client = {
                sandbox:    'AcoEYwGkdnyyoLeeE587-akrwyVM-aYij-pJ7gfGLO9Xx9MNsSlsFxaRs5_W4MctSYD9Xw4-tBdTyHni'
            }
            
            if(localStorage.urole == "Customer") {
                return <>
                <PaypalExpressBtn client={client} currency={'AUD'} total={145.00} />
                </>;
            }

        }

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
            
                    <div className="card card-body bg-light mb-3">
                                <div className="row">
                                    <div className="col-2">
                                        <span className="mx-auto">Book ID: {this.state.books.id}</span><br></br><br></br>

                                        <img src={this.state.books.imageLink} style={{width : "123px", height: "120px"}}/>
                                    </div>
                                    <div className="col-lg-6 col-md-4 col-8">
                                        <h3>Name: {this.state.books.title}</h3>
                                        <p>Writer: {this.state.books.author}</p>
                                        <p>Page Count: {this.state.books.pageCount}</p>
                                        <p>Price: AUD {this.state.books.price}</p>
                                        <p>Publisher: {this.state.books.storeOwnerName}</p>
                                        <p>ISBN: {this.state.books.isbn}</p>
                                        <p>Condition: {this.state.books.condition}</p>
                                        {buy_with_paypal()}
                                    </div>
                                </div>
                            </div>
                            </div>
             </>
        );
    }
}

export default ViewBook;
