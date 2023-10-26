import {
  ADD_ITEM_TO_CART,
  CHANGE_LANGUAGE,
  DECREASE_ITEM_QUANTITY,
  INCREASE_ITEM_QUANTITY,
  REMOVE_ITEM_FROM_CART,
  SET_ITEM_LIST,
  EMPTY_CART,
  SET_CART,
} from "../actions/types";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad5389abb28ba",
    name: "Big Bull Rice",
    price: 12000,
    // image: require("../../assets/image/chiactive.jpeg"),
  },
  {
    id: "3ac68afc-c605-48d3-a4f8ww-fbd91aa97f63",
    name: "Mamador Oil",
    price: 5000,
    // image: require("../../assets/image/kings.jpeg"),
  },
  {
    id: "58694a0f-3da1-ee471f-bd96-145571e29d721",
    name: "Happy Hour",
    price: 12000,
    // image: require("../../assets/image/happyhour.jpeg"),
  },
  {
    id: "58694a0f-3da1-471f-bd96-14557e31e29d722",
    name: "Viva Detergent",
    price: 5000,
    // image: require("../../assets/image/viva.png"),
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d723",
    name: "Salt",
    price: 3000,
    // image: require("../../assets/image/lipton.png"),
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d724",
    name: "Terra Maggi",
    price: 2000,
    // image: require("../../assets/image/kingsm.jpeg"),
  },
];

const initialState = {
  itemsList: DATA,
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEM_LIST:
      return {
        ...state,
        itemsList: action.payload,
      };
    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    case INCREASE_ITEM_QUANTITY: {
      return {
        ...state,
        cart: state.cart.map((a) => {
          if (a.name[0] === action.payload.name[0]) {
            return {
              ...action.payload,
              quantity: parseInt(a.quantity, 10) + 1,
            };
          } else {
            return a;
          }
        }),
      };
    }
    case DECREASE_ITEM_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((a) => {
          if (a.name[0] === action.payload.name[0]) {
            return {
              ...action.payload,
              quantity: parseInt(a.quantity, 10) - 1,
            };
          } else {
            return a;
          }
        }),
      };
    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((a) => a.name[0] !== action.payload.name[0]),
      };
    case EMPTY_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
