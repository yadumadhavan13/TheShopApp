import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import Fonts from "../../theme/Fonts";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/HeaderButton";
import { Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/Products";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const { productId } = props.route.params;
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setOptions({
      title: productId ? "Edit product" : "Add product",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.os === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={submitHandler}
          ></Item>
        </HeaderButtons>
      ),
    });
  }),
    [formState];

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const submitHandler = useCallback(() => {
    console.log("title       :" + formState.inputValues.title);
    console.log("imageurl    :" + formState.inputValues.imageUrl);
    console.log("price       :" + formState.inputValues.price);
    console.log("description :" + formState.inputValues.description);
    console.log("<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>");
    if (!formState.formIsValid) {
      Alert.alert("Wrong input", "Please check the errors", [
        { text: "Ok", style: "default" },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        productActions.updateProduct(
          productId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        productActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, productId, formState]);

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier,
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={textChangeHandler.bind(this, "title")}
            keyboardAppearance="default"
            autoCapitalize="sentences"
          ></TextInput>
          {!formState.inputValidities.title && (
            <Text>Please enter a valid title!</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={textChangeHandler.bind(this, "imageUrl")}
          ></TextInput>
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={textChangeHandler.bind(this, "price")}
              keyboardType="decimal-pad"
            ></TextInput>
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={textChangeHandler.bind(this, "description")}
          ></TextInput>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: Fonts.heading,
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
