import axios from "axios";
import { GET_ERRORS, GET_PERSONS, GET_PERSON } from "./types";

//Add Books
export const createNewOrder = (newOrder, history) => async dispatch => {
  try {
    
    await axios.post("http://localhost:8082/api/order/addOrder", newOrder);

    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });

    console.log(err);
  }
};