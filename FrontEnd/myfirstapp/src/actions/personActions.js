import axios from "axios";
import { GET_ERRORS, GET_PERSONS, GET_PERSON } from "./types";

//Register Information 
export const createPerson = (person, history) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8080/api/person", person);

    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

//Get All Information 
export const getPersons = () => async dispatch => {
  const res = await axios.get("/api/person/all");
  dispatch({
    type: GET_PERSONS,
    payload: res.data
  });
};

//Get the User Information 
export const getPerson = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:8080/api/users/getUsers/${id}`);

    //Getting the user information 
    const { phone_number } = res.data;
    const { address_business } = res.data;
    const { abn } = res.data;
    const { role } = res.data;
    localStorage.setItem("address_business", address_business);
    localStorage.setItem("abn", abn);
    localStorage.setItem("urole", role);
    localStorage.setItem("phone_number", phone_number);
    history.push("/dashboard");
    dispatch({
      type: GET_PERSON,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

