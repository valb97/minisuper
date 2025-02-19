import { useLocalSearchParams } from "expo-router";
import { View, Text, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Product } from "@/constants/types";
import { stockProducts } from "@/constants/stockProducts";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react-native";

const images = {
  arrozDosHermanos: require('../../assets/items/arrozDosHermanos.png'),
  cocaCola: require('../../assets/items/cocaCola.png'),
  Fanta: require('../../assets/items/Fanta.png'),
  Gallo: require('../../assets/items/Gallo.png'),
  luchetti: require('../../assets/items/luchetti.png'),
  marolio: require('../../assets/items/marolio.png'),
  molto: require('../../assets/items/molto.png'),
};

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const filteredProduct = stockProducts.find((prod) => prod.id.toString() === id);
      setProduct(filteredProduct);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  function handleNumber(action: string) {
    if (action === "add" && inputValue < product?.stock) {
      setInputValue(inputValue + 1);
    } else if (action === "minus" && inputValue > 0) {
      setInputValue(inputValue - 1);
    }
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.itemCard}>
        <Text style={styles.productName}>{product?.name}</Text>
        <Text style={styles.productPrice}>Price: ${product?.price}</Text>
        <Image
          source={images[product?.image.split(".").slice(0, -1).join(".")] || images.arrozDosHermanos}
          style={styles.productImage}
        />
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

        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.buttonText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
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
