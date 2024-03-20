import axios from "axios";
import { CLEAR_ERRORS,  PAYMENT_STATUS_FAIL, PAYMENT_STATUS_REQUEST, PAYMENT_STATUS_SUCCESS } from "../constants/orderConstants";


// Get Payment Status
export const getPaymentStatus = (id) => async (dispatch) => {
    try {
        dispatch({ type: PAYMENT_STATUS_REQUEST });

        const { data } = await axios.get(`/api/v1/payment/status/${id}`);

        dispatch({
            type: PAYMENT_STATUS_SUCCESS,
            payload: data.txn,
        })

    } catch (error) {
        dispatch({
            type: PAYMENT_STATUS_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const paymentSuccess = (paymentInfo) => ({
    type: PAYMENT_STATUS_SUCCESS,
    payload: paymentInfo,
  });

// Clear All Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}