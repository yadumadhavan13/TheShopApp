import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ProductStackNavigator } from "./ShopNavigator";

function AppStackNavigator() {
  return (
    <NavigationContainer>
      <ProductStackNavigator></ProductStackNavigator>
    </NavigationContainer>
  );
}

export default AppStackNavigator;
