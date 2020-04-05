import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./Screens/Home";
import CameraScreen from "./Screens/CameraScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} 
        options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#429e9d',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color:"#fff"
          },
          
        }}
        />
        <Stack.Screen name="CameraScreen" component={CameraScreen} 
        options={{
          title: 'CameraScreen',
          headerStyle: {
            backgroundColor: '#429e9d',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color:"#fff"
          },
          headerShown: false
        }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

