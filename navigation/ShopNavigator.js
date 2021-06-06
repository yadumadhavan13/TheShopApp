import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import Colors from "../constants/Colors";
import ProductOverViewScreen from "../screens/shop/ProductOverViewScreen";

const ShopStack = createStackNavigator();

export const ShopNavigator = () => {
  return (
    <ShopStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
        },
        headerTintColor:
          Platform.OS === "android" ? "white" : colors.primaryColor,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <ShopStack.Screen
        name="Product"
        component={ProductOverViewScreen}
        options={({ navigation }) => ({
          title: "All Products",
        })}
      ></ShopStack.Screen>
    </ShopStack.Navigator>
  );
};
