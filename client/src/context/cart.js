import { useState, useEffect, useContext, createContext, Children } from "react";




const CartContext = createContext();
const SearchProvider = ({ Children }) => {
    const [cart, setCart] = useState([])


    useEffect(() => {
        let existingCartItem = localStorage.getItem('cart')
        if (existingCartItem) setCart(JSON.parse(existingCartItem))
    }, [])


    // eslint-disable-next-line

    return (
        <CartContext.Provider value={[cart, setCart]}>

            {Children}
        </CartContext.Provider>

    )
}
//custom hook 
const useCart = () => useContext(CartContext)

export { useCart, CartProvider }