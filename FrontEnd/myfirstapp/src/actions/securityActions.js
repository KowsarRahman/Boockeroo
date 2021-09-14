import axios from "axios";
import {GET_ERRORS, SET_CURRENT_USER} from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";


export const createNewUser = (newUser, history) => async dispatch => {

    try{

        await axios.post("http://localhost:8080/api/users/register", newUser);
        //Variables that get captured
        const { username } = newUser; //username
        const { fullName } = newUser; //fullName
        const { role } = newUser; //role
        //set to local storage
        localStorage.setItem("username", username);
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("role", role);
        history.push("/welcome");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }
    catch (err){
        dispatch ({
            type: GET_ERRORS,
            payload: err.response.data
        });



    }

};

export const login = LoginRequest => async dispatch => {
    try {
      // post => Login Request
      const res = await axios.post("http://localhost:8080/api/users/login", LoginRequest);
      // extract token from res.data
      const { token } = res.data;
      //extract data
      const { success } = res.data;
      // store the token in the localStorage
      localStorage.setItem("jwtToken", token);
      // set our token in header ***
      setJWTToken(token);
      // decode token on React
      const decoded = jwt_decode(token);
      // dispatch to our securityReducer
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  };
  
  export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    localStorage.clear(); //removes all the item 
    setJWTToken(false);
    dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    });
  };
  