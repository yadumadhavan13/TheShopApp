import React from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useSelector } from "react-redux";

const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text>
          Total: <Text>$19.99</Text>
          <Button title="Order Now"></Button>
        </Text>
      </View>
      <View>
        <Text>Cart Items</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({ screen: {}, summary: {} });

export default CartScreen;
