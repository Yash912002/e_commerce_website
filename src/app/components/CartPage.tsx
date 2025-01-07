"use client";
import { useCart } from "../context/CartHook";
import { CartItem } from "../context/CartProvider";
import CheckoutButton from "./Checkout";

const CartPage = () => {
	const { state, dispatch } = useCart();

	// items :- Array of objects containing product information
	const { items }: { items: CartItem[] } = state;

	const totalPrice = items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	const incrementQuantity = (id: number) => {
		// Find the item
		const item = items.find((item) => item.id === id);

		// If item exist, increase or update the quantity
		if (item) {
			dispatch({
				type: "UPDATE_QUANTITY",
				payload: {
					id,
					quantity: item.quantity + 1,
				},
			});
		}
	};

	const decrementQuantity = (id: number) => {
		const item = items.find((item) => item.id === id);

		// If the item exists and quantity is 1, Remove it
		// otherwise decrement quantity by 1
		if (item) {
			if (item.quantity === 1) {
				dispatch({
					type: "REMOVE_ITEM",
					payload: id,
				});
			} else {
				dispatch({
					type: "UPDATE_QUANTITY",
					payload: {
						id,
						quantity: item.quantity - 1,
					},
				});
			}
		}
	};

	const removeItem = (id: number) => {
		const item = items.find((item) => item.id === id);

		// Remove the item completely from cart
		if (item) {
			dispatch({
				type: "REMOVE_ITEM",
				payload: id,
			});
		}
	};

	return (
		<div className="p-4 max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>

			{items.length === 0 ? (
				<p className="text-gray-500 text-center text-lg">Your cart is empty.</p>
			) : (
				<div className="space-y-6">
					{items.map((item) => (
						<div
							key={item.id}
							className="flex flex-col sm:flex-row items-center justify-between p-4 shadow-md rounded-lg bg-white gap-4"
						>
							{/* Product Image and Info */}
							<div className="flex items-center justify-center sm:justify-start gap-4 w-full md:w-1/2">
								<img
									src={item.image}
									alt={item.title}
									className="w-20 h-20 object-cover rounded-md"
								/>
								<div>
									<p className="text-md font-semibold text-gray-600">
										{item.title}
									</p>
									<p className="text-gray-500">${item.price.toFixed(2)}</p>
								</div>
							</div>

							{/* Quantity Control Buttons */}
							<div className="flex items-center gap-4">
								<button
									onClick={() => decrementQuantity(item.id)}
									className="px-3 py-1 border rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
								>
									-
								</button>
								<span className="font-medium text-lg">{item.quantity}</span>
								<button
									onClick={() => incrementQuantity(item.id)}
									className="px-3 py-1 border rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
								>
									+
								</button>
							</div>

							{/* Price and Remove Button */}
							<div className="flex flex-col items-center gap-2">
								<p className="text-lg font-semibold text-gray-800">
									${(item.price * item.quantity).toFixed(2)}
								</p>
								<button
									onClick={() => removeItem(item.id)}
									className="text-sm text-red-500 hover:underline"
								>
									Remove
								</button>
							</div>
						</div>
					))}

					{/* Total price and Checkout Button */}
					<div className="p-4 shadow-md rounded bg-white flex justify-between items-center">
						<div className="flex gap-2">
							<h2 className="text-xl font-bold">Total</h2>
							<p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
						</div>

						<div className="flex items-center space-x-4">
							<CheckoutButton items={items} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartPage;
