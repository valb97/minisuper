import { View, Image, StyleSheet,Text, TouchableOpacity } from 'react-native';
import { ShoppingCart,Settings2 } from 'lucide-react-native';



export default function Header(){
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity>
                <Settings2 size={30} color="black"/>
            </TouchableOpacity>
            <Text style={styles.title}> SuperMini </Text>
            <TouchableOpacity>
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







