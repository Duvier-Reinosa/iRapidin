import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/acount/Login";
import Register from "../screens/acount/Register";
import UserGuest from "../screens/acount/UserGuest";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function AcountStack(){
  return(
  <NavigationContainer>
    <Stack.Navigator initialRouteName = "userGuest">
      {/* <Stack.Screen
        name = "acount"
        component = {Acount}
        options = { {title : "Cuenta"}}
          /> */}
      <Stack.Screen
        name = "userGuest"
        component = {UserGuest}
        options = { {title : "IRapidín"}}
      />
      <Stack.Screen
        name = "login"
        component = {Login}
        options = { {title : "Iniciar sesión"}}
      />
      <Stack.Screen
        name = "register"
        component = {Register}
        options = { {title : "Regístrate"}}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
