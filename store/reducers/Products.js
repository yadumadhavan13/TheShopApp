import PRODUCTS from "../../data/DummyData";

const intitialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = intitialState, action) => {
  return state;
};
