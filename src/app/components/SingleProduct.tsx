"use client";
import { useEffect, useState } from "react";
import { productsProps } from "./Products";
import { useCart } from "../context/CartHook";
import { QuantityControl } from "./QuantityControl";
import PriceButton from "./PriceButton";

const SingleProduct = ({ id }: { id: number }) => {

  const [singleProduct, setSingleProduct] = useState<productsProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Access cart state and dispatch
  const { state, dispatch } = useCart();

  // This hook will run whenever id changes or 
  // whenever user clicks on product
  useEffect(() => {
    // Get the products from localstorage
    const storedProducts = localStorage.getItem("products");

    // If storedProducts exists, then parse them and 
    // find the required product by comparing id 
    if (storedProducts && storedProducts !== "null") {
      const parsedRes: productsProps[] = JSON.parse(storedProducts);
      const finalRes = parsedRes.find((product) => product.id === id);

      // If we got the product,update the state
      if (finalRes) {
        setSingleProduct(finalRes);
      }
    }

    setLoading(false); // Stop loading after fetching
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">
          Loading product details...
        </p>
      </div>
    );
  }

  if (!singleProduct) {
    // throw new Error("")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">Loading product details...</p>
      </div>
    );
  }

  // Check if item is already in the cart
  const cartItem = state.items.find((item) => item.id === Number(id));

  function incrementQuantity() {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: {
        id,
        quantity: (cartItem?.quantity || 0) + 1,
      },
    });
  }

  function decrementQuantity() {
    // If the quantity is 1, remove it from the cart
    if (cartItem?.quantity === 1) {
      dispatch({
        type: "REMOVE_ITEM",
        payload: id,
      });
    }
    // If the quantity > 1, decrement it by 1
    else if (cartItem && cartItem?.quantity > 1) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: {
          id,
          quantity: cartItem?.quantity - 1,
        },
      });
    }
  }

  // Add the product to the cart with quantity 1
  function addToCart() {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id,
        title: singleProduct!.title,
        price: singleProduct!.price,
        quantity: 1,
        image: singleProduct!.image,
      },
    });
  }



  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="flex items-center justify-center">
          <img
            src={singleProduct.image}
            alt={singleProduct.title}
            className="w-full max-w-lg object-contain rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            {singleProduct.title}
          </h1>

          <p className="text-xl text-gray-700">
            {singleProduct.description}
          </p>

          <p className="text-2xl font-semibold text-blue-600">
            ${singleProduct.price}
          </p>

          <p className="text-sm text-gray-500">
            Category: {singleProduct.category}
          </p>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <p className="text-lg text-yellow-500">
              {'★'.repeat(Math.round(singleProduct.rating.rate))}
              {'☆'.repeat(5 - Math.round(singleProduct.rating.rate))}
            </p>
            <p className="text-sm text-gray-500">({singleProduct.rating.count} reviews)</p>
          </div>

          {/* Card Footer */}
          {cartItem ? (
            <QuantityControl
              increment={incrementQuantity}
              decrement={decrementQuantity}
              quantity={cartItem.quantity}
            />
          ) : (
            <PriceButton onClick={addToCart} />
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleProduct