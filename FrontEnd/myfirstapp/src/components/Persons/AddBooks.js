import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {createPerson} from "../../actions/personActions";
import jwtDecode from 'jwt-decode';

import UserHeader from '../Layout/UserHeader';
class AddBooks extends Component {
    constructor(){
        super();

        this.state= {
        name: "",
        personIdentifier: "",
        desc: "",
        start_date: "",
        end_date: ""
     
    }; 
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
        }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        const newPerson = {
            name: this.state.name,
            personIdentifier: this.state.personIdentifier,
            desc: this.state.desc,
            start_date:this.state.start_date,
            end_date: this.state.end_date  
        }

        this.props.createPerson(newPerson, this.props.history);
    }
    render() {

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
                                name="name"
                                value= {this.state.name}
                                onChange = {this.onChange}
                                />
                                
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="ISBN Code"
                                name="personIdentifier"
                                value= {this.state.personIdentifier}
                                onChange = {this.onChange}
                                    />
                            </div>
                          
                            <div className="form-group">
                                <textarea className="form-control form-control-lg" 
                                placeholder="Book Description"
                                name = "desc"
                                value= {this.state.desc}
                                onChange = {this.onChange}
                                /><br></br>

                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Price"
                                name="personIdentifier"
                                value= {this.state.personIdentifier}
                                onChange = {this.onChange}
                                    /><br></br>
                            
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Author"
                                name="personIdentifier"
                                value= {this.state.personIdentifier}
                                onChange = {this.onChange}
                                    />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" 
                                placeholder="Page Counts"
                                name="personIdentifier"
                                value= {this.state.personIdentifier}
                                onChange = {this.onChange}
                                    />
                            </div><br></br>


                            </div>   

                            </div>
                            <h6>Published Date</h6>
                            <div className="form-group">
                                <input type="date" className="form-control form-control-lg" 
                                name="start_date"
                                value= {this.state.start_date}
                                onChange = {this.onChange}
                                />
                            </div>
                            <h6>Estimated End Date</h6>
                            <div className="form-group">
                                <input type="date" className="form-control form-control-lg" 
                                name="end_date" 
                                value= {this.state.end_date}
                                onChange = {this.onChange}
                                />
                            </div>
    
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
    createProject: PropTypes.func.isRequired
  };
  
  export default connect(
    null,
    { createPerson }
  )(AddBooks);
