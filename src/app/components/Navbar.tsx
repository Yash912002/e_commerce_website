"use client";
import Link from "next/link";
import { useCart } from "../context/CartHook";
import { CartState } from "../context/CartProvider";
import { useState } from "react";

interface NavBarProps {
	onSearch: (term: string) => void;
}

export const NavBar = ({ onSearch }: NavBarProps) => {
	// @ts-ignore
	const { state } = useCart();
	const { items }: CartState = state;

	const [searchTerm, setSearchTerm] = useState<string>("");

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value;
		setSearchTerm(term);
		onSearch(term);
	};

	return (
		<div className="bg-gray-50 text-black w-full">
			<div className="container mx-auto flex justify-between items-center p-4">
				{/* Brand Section */}
				<div className="flex items-center">
					<Link href="/">
						<p className="text-xl font-bold text-black">Amazon</p>
					</Link>
				</div>

				{/* Search Bar */}
				<div className="flex-grow mx-4">
					<input
						type="text"
						placeholder="Search products..."
						value={searchTerm}
						onChange={handleSearch}
						className="w-full sm:w-96 border rounded-md px-4 py-2"
					/>
				</div>

				{/* Cart Section */}
				<div className="flex items-center">
					<Link href="/cart" className="text-black">
						Cart
						{items && (
							<span className="ml-2 bg-cyan-500 text-black rounded-full px-3 py-1 text-sm">
								{items.length}
							</span>
						)}
					</Link>
				</div>
			</div>
		</div>
	);
};
