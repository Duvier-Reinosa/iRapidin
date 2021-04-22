import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import Products from "../screens/products/Products";
import AddProduct from "../screens/products/AddProduct";

const Stack = createStackNavigator();

export default function ProductsStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name = "products"
                component = {Products}
                options = { {title : "Mis productos"}}
            />
            <Stack.Screen
                name = "addProduct"
                component = {AddProduct}
                options = {{ title : "Añadir producto"}}
            />
        </Stack.Navigator>
    )
}