import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Icon} from "react-native-elements";

import UserStack from "./UserStack";
import OrdersStack from "./OrdersStack";
import ProductsStack from "./ProductsStack";


const Tab = createBottomTabNavigator();

export default function Navigation() {
    return(
        <NavigationContainer>
             <Tab.Navigator
                initialRouteName="orders"
                tabBarOptions={{
                inactiveTintColor: "#646464",
                activeTintColor: "#ff003c",
      }
      }
      screenOptions={({route}) => ({
      tabBarIcon:({color}) => screenOptions(route, color),
      })}
      >
          <Tab.Screen
            name="user"
            component={UserStack}
            options={{
                title: "Perfil"
            }}
          />
          <Tab.Screen
            name="orders"
            component={OrdersStack}
            options={{
                title: "Pedidos"
            }}
          />
          <Tab.Screen
            name="products"
            component={ProductsStack}
            options={{
                title: "Productos"
            }}
          />

      </Tab.Navigator>
            
        </NavigationContainer>
    );
}

function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "user":
      iconName = "account-circle"
      break;
    case "orders":
      iconName = "cart-arrow-up"
      break;
    case "products":
      iconName = "pail-plus"
      break;

    default:

  }

  return(
    <Icon type="material-community" name={iconName} size={22} color={color}/>
  )
}
