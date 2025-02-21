import { View, Image, StyleSheet,Text, TouchableOpacity } from 'react-native';
import { ShoppingCart,Settings2, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';



export default function Header(){
    const router = useRouter();
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity>
                <Settings2 size={30} color="black"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/products")}>
            <Text style={styles.title}> SuperMini </Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => router.push("/products/cart")}>
                <ShoppingCart size={30} color="black"/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
      backgroundColor: '#72E5A1', // Color de fondo del encabezado
      paddingVertical: 20, // Espacio vertical alrededor del logo
      alignItems: 'center', // Centrar el logo horizontalmente,
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around'
    },title:{
        fontSize:30,
        fontWeight:'bold',
        color:'#11171A'
    }
  });







