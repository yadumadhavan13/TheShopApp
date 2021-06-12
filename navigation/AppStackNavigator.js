import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ShopStackNavigator } from "./ShopNavigator";

function AppStackNavigator() {
  return (
    <NavigationContainer>
      <ShopStackNavigator></ShopStackNavigator>
    </NavigationContainer>
  );
}

export default AppStackNavigator;
