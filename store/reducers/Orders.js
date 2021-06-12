import Order from "../../models/Order";
import { ADD_ORDER } from "../actions/Orders";

const initialState = {
  orders: [],
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );
      return { ...state, orders: state.orders.concat(newOrder) };
  }
  return state;
};
