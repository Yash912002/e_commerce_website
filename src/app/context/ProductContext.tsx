"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction
} from "react";
import { productsProps } from "../components/Products";

interface ProductContextType {
  products: productsProps[];
  filteredProducts: productsProps[];
  setFilteredProducts: Dispatch<SetStateAction<productsProps[]>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<productsProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<productsProps[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const storedProducts = localStorage.getItem("products");

      if (storedProducts && storedProducts !== "undefined") {
        setProducts(JSON.parse(storedProducts));
        setFilteredProducts(JSON.parse(storedProducts));
      }

      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const result = await res.json();

        localStorage.setItem("products", JSON.stringify(result));

        setProducts(result);
        setFilteredProducts(result);
      } catch (error: any) {
        console.log("Failed to fetch the products ", error.message);
      }
    }

    fetchProducts();
  }, []);

  const filterProducts = (searchTerm: string) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <ProductContext.Provider value={{ products, filteredProducts, setFilteredProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};