import Filter from '@/components/filterComponent';
import Header from '@/components/Header';
import { Slot } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { CartProvider } from './useContext';


const Layout = ({ children }: { children: React.ReactNode }) => {
  console.log(children);
  return (
    <CartProvider>
    <View style={{ flex: 1 }}>
      <>
      <Header />
      </>
      <Slot />
    </View>
    </CartProvider>
  );
};

export default Layout;