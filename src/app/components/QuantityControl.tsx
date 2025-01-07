type QuantityControlProps = {
	increment: () => void;
	decrement: () => void;
	quantity: number;
};

export const QuantityControl = ({
	increment,
	decrement,
	quantity,
}: QuantityControlProps) => {
	return (
		<div className="p-3 flex justify-center gap-2 items-center">
			<button
				className="text-white bg-emerald-500  hover:bg-emerald-600  text-lg font-bold px-4 py-1 rounded-lg transition-colors"
				onClick={increment}
			>
				+
			</button>

			{quantity}

			<button
				className="text-white font-bold bg-red-500 hover:bg-red-600 text-lg px-4 py-1 rounded-lg transition-colors"
				onClick={decrement}
			>
				-
			</button>
		</div>
	);
};
