import { createContext, useEffect, useState } from "react";
import {useLocation} from "react-router-dom";
export const Context = createContext();
const AppContext = ({ children }) => {

    const [categories, setCategories] =useState();
    const [products, setProducts] =useState();
    const [cartItems, setCartItems] =useState([]);
    const [cartCount, setCartCount] =useState(0);
    const [cartSubTotal, setCartSubTotal] =useState(0);
    const location = useLocation();

    useEffect (() => {
      window.scrollTo(0,0);
    }, [location])

    useEffect (() => {
        let count =0;
        cartItems.map((item) => (count += item.attributes.quantity));
        setCartCount(count);

        let subTotal = 0;
        cartItems.map(item => subTotal += item.attributes.price * item.attributes.quantity)
        setCartSubTotal(subTotal);
    }, [cartItems])
    const handleAddToCart = (product, quantity, selectedSize) => {
        let items = [...cartItems];
        let  index = items.findIndex(p => p.id === product.id && p.attributes.clsize === selectedSize)
        if(index !== -1) {
            items[index].attributes.quantity += parseInt(quantity);
        }
        else {
            product.attributes.quantity = quantity
            product.attributes.clsize = selectedSize
            items = [...items, product];
        }
              console.log("item", cartItems, items);
              setCartItems(items);
    }
    const handleRemoveFromCart = (product, selectedSize) => {
        let items= [...cartItems];
        items = items.filter((p) => p.id !== product.id &&  selectedSize);
        setCartItems(items);
    }

    const handleCartItemQuantity = (product, newQuantity) => {
      let items = [...cartItems];
      let index = items.findIndex((p) => p.id === product.id && p.attributes.clsize === product.attributes.clsize);
      if (index !== -1) {
        // If the item exists in the cart, update its quantity
        items[index].attributes.quantity = newQuantity;
      }
      setCartItems(items);
      };

      const handleUpdateSelectedSize = (product, newSize) => {
        // Create a copy of the cart items array to avoid direct mutation
        const updatedCartItems = [...cartItems];
      
        // Find the index of the item in the cart by matching product id
        const index = updatedCartItems.findIndex(
          (p) => p.id === product.id
        );
      
        if (index !== -1) {
          // If the item exists in the cart, update its selectedSize attribute
          updatedCartItems[index].attributes.clsize = newSize;
        }
      
        // Update the cart items in the context
        setCartItems(updatedCartItems);
      };
    return ( 
    <Context.Provider value={{
        categories, 
        setCategories,
        products,
        setProducts,
        cartItems,
        setCartItems,
        cartCount,
        setCartCount,
        cartSubTotal, 
        setCartSubTotal,
        handleAddToCart,
        handleCartItemQuantity,
        handleRemoveFromCart,
        handleUpdateSelectedSize
    }}>
        {children}
        </Context.Provider>
    )
}
export default AppContext;