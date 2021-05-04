import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from "./navigation/AppNavigation";



export default function App() {
  return (
    <NavigationContainer>

      <SafeAreaView>
        <StatusBar barStyle={'dark-content'} />
      </SafeAreaView>

      <AppNavigation />
    </NavigationContainer>
  );
}