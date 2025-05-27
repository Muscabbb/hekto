"use client";

import { ProductsType } from "@/types/productsType";
import React, { createContext, useContext, ReactNode, useReducer } from "react";

//
// 1) Define state + action types
//

type ProductState = {
  products: ProductsType[];
  selectedProduct: ProductsType | null;
  cart: ProductsType[];
};

type ProductAction =
  | { type: "SET_PRODUCTS"; payload: ProductsType[] }
  | { type: "SELECT_PRODUCT"; payload: ProductsType | null }
  | { type: "ADD_TO_CART"; payload: ProductsType }
  | { type: "REMOVE_FROM_CART"; payload: number };

//
// 2) Reducer: handles all state transitions in one place
//

function productReducer(
  state: ProductState,
  action: ProductAction
): ProductState {
  console.log("ss");

  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    case "SELECT_PRODUCT":
      return { ...state, selectedProduct: action.payload };

    case "ADD_TO_CART":
      console.log("cart");
      if (!state.cart.find((item) => item.id === action.payload.id)) {
        // Item not found, add it
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      } else {
        // Item found, return current state without modification
        console.log("Item already in cart, not adding again.");
        return state;
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
}

//
// 3) Context’s shape: only state + dispatch
//

type ProductContextType = {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
};

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  cart: [],
};

const ProductContext = createContext<ProductContextType>({
  state: initialState,
  dispatch: () => {
    throw new Error("dispatch must be used within a ProductProvider");
  },
});

//
// 4) Provider: wraps children, gives them [state, dispatch]
//

export function ProductProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}

//
// 5) Custom hook for easy consumption
//

export function useProductContext() {
  return useContext(ProductContext);
}
