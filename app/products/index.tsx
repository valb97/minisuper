import { View, Text, ScrollView,TouchableOpacity,RefreshControl } from "react-native";
import Filter from "@/components/filterComponent";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Product } from "@/constants/types";
import { useCart } from "./useContext";
import { Image } from "expo-image";

export default function Products() {
  const { addToCart, removeFromCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFilteredProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<String>('');
  const [load,setLoad] = useState(false);
  
  let apiUrl;

  if (typeof window !== 'undefined' && window.navigator && window.navigator.userAgent) {
    // Detectar si es Web
    apiUrl = 'http://localhost:3000/products';
  } else {
    // Detectar si es Android
    apiUrl = 'http://10.0.2.2:3000/products';
  }

  async function getData() {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.log("❌ Error:", error.message);
    }
  }


  const router = useRouter();
  function handleFilter(localFilter: string) {
    setFilter(localFilter);
    if (localFilter.trim() !== "") {
      setFilteredProducts(
        products.filter(
          (prod) => prod.name.toLowerCase().includes(localFilter.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }

  const ADD = 1;

  function handleAddToCart(productId: number, currentStock: number) {
    addToCart(productId, ADD, currentStock);
    console.log('added')
  }

  useEffect(
    () => {
      getData();
    }, []
  )

  const onRefresh = React.useCallback(
    () => {
      setLoad(true)
      setTimeout(
        () => {
          getData();
          setLoad(false);
        },1000
      )
    },[]
  )

  const Item = ({product,index} : {product : Product, index : number}) =>{
    return(
      <TouchableOpacity key={index} style={styles.itemCard}
      onPress={() => router.push(`/products/${product.id}`)}
    >
      <Image
    source={{ uri: `${product.image}` }}
        style={styles.productImage} // Agrega el estilo de imagen
        transition={1000}
      />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productCategory}>{product.category}</Text>
      <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.pressable}
        onPress={() => handleAddToCart(product.id, product.stock)}
      >
        <Text style={styles.pressableText}> Add to cart </Text>
      </TouchableOpacity>
    </TouchableOpacity >
    )
  }


  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Filter handleFilter={handleFilter} />
      </View>
        <ScrollView contentContainerStyle={styles.productsContainer}
        refreshControl={
          <RefreshControl refreshing={load} onRefresh={onRefresh}/>
        }
        >
        {filtered.length > 0 ?
          filtered.map((product, index) => (
           <Item product={product} index={index}/>
          )) : <Text style={styles.noProducts}>
            No products available that match the filter
          </Text>}
      </ScrollView> 
    </View>
  );
}

const styles = StyleSheet.create({
  pressableText: {
    fontWeight: '600',
    color: '#11171A'
  },
  pressable: {
    backgroundColor: '#D9F9E2',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5
  },
  itemCard: {
    padding: 15,
    backgroundColor: 'white',
    width: '48%',
    minHeight: 250,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  filterContainer: {
    height: '10%',
  },
  productImage: {
    width: 120,
    height: 120,
    marginBottom: 15,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#3a3a3a',
  },
  noProducts: {
    fontSize: 30,
    fontWeight: 500,
    margin: 'auto'
  }
});
