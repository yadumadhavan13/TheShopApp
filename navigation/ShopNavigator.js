import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import ProductOverViewScreen from "../screens/shop/ProductOverViewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import Fonts from "../theme/fonts";
import Colors from "../theme/Colors";

const ShopStack = createStackNavigator();

export const ShopNavigator = () => {
  return (
    <ShopStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.main.primary : "",
        },
        headerTintColor:
          Platform.OS === "android" ? "white" : Colors.main.primary,
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: Fonts.heading,
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
      <ShopStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ navigation }) => ({
          title: "Product Detail",
        })}
      ></ShopStack.Screen>
    </ShopStack.Navigator>
  );
};
