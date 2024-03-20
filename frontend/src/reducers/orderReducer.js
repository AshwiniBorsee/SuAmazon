import { CLEAR_ERRORS, PAYMENT_STATUS_REQUEST, PAYMENT_STATUS_SUCCESS, PAYMENT_STATUS_FAIL } from "../constants/orderConstants";

export const paymentStatusReducer = (state = { txn: {} }, { type, payload }) => {
    switch (type) {
        case PAYMENT_STATUS_REQUEST:
            return {
                loading: true,
            };
        case PAYMENT_STATUS_SUCCESS:
            return {
                loading: false,
                txn: payload,
            };
        case PAYMENT_STATUS_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
