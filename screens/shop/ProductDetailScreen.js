import React from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Image,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";

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
  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{ uri: selectedProduct.imageUrl }}
      ></Image>
      <View style={styles.actions}>
        <Button
          color={Colors.primaryColor}
          title="Add to cart"
          onPress={() => {}}
        ></Button>
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: { width: "100%", height: 300 },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  description: { fontSize: 14, textAlign: "center", marginHorizontal: 20 },
  actions: { marginVertical: 10, alignItems: "center" },
});

export default ProductDetailScreen;
