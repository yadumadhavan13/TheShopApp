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
  const editProductHandler = (id) => {
    props.navigation.navigate("EditProduct", { productId: id });
  };
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
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Create"
            iconName={Platform.os === "android" ? "md-create" : "ios-create"}
            onPress={() => {
              props.navigation.navigate("EditProduct", { productId: "" });
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
          onSelect={() => {
            editProductHandler(item.id);
          }}
        >
          <Button
            color={Colors.main.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(item.id);
            }}
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
