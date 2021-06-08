import React from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/Cart";

const ProductOverViewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
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
