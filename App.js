import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/Products";
import cartReducer from "./store/reducers/Cart";
import Navigation from "./navigation/AppNavigator";
import {
  useFonts as useOpenSansRegular,
  OpenSans_400Regular,
} from "@expo-google-fonts/open-sans";
import {
  useFonts as useOpenSansBold,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";
//import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
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
      <Navigation></Navigation>
    </Provider>
  );
}
