import React, { Component } from 'react'

class Publisher extends Component {



    render() {

        //get further information

        return (
            <div className="container">
                            <div className="card card-body bg-light mb-3">
                                <div className="row">
                                    <div className="col-2">
                                        <span className="mx-auto">User ID: {this.props.id}</span>
                                    </div>
                                    <div className="col-lg-6 col-md-4 col-8">
                                        <h3>Name: {this.props.username}</h3>
                                        <p>Email: {this.props.email}</p>
                                        <p>ABN: {this.props.abn}</p>
                                        <p>Phone Number: {this.props.phone_number}</p>
                                        <p>Business Address: {this.props.address_business}</p>
                                        <p>Account Type: {this.props.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
        )
    }
}
export default Publisher;