
"use client";
import { createContext, useEffect, useReducer } from "react";
import { cartReducer } from "./CartReducer";

export type CartItem = {
	id: number;
	title: string;
	price: number;
	quantity: number;
	image: string;
};

export type CartState = {
	items: CartItem[];
};

export type CartAction =
	| { type: "ADD_ITEM"; payload: CartItem }
	| { type: "REMOVE_ITEM"; payload: number }
	| { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } };

export type CartContextType = {
	state: CartState;
	dispatch: React.Dispatch<CartAction>;
};

export const CartContext = createContext<CartContextType | null>(null);

// Initial state of the cart
const initialCartState: CartState = {
	items: [],
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(cartReducer, initialCartState, () => {
		// Load the state from localstoreage, if available
		const storedCartState = localStorage.getItem("cartState");

		if (storedCartState && storedCartState !== "undefined") {
			return JSON.parse(storedCartState);
		} else {
			return initialCartState;
		}
	});

	// Save the cart state to localstorage whenever it changes
	useEffect(() => {
		localStorage.setItem("cartState", JSON.stringify(state));
	}, [state]);

	return (
		<CartContext.Provider value={{ state, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};
