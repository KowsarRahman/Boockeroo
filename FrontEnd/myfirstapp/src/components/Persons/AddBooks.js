import React, { Component, useRef } from 'react'
import * as PropTypes from 'prop-types'
import { connect } from "react-redux";
import {createNewBook} from "../../actions/personActions";
import jwtDecode from 'jwt-decode';
import S3 from "react-aws-s3";

import UserHeader from '../Layout/UserHeader';

class AddBooks extends Component {
    //File Input


    //Access Restricted (No Customer Allowed)
    componentDidMount() {
        if(localStorage.urole == "Customer") {
            window.location.href = "/";
        }
    }
    
    constructor(){
        super();
        this.fileInput = React.createRef()

        this.state= {
        title: "",
        author: "",
        condition: "",
        pageCount: "",
        genre: "",
        price: "",
        isbn: "",
        imageLink: "",
        paypal_id: "",
        errors: {}
     
    }; 
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit(e){
        e.preventDefault();

        //Getting the current user id to grab the id

        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const pid = user.id;
        const pfullName = user.fullName;
        
        //Image Processing Part
        let file = this.fileInput.current.files[0];
        let newFileName = this.fileInput.current.files[0].name.replace(/\..+$/, "");

        const config = {
            bucketName: "boockeroo",
            region: "ap-southeast-1",
            accessKeyId: "AKIAYLAR4JVON2662ONV",
            secretAccessKey: "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",
        };
        const ReactS3Client = new S3(config);
        ReactS3Client.uploadFile(file, newFileName).then((data) => {
        console.log(data);
        if (data.status === 204) {
            console.log("Image Uploaded");
        } else {
            alert("Image failed to upload");
        }
        });

        //The New Book Object
        const newBook = {
            title: this.state.title,
            author : this.state.author,
            pageCount : this.state.pageCount,
            condition : this.state.condition,
            genre: this.state.genre,
            price: this.state.price,
            storeOwnerID: pid,
            isbn: this.state.isbn,
            storeOwnerName: pfullName,
            paypal_id: this.state.paypal_id,
            imageLink: "https://boockeroo.s3.ap-southeast-1.amazonaws.com/" + newFileName + ".jpeg"
        }

        this.props.createNewBook(newBook, this.props.history);
    }
    render() {
        //To verify the existing username
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        const username = user.fullName;
        const id = user.id;
        const email = user.username;

        return (
            <>
            <UserHeader username={username}/>
            <div className="Person">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Add Books</h5>
                        <hr />
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg " 
                                placeholder="Book Name" 
                                name="title"
                                value= {this.state.title}
                                onChange = {this.onChange}
                                required
                                />
                                
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="ISBN Code"
                                name="isbn"
                                value= {this.state.isbn}
                                onChange = {this.onChange}
                                required
                                    />
                            </div>
                        

                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Price"
                                name="price"
                                value= {this.state.price}
                                onChange = {this.onChange}
                                required
                                    /><br></br>
                            </div>

                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Author"
                                name="author"
                                value= {this.state.author}
                                onChange = {this.onChange}
                                required
                                    />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Page Counts"
                                name="pageCount"
                                value= {this.state.pageCount}
                                onChange = {this.onChange}
                                required
                            />
                            </div><br></br>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Condition"
                                name="condition"
                                value= {this.state.condition}
                                onChange = {this.onChange}
                                required
                                    />
                            </div><br></br>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Genre"
                                name="genre"
                                value= {this.state.genre}
                                onChange = {this.onChange}
                                required
                                    />
                            </div><br></br>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Paypal Merchant Email"
                                name="paypal_id"
                                value= {this.state.paypal_id}
                                onChange = {this.onChange}
                                required
                                    />
                            </div><br></br>
                            <div className="form-group">
                                <input type="file" className="form-control form-control-lg" 
                                // name="imageLink"
                                // value= {this.state.imageLink}
                                // onChange = {this.onChange}
                                ref={this.fileInput}
                                required
                                    />
                            </div><br></br>
                            <p>Publishing as <strong>#ID: </strong>{user.id}, <strong>Owner: </strong>{user.fullName}</p>  
                            <input type="submit" className="btn btn-primary btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
        )
    }
}
AddBooks.propTypes = {
    createNewBook: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};
 
const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { createNewBook }
)(AddBooks);
