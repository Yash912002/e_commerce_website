"use client";
import { useState } from "react";
import { ProductCard } from "./ProductCard";
import Filters from "./Filters";
import { NavBar } from "./Navbar";

import { useProductContext } from "../context/ProductContext";

export type productsProps = {
	id: number;
	title: string;
	category: string;
	price: number;
	image: string;
	rating: {
		rate: number,
		count: number
	};
	description: string
	quantity?: number;
}

export const Products = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [searchTerm, setSearchTerm] = useState<string>("");

	const { filteredProducts, products, setFilteredProducts } = useProductContext();

	const handleFilterChange = (type: string, value: string) => {
		let updatedProducts = [...products];

		if (type === "price") {
			updatedProducts.sort((a, b) => {
				if (value === "lowToHigh") return a.price - b.price;
				if (value === "highToLow") return b.price - a.price;
				return 0;
			});
		}

		if (type === "rating") {
			updatedProducts = updatedProducts.filter((product) => product.rating.rate >= Number(value))
		}

		if (type === "category") {
			setSelectedCategory(value);
			updatedProducts = value === "all" ? products : products.filter((product) => product.category === value);
		}

		setFilteredProducts(updatedProducts);
	}

	// Handle product filtering based on search input
	const handleSearch = (term: string) => {
		setSearchTerm(term);

		const filtered = products.filter((product) =>
			product.title.toLowerCase().includes(term.toLowerCase())
		);

		setFilteredProducts(filtered);
	};

	return (
		<div className="min-h-screen bg-gray-100 p-6">

			{/* Navbar - Pass Search Handler */}
			<NavBar onSearch={handleSearch} searchTerm={searchTerm} />

			{/* Filters Component */}
			<Filters selectedCategory={selectedCategory} onFilterChange={handleFilterChange} />

			{/* Products Component */}
			<div className="max-w-5xl mx-auto p-5">
				<h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
					Featured Products
				</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredProducts.map((product) => (
						<ProductCard
							key={product.id}
							id={product.id}
							title={product.title}
							image={product.image}
							category={product.category}
							price={product.price}
							rating={product.rating}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
