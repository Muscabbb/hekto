"use client";

import { ProductsType } from "@/types/productsType";
import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useEffect,
} from "react";

//
// 1) Define state + action types
//

type ProductState = {
  products: ProductsType[];
  selectedProduct: ProductsType | null;
  cart: ProductsType[];
  recommendations: ProductsType[];
  isLoading: boolean;
};

type ProductAction =
  | { type: "SET_PRODUCTS"; payload: ProductsType[] }
  | { type: "SELECT_PRODUCT"; payload: ProductsType | null }
  | { type: "ADD_TO_CART"; payload: ProductsType }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "SET_RECOMMENDATIONS"; payload: ProductsType[] }
  | { type: "LOAD_FROM_STORAGE"; payload: ProductState }
  | { type: "SET_LOADING"; payload: boolean };

//
// 2) Reducer: handles all state transitions in one place
//

// Helper functions for localStorage
const saveToLocalStorage = (
  key: string,
  data: ProductsType[] | ProductsType
) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }
};

const loadFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return null;
    }
  }
  return null;
};

function productReducer(
  state: ProductState,
  action: ProductAction
): ProductState {
  let newState: ProductState;

  switch (action.type) {
    case "SET_PRODUCTS":
      newState = { ...state, products: action.payload };
      saveToLocalStorage("hekto_products", action.payload);
      return newState;

    case "SELECT_PRODUCT":
      newState = { ...state, selectedProduct: action.payload };
      saveToLocalStorage(
        "hekto_selected_product",
        action.payload as ProductsType
      );
      return newState;

    case "ADD_TO_CART":
      if (!state.cart.find((item) => item.id === action.payload.id)) {
        // Item not found, add it
        const newCart = [...state.cart, action.payload];
        newState = {
          ...state,
          cart: newCart,
        };
        saveToLocalStorage("hekto_cart", newCart);
        return newState;
      } else {
        // Item found, return current state without modification
        console.log("Item already in cart, not adding again.");
        return state;
      }

    case "REMOVE_FROM_CART":
      const filteredCart = state.cart.filter(
        (item) => item.id !== action.payload
      );
      newState = {
        ...state,
        cart: filteredCart,
      };
      saveToLocalStorage("hekto_cart", filteredCart);
      return newState;

    case "SET_RECOMMENDATIONS":
      newState = { ...state, recommendations: action.payload };
      saveToLocalStorage("hekto_recommendations", action.payload);
      return newState;

    case "LOAD_FROM_STORAGE":
      return action.payload;

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
}

//
// 3) Context's shape: only state + dispatch
//

type ProductContextType = {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
};

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  cart: [],
  recommendations: [],
  isLoading: false,
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

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProducts = loadFromLocalStorage("hekto_products") || [];
    const savedSelectedProduct =
      loadFromLocalStorage("hekto_selected_product") || null;
    const savedCart = loadFromLocalStorage("hekto_cart") || [];
    const savedRecommendations =
      loadFromLocalStorage("hekto_recommendations") || [];

    const savedState: ProductState = {
      products: savedProducts,
      selectedProduct: savedSelectedProduct,
      cart: savedCart,
      recommendations: savedRecommendations,
      isLoading: false, // Always start with loading false when loading from storage
    };

    dispatch({ type: "LOAD_FROM_STORAGE", payload: savedState });
  }, []);

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
