import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import CartItem from "./CartItem";
import Color from "../../theme/Colors";
import Fonts from "../../theme/Fonts";
import Card from "../ui/Card";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.orderSummary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Color.main.primary}
        title={showDetails === true ? "Hide Details" : "Show Details"}
        onPress={() => {
          setShowDetails((previousState) => !previousState);
        }}
      ></Button>
      <View>
        {props.items.map((item) => {
          <CartItem
            quantity={item.quantity}
            amount={item.sum}
            title={item.productTitle}
          ></CartItem>;
        })}
      </View>
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map((item) => {
            return (
              <CartItem
                key={item.productId}
                quantity={item.quantity}
                amount={item.sum}
                title={item.productTitle}
              ></CartItem>
            );
          })}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
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
  detailItems: { width: "100%" },
});

export default OrderItem;
