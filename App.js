import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/Products";
import cartReducer from "./store/reducers/Cart";
import orderReducer from "./store/reducers/Orders";
import {
  useFonts as useOpenSansRegular,
  OpenSans_400Regular,
} from "@expo-google-fonts/open-sans";
import {
  useFonts as useOpenSansBold,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";
import { ShopDrawerNavigator } from "./navigation/ShopNavigator";
//import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
});

//const store = createStore(rootReducer, composeWithDevTools());

const store = createStore(rootReducer);

export default function App() {
  const [openSansRegularLoaded] = useOpenSansRegular({
    OpenSans_700Bold,
  });

  const [openSansBoldLoaded] = useOpenSansBold({
    OpenSans_400Regular,
  });

  if (!openSansRegularLoaded || !openSansBoldLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <ShopDrawerNavigator></ShopDrawerNavigator>
    </Provider>
  );
}
