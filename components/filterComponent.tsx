import { Search } from "lucide-react-native";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { StyleSheet } from "react-native";

interface FilterProps{
    handleFilter : (filter : string) => void,
  }


export default function Filter({handleFilter} : FilterProps){
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (text: string) => {
        setInputValue(text); 
        handleFilter(text);  
      };

    return(
        <View style={styles.container}>
            <View style={styles.searchBoxContainer}>
                <Search size={20} color={"black"} style={styles.searchIcon}/>
                <TextInput placeholder="Filter products by name" style={styles.textInput}
                onChangeText={(event) => handleInputChange(event)}
                value={inputValue}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        width:'100%',
        zIndex:9999,
    },
    textInput : {
        fontSize:20,
        width:'100%',
    },
    searchBoxContainer :{
        backgroundColor:'white',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        minHeight:50,
        marginHorizontal:10,
        borderRadius:5,
        marginTop:15
    },searchIcon:{
        marginRight:10,
        marginLeft:10
    }
})