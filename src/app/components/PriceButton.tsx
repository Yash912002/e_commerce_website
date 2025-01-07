type PriceButtonProps = {
	onClick: () => void;
};

const PriceButton = ({ onClick }: PriceButtonProps) => {
	return (
		<div className="p-3 flex justify-center">
			<button
				className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium 
                   flex items-center justify-center gap-2 hover:bg-emerald-700 
                   transition-colors duration-300"
				onClick={onClick}
			>
				Buy Now
			</button>
		</div>
	);
};

export default PriceButton;
