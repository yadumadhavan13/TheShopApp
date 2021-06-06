import React from "react";
import { FlatList, View, Text } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";

const ProductOverViewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
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
            console.log("view details pressed");
          }}
          onAddToCart={() => {}}
        ></ProductItem>
      )}
    ></FlatList>
  );
};

export default ProductOverViewScreen;
