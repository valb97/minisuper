import { View, Text, Pressable, FlatList } from "react-native";
import { stockProducts } from "@/constants/stockProducts";
import { useState, useEffect } from "react";
import { Product } from "@/constants/types";
import { useCart } from "./useContext";
import { Image } from "expo-image";

interface CartItem {
  id: number;
  quantity: number;
}

export default function Cart() {

  let apiUrl;
  if (typeof window !== 'undefined' && window.navigator && window.navigator.userAgent) {
    // Detectar si es Web
    apiUrl = `http://localhost:3000/filteredProducts`;
  } else {
    // Detectar si es Android
    apiUrl = `http://10.0.2.2:3000/filteredProducts`;
  }

  const { cartItems, removeFromCart } = useCart();
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const getData = async ({ids} : {ids : number[]}) =>{
    // ahora lo que hago es armar un array con los procutos y luego a estos
    if(ids.length>0){
      try{
        const response = await fetch(apiUrl,{
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },body:JSON.stringify({productsId : ids}),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Product[] = await response.json();
        setCartProducts(data);
      }catch(error){
        console.log(error);
      }
  }
  }

  useEffect(() => {
    const cartItemIds = new Set(cartItems.map(item => item.id));
    getData({ ids: Array.from(cartItemIds) });
  }, [cartItems]);

  // Calcular precio total del carrito
  const totalPrice = cartProducts.reduce((total, product) => {
    const cartItem = cartItems.find(item => item.id === product.id);
    return total + (cartItem ? cartItem.quantity * product.price : 0);
  }, 0);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>🛒 Carrito</Text>

      {cartProducts.length === 0 ? (
        <Text>El carrito está vacío.</Text>
      ) : (
        <FlatList
          data={cartProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const cartItem = cartItems.find(ci => ci.id === item.id);
            const itemTotalPrice = cartItem ? cartItem.quantity * item.price : 0;

            return (
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
                borderBottomWidth: 1,
              }}>
                <Image  source={{ uri: `${item.image}` }} style={{ width: 50, height: 50, marginRight: 10 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18 }}>{item.name}</Text>
                  <Text>Precio unitario: ${item.price}</Text>
                  <Text>Cantidad: {cartItem?.quantity || 0}</Text>
                  <Text>Subtotal: ${itemTotalPrice}</Text>
                </View>
                <Pressable onPress={() => removeFromCart(item.id)}>
                  <Text style={{ color: "red", fontWeight: "bold" }}>🗑️ Eliminar</Text>
                </Pressable>
              </View>
            );
          }}
        />
      )}

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Total del carrito: ${totalPrice}</Text>
      </View>
    </View>
  );
}
