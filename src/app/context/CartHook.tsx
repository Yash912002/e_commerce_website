import { useContext } from "react";
import { CartContext } from "./CartProvider";

export const useCart = () => {
	const context = useContext(CartContext);

	if (!context) {
		console.error("useCart must be used within a CartProvider");
	}

	return context;
};
