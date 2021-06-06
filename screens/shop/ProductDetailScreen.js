import React from "react";
import { Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const ProductDetailScreen = (props) => {
  const { productId } = props.route.params;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((item) => item.id === productId)
  );
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: selectedProduct.title,
    });
  }, []);
  return <Text>{selectedProduct.title}</Text>;
};

const syyles = StyleSheet.create({});

export default ProductDetailScreen;
