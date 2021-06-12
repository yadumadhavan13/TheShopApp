import React from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/HeaderButton";
import { Platform } from "react-native";

const OrderScreen = (props) => {
  const { navigation } = props;
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
  return (
    <View>
      <Text>Order Screen</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <Text>{item.totalAmount}</Text>;
        }}
      ></FlatList>
    </View>
  );
};

export default OrderScreen;
