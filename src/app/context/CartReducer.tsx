import { CartAction, CartState } from "./CartProvider";

export const cartReducer = (
	state: CartState,
	action: CartAction
): CartState => {
	switch (action.type) {
		case "ADD_ITEM":
			const existingItem = state.items.find(
				(item) => item.id === action.payload.id
			);
			if (existingItem) {
				return {
					...state,
					items: state.items.map((item) =>
						item.id === action.payload.id
							? { ...item, quantity: item.quantity + action.payload.quantity }
							: item
					),
				};
			}
			return { ...state, items: [...state.items, action.payload] };

		case "REMOVE_ITEM":
			return {
				...state,
				items: state.items.filter((item) => item.id !== action.payload),
			};

		case "UPDATE_QUANTITY":
			return {
				...state,
				items: state.items.map((item) =>
					item.id === action.payload.id
						? { ...item, quantity: action.payload.quantity }
						: item
				),
			};

		default:
			return state;
	}
};