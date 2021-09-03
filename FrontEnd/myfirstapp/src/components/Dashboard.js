import React, { Component } from 'react'
import jwtDecode from 'jwt-decode';
import Person from './Persons/Person'
import CreatePersonButton from './Persons/CreatePersonButton';




class Dashboard extends Component {

    render() {

        //Logic to get the current user
        const jwt = localStorage.getItem("jwtToken");
        const user = jwtDecode(jwt);
        console.log(user.fullName);
        console.log(user.id);
        console.log(user);
        

        return (
            <div className="Persons">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <p>Hi {user.fullName}</p>
                        <p>Welcome to Boockeroo!</p>
                        <p>Your username is: {user.username} </p>
                        <p>You are our: #{user.id} user</p>
                        <br />
                       <CreatePersonButton />
                        <br />
                        <hr />
                        <Person/>
                    </div>
                </div>
            </div>
        </div>
    
        )
    }
}
export default Dashboard;
