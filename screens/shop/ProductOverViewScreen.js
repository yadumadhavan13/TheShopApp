import React, { useEffect } from "react";
import { Button, FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/Cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/HeaderButton";
import Colors from "../../theme/Colors";
import * as productActions from "../../store/actions/Products";

const ProductOverViewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.fetchProducts());
  }, [dispatch]);

  const selectItemHandler = (id) => {
    props.navigation.navigate("ProductDetail", { productId: id });
  };
  const { navigation } = props;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.os === "android" ? "md-cart" : "ios-cart"}
            onPress={() => {
              props.navigation.navigate("Cart");
            }}
          ></Item>
        </HeaderButtons>
      ),
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
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          title={item.title}
          price={item.price}
          image={item.imageUrl}
          onSelect={() => {
            selectItemHandler(item.id);
          }}
        >
          <Button
            color={Colors.main.primary}
            title="View details"
            onPress={() => {
              selectItemHandler(item.id);
            }}
          ></Button>
          <Button
            color={Colors.main.primary}
            title="Add to cart"
            onPress={() => {
              dispatch(cartActions.addToCart(item));
            }}
          ></Button>
        </ProductItem>
      )}
    ></FlatList>
  );
};

export default ProductOverViewScreen;
