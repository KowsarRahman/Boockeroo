import axios from "axios";
import { GET_ERRORS, GET_PERSONS, GET_PERSON } from "./types";

//Add Books
export const createNewOrder = (newOrder, history) => async dispatch => {
  try {
    
    await axios.post(`${process.env.REACT_APP_ORDER_BASE_URL}api/order/addOrder`, newOrder);

    history.push("/orders");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });

    console.log(err);
  }
};

export const markAsShipped = (shipped, history) => async dispatch => {
  try {
    
    await axios.put(`${process.env.REACT_APP_ORDER_BASE_URL}api/order/updateOrder`, shipped);

    history.push("/orders");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });

    console.log(err);
  }
};

export const issuedRefund = (refunded, history) => async dispatch => {
  try {
    
    await axios.put(`${process.env.REACT_APP_ORDER_BASE_URL}api/order/updateOrder`, refunded);

    history.push("/orders");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });

    console.log(err);
  }
};