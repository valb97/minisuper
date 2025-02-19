import Filter from '@/components/filterComponent';
import Header from '@/components/Header';
import { Slot } from 'expo-router';
import React from 'react';
import { View } from 'react-native';


const Layout = ({ children }: { children: React.ReactNode }) => {
  console.log(children);
  return (
    <View style={{ flex: 1 }}>
      <>
      <Header />
      </>
      <Slot />
    </View>
  );
};

export default Layout;