import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/acount/Login";
import Register from "../screens/acount/Register";
import UserGuest from "../screens/acount/UserGuest";

import Orders from "../screens/orders/Orders"

const Stack = createStackNavigator();

export default function OrdersStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name = "orders"
                component = {Orders}
                options = { {title : "Pedidos"}}
            />
        </Stack.Navigator>
    )
}