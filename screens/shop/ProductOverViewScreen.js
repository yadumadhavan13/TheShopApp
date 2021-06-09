import React from "react";
import { FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/Cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/HeaderButton";

const ProductOverViewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const { navigation } = props;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.os === "android" ? "md-cart" : "ios-cart"}
            onPress={() => {}}
          ></Item>
        </HeaderButtons>
      ),
    });
  }, []);
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          title={item.title}
          price={item.price}
          image={item.imageUrl}
          onViewDetail={() => {
            props.navigation.navigate("ProductDetail", { productId: item.id });
          }}
          onAddToCart={() => {
            dispatch(cartActions.addToCart(item));
          }}
        ></ProductItem>
      )}
    ></FlatList>
  );
};

export default ProductOverViewScreen;
