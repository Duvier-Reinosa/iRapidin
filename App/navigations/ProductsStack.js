import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/acount/Login";
import Register from "../screens/acount/Register";
import UserGuest from "../screens/acount/UserGuest";

import Products from "../screens/products/Products"

const Stack = createStackNavigator();

export default function ProductsStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name = "products"
                component = {Products}
                options = { {title : "Productos"}}
            />
        </Stack.Navigator>
    )
}