import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart') 
? JSON.parse(localStorage.getItem('cart')) 
: {cartItems: [], shippingAddress: {}, paymentMethod: '', itemsPrice: 0, shippingPrice: 0, taxPrice: 0, totalPrice: 0};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find((x) => x.id === item.id);
            if (existingItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x.id === existingItem.id ? item : x
                ); 
            } else {
                state.cartItems.push(item);
            }      
    
            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state);
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            return updateCart(state);
        }
    },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;