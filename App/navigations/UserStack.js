import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/acount/Login";
import Register from "../screens/acount/Register";
import UserGuest from "../screens/acount/UserGuest";
import { NavigationContainer } from "@react-navigation/native";

import User from "../screens/acount/User"

const Stack = createStackNavigator();

export default function UserStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name = "user"
                component = {User}
                options = { {title : "My rapidín"}}
            />
        </Stack.Navigator>
    )
}