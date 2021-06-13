import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import CartItem from "./CartItem";
import Color from "../../theme/Colors";
import Fonts from "../../theme/Fonts";
import * as moment from "moment";

const OrderItem = (props) => {
  return (
    <View style={styles.orderItem}>
      <View style={styles.orderSummary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button color={Color.main.primary} title="Show Details"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  orderSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    margin: 15,
  },
  totalAmount: {
    fontFamily: Fonts.heading,
    fontSize: 16,
  },
  date: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: "#888",
  },
});

export default OrderItem;
