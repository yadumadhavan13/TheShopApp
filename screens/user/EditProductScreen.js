import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EditProductScreen = (props) => {
  const { productId } = props.route.params;
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: "Edit product",
    });
  }, []);
  return (
    <View>
      <Text>The Edit Product Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default EditProductScreen;
