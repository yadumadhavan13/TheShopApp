import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ShopNavigator } from "./ShopNavigator";

function AppNavigator() {
  return (
    <NavigationContainer>
      <ShopNavigator></ShopNavigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
