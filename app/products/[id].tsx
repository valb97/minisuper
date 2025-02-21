import { useLocalSearchParams } from "expo-router";
import { View, Text, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Product } from "@/constants/types";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react-native";
import { useCart } from "./useContext";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null); // Inicializar como null
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState(0);
  const { addToCart } = useCart();

  const fetchItem = async () => {
    let apiUrl;
    if (typeof window !== 'undefined' && window.navigator && window.navigator.userAgent) {
      // Detectar si es Web
      apiUrl = `http://localhost:3000/products/${id}`;
    } else {
      // Detectar si es Android
      apiUrl = `http://10.0.2.2:3000/products/${id}`;
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchItem();
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <View style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  function handleNumber(action: string) {
    if (action === "add" && inputValue < (product?.stock || 0)) {
      setInputValue(inputValue + 1);
    } else if (action === "minus" && inputValue > 0) {
      setInputValue(inputValue - 1);
    }
  }

  return (
    <View style={styles.mainView}>
      {product && ( // Asegurarse de que el producto existe
        <View style={styles.itemCard}>
          <Text style={styles.productName}>{product?.name}</Text>
          <Text style={styles.productPrice}>Price: ${product?.price}</Text>
          <Image source={{ uri: product?.image }} style={styles.productImage} />
          <Text style={styles.productDescription}>{product?.description}</Text>
          <Text style={styles.productPrice}>Current stock: {product?.stock}</Text>

          {/* Contador de cantidad */}
          <View style={styles.counterContainer}>
            <TouchableOpacity style={styles.counterButton} onPress={() => handleNumber("minus")}>
              <Minus size={20} color={inputValue > 0 ? "black" : "#ccc"} />
            </TouchableOpacity>
            <Text style={styles.counterText}>{inputValue}</Text>
            <TouchableOpacity style={styles.counterButton} onPress={() => handleNumber("add")}>
              <Plus size={20} color={inputValue < product?.stock ? "black" : "#ccc"} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => addToCart(product?.id, 1, product?.stock)}
          >
            <Text style={styles.buttonText}>Agregar al carrito</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  itemCard: {
    padding: 20,
    backgroundColor: "white",
    width: "90%",
    minHeight: 400,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  productImage: {
    width: 120,
    height: 120,
    marginBottom: 15,
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#3a3a3a",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f3f3f3",
    borderRadius: 8,
    width: 120,
    height: 40,
    paddingHorizontal: 10,
  },
  counterButton: {
    padding: 5,
  },
  counterText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addToCartButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#72E5A1",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "500",
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
