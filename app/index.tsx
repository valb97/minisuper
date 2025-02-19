import { Link } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet,Pressable } from "react-native";
import { Image } from "react-native";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>MiniSuper</Text>
        <Image
          style={styles.logo}
          source={require('../assets/images/trolley.png')}
        />
      </View>
      <Link href="/products">
        <View
          style={[styles.touchable, isHovered && styles.touchableHover]}
        >
          <Text style={styles.buttonText}>Start Now!</Text>
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
    padding: 24,
    backgroundColor: 'white',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20, // Separar título de la imagen
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold', // Usar 'bold' para un título más destacado
    textAlign: 'center',
    marginBottom: 100, // Separar título de la imagen
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 30, // Separar la imagen del botón
  },
  touchable: {
    width: 300,
    height: 50,
    backgroundColor: '#72E5A1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableHover: {
    backgroundColor: '#4A9F6A', // Color al hacer hover
  },
  buttonText: {
    fontWeight: '500',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  }
});
