import React from "react";
import { Button, FlatList } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/HeaderButton";
import { Platform } from "react-native";
import Colors from "../../theme/Colors";
import * as productActions from "../../store/actions/Products";

const UserProductScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
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
  const userProducts = useSelector((state) => state.products.userProducts);
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => {}}
        >
          <Button
            color={Colors.main.primary}
            title="Edit"
            onPress={() => {}}
          ></Button>
          <Button
            color={Colors.main.primary}
            title="Delete"
            onPress={() => {
              dispatch(productActions.deleteProduct(item.id));
            }}
          ></Button>
        </ProductItem>
      )}
    ></FlatList>
  );
};

export default UserProductScreen;
