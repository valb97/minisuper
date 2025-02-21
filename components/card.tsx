import { View,Text, Pressable } from "react-native";

export default function Card(){
    return(
        <View>
        <Text> Price: $400</Text>
        <Text>Quantity: 10</Text>
        <Pressable>
            <Text>Eliminar Producto </Text>
        </Pressable>
    </View>
    )
}