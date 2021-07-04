import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import Colors from "../../theme/Colors";
import Fonts from "../../theme/Fonts";
import * as cartActions from "../../store/actions/Cart";
import * as orderActions from "../../store/actions/Orders";
import Card from "../../components/ui/Card";

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };
  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          <Text style={styles.amount}>
            ${(Math.round(cartTotalAmount.toFixed(2)) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={Colors.ui.primary}
          ></ActivityIndicator>
        ) : (
          <Button
            color={Colors.main.primary}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          ></Button>
        )}
      </Card>
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId}
          renderItem={({ item }) => {
            return (
              <CartItem
                quantity={item.quantity}
                title={item.productTitle}
                amount={item.sum}
                deletable
                onRemove={() => {
                  dispatch(cartActions.removeFromCart(item.productId));
                }}
              ></CartItem>
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { margin: 20 },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: { fontFamily: Fonts.heading, fontSize: 18 },
  amount: { color: Colors.main.primary },
});

export default CartScreen;
