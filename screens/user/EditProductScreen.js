import React, { useReducer, useCallback, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/HeaderButton";
import { Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/Products";
import Input from "../../components/ui/Input";

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

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValiditiy) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValiditiy,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      // behavior="padding"
      // keyboardVerticalOffset={10}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="title"
            errorText="Please enter a valid title"
            keyboardType="default"
            autoCapitalize="sentences"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
            required
          ></Input>
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url"
            keyboardType="default"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={!!editedProduct}
            required
          ></Input>
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price"
              keyboardType="decimal-pad"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            ></Input>
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description"
            keyboardType="default"
            autoCapitalize="sentences"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            multiline
            numberOfLines={3}
            required
            minLength={5}
          ></Input>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

export default EditProductScreen;
