
import { useRouter } from "next/navigation";

type ProductCardProps = {
	id: number;
	title: string;
	category: string;
	price: number;
	image: string;
	rating: {
		rate: number,
		count: number
	};
};

export const ProductCard = ({
	id,
	title,
	category,
	price,
	image,
	rating
}: ProductCardProps) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`products/${id}`)
	}

	return (
		<div
			key={id}
			className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
			onClick={handleClick}
		>
			{/* Image Section */}
			<div className="aspect-w-16 aspect-h-9 relative h-48 sm:h-64">
				<img src={image} alt={title} className="w-full h-full object-cover" />
			</div>

			{/* Card Body */}
			<div className="p-5">
				{/* Title */}
				<div className="flex justify-between items-start mb-2">
					<h3 className="text-lg font-semibold text-gray-800 text-center line-clamp-2">{title}</h3>
				</div>

				{/* Category */}
				<p className="text-gray-600 text-sm mb-2 text-center">
					{category}
				</p>

				{/* Ratings */}
				<div className="flex items-center justify-center space-x-2">
					<p className="text-lg text-yellow-500">
						{'★'.repeat(Math.round(rating.rate))}
						{'☆'.repeat(5 - Math.round(rating.rate))}
					</p>
					<p className="text-sm text-gray-500">({rating.count} reviews)</p>
				</div>

				{/* Price */}
				<p className="text-md font-bold text-emerald-600 text-center">${price.toFixed(2)}</p>
			</div>

		</div>
	);
};
