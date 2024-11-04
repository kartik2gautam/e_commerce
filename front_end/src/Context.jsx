import React, { createContext, useContext, useReducer } from 'react'
import { cartreducer } from './Reducer'

const Cart = createContext()
export const Context = ({children}) => {
    const [state, dispatch]= useReducer(cartreducer,{
        products: products,
        cart:[]

    })
  return <CartProvider value = {{state,dispatch}}>{children}</CartProvider>
}
export const CartState=()=>{
    return useContext(Cart)
}