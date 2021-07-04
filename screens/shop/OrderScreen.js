import React, { useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/HeaderButton";
import { Platform } from "react-native";
import OrderItem from "../../components/shop/OrderItem";
import * as orderActions from "../../store/actions/Orders";
import Colors from "../../theme/Colors";

const OrderScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { navigation } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(orderActions.fetchOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.os === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navigation.openDrawer();
            }}
          ></Item>
        </HeaderButtons>
      ),
    });
  }, []);
  const orders = useSelector((state) => state.order.orders);
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          color={Colors.ui.primary}
        ></ActivityIndicator>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <OrderItem
              amount={item.totalAmount}
              date={item.readableDate}
              items={item.item}
            ></OrderItem>
          );
        }}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OrderScreen;
