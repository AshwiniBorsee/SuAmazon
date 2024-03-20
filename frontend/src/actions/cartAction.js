import axios from "axios"
import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

export const addToCart = (item_id, quantity = 1) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${item_id}`);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            seller: data.product.brand.name,
            price: data.product.price,
            cuttedPrice: data.product.cuttedPrice,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
        },
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const storeShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem('shippingInfo', JSON.stringify(data));
}


export const clearCart = () => async (dispatch, getState) => {

    dispatch({ type: EMPTY_CART });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const deleteItemsFromCart = (item_id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_FROM_CART,
        payload: item_id,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

