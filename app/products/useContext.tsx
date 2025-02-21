import { createContext, ReactNode, useContext, useState } from "react";

interface CartItem {
  id : number,
  quantity : number
}

interface CartContextType {
  cartItems: Array<CartItem>;
  addToCart: (productId: number,quantity : number,currentStock : number) => void;
  removeFromCart: (productId: number) => void;
}



const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => { // children, lowercase c
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (productId: number,quantity : number,curretnStock : number) => {
    
    const isItemInCard = cartItems.find((cartItem) => cartItem.id === productId);

    const cartI :  CartItem = {
      id : productId,
      quantity : quantity,
    }

    if(isItemInCard && quantity <= curretnStock){
      setCartItems(
        cartItems.map((cartItem) => cartItem.id === productId ? {...cartItem, quantity : cartItem.quantity+quantity}
      : cartItem )
    )} else {
        setCartItems([...cartItems, cartI]);
    }
  }

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter((p) => p.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children} 
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);