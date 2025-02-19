import { View, Text, ScrollView, Button, Image, Pressable, TouchableOpacity } from "react-native";
import Filter from "@/components/filterComponent";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Product } from "@/constants/types";
import { stockProducts } from "@/constants/stockProducts";



// Importar las imágenes directamente
const images = {
  arrozDosHermanos: require('../../assets/items/arrozDosHermanos.png'),
  cocaCola: require('../../assets/items/cocaCola.png'),
  Fanta: require('../../assets/items/Fanta.png'),
  Gallo: require('../../assets/items/Gallo.png'),
  luchetti: require('../../assets/items/luchetti.png'),
  marolio: require('../../assets/items/marolio.png'),
  molto: require('../../assets/items/molto.png'),
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>(stockProducts);
  const [filtered, setFilteredProducts] = useState<Product[]>(stockProducts);
  const [filter, setFilter] = useState<String>('');
  const router = useRouter();
  function handleFilter(localFilter: string) {
    setFilter(localFilter);
    if (localFilter.trim() !== "") {
      setFilteredProducts(
        stockProducts.filter(
          (prod) => prod.name.toLowerCase().includes(localFilter.toLowerCase()) // Usar includes en vez de match
        )
      );
    } else {
      setFilteredProducts(stockProducts); // Si no hay filtro, mostrar todos los productos
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Filter handleFilter={handleFilter} />
      </View>
      <ScrollView contentContainerStyle={styles.productsContainer}>
        {filtered.length > 0 ?
          filtered.map((product, index) => (
            <TouchableOpacity  key={index} style={styles.itemCard}
            onPress={() => router.push(`/products/${product.id}`)}
            >
              <Image
                source={images[product.image.split('.').slice(0, -1).join('.')] || images.arrozDosHermanos} // Utiliza require para cargar imágenes locales
                style={styles.productImage} // Agrega el estilo de imagen
              />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productCategory}>{product.category}</Text>
              <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
              <Pressable style={styles.pressable}>
                <Text style={styles.pressableText}> Add to cart </Text>
              </Pressable>
            </TouchableOpacity >
          )) : <Text style={styles.noProducts}>
            No products available that match the filter
            </Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pressableText:{
    fontWeight:'600',
    color:'#11171A'
  },
  pressable:{
    backgroundColor:'#D9F9E2',
    paddingHorizontal:20,
    paddingVertical: 5,
    borderRadius:5
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
  noProducts:{
    fontSize:30,
    fontWeight:500,
    margin:'auto'
  }
});
