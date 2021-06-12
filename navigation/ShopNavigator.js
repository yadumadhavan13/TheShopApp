import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform } from "react-native";
import ProductOverViewScreen from "../screens/shop/ProductOverViewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrderScreen";
import Fonts from "../theme/Fonts";
import Colors from "../theme/Colors";
import { Ionicons } from "@expo/vector-icons";

const DRAWER_ICON = {
  Products: Platform.OS === "android" ? "md-cart" : "ios-cart",
  Order: Platform.OS === "android" ? "md-list" : "ios-list",
};

const createScreenOptions = ({ route }) => {
  const iconName = DRAWER_ICON[route.name];
  return {
    drawerIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

const ProductStack = createStackNavigator();

export const ProductStackNavigator = () => {
  return (
    <ProductStack.Navigator
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
      <ProductStack.Screen
        name="Product"
        component={ProductOverViewScreen}
        options={({ navigation }) => ({
          title: "All Products",
        })}
      ></ProductStack.Screen>
      <ProductStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ navigation }) => ({
          title: "Product Detail",
        })}
      ></ProductStack.Screen>
      <ProductStack.Screen
        name="Cart"
        component={CartScreen}
        options={({ navigation }) => ({
          title: "Cart",
        })}
      ></ProductStack.Screen>
    </ProductStack.Navigator>
  );
};

const OrderStack = createStackNavigator();

export const OrderStackNavigator = () => {
  return (
    <OrderStack.Navigator
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
      <OrderStack.Screen
        name="Order"
        component={OrderScreen}
        options={({ navigation }) => ({
          title: "Orders",
        })}
      ></OrderStack.Screen>
    </OrderStack.Navigator>
  );
};

const ShopDrawer = createDrawerNavigator();

export const ShopDrawerNavigator = () => (
  <NavigationContainer>
    <ShopDrawer.Navigator
      initialRouteName="Products"
      screenOptions={createScreenOptions}
      drawerContentOptions={{
        activeTintColor: Colors.primaryColor,
        itemStyle: { marginVertical: 5 },
        labelStyle: { fontFamily: Fonts.heading },
      }}
    >
      <ShopDrawer.Screen name="Products" component={ProductStackNavigator} />
      <ShopDrawer.Screen name="Order" component={OrderStackNavigator} />
    </ShopDrawer.Navigator>
  </NavigationContainer>
);
