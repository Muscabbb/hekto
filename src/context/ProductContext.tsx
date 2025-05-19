"use client";
import { ProductsType } from "@/types/productsType";
import React, { createContext, useContext, ReactNode, useReducer } from "react";

type ProductState = {
  products: ProductsType[];
  selectedProduct: ProductsType | null;
};

type ProductAction =
  | { type: "SET_PRODUCTS"; payload: ProductsType[] }
  | { type: "SELECT_PRODUCT"; payload: ProductsType | null };

type ProductContextType = {
  state: {
    products: ProductsType[];
    selectedProduct: ProductsType | null;
  };
  dispatch: React.Dispatch<ProductAction>;
  setProducts: (products: ProductsType[]) => void;
  setSelectedProduct: (product: ProductsType) => void;
};

function productReducer(state: ProductState, action: ProductAction) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SELECT_PRODUCT":
      return { ...state, selectedProduct: action.payload };
    default:
      return state;
  }
}

const ProductContext = createContext<ProductContextType>({
  state: {
    products: [],
    selectedProduct: null,
  },
  dispatch: () => {
    throw new Error("dispatch must be used within a ProductProvider");
  },
  setProducts: () => {
    throw new Error("setProducts must be used within a ProductProvider");
  },
  setSelectedProduct: () => {
    throw new Error("setSelectedProduct must be used within a ProductProvider");
  },
});

export function ProductProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productReducer, {
    products: [],
    selectedProduct: null,
  });

  const setProducts = (products: ProductsType[]) => {
    dispatch({ type: "SET_PRODUCTS", payload: products });
  };

  const setSelectedProduct = (product: ProductsType) => {
    dispatch({ type: "SELECT_PRODUCT", payload: product });
  };

  return (
    <ProductContext.Provider
      value={{ state, dispatch, setProducts, setSelectedProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  return useContext(ProductContext);
}
