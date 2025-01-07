"use client";

import { useState } from "react";

export default function Filters(
  { onFilterChange }: { onFilterChange: (type: string, value: string) => void }
) {
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPrice(value);
    onFilterChange("price", value);
  }

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setRating(value);
    onFilterChange("rating", value);
  }

  const categories = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange("category", e.target.value);
  };

  return (
    <div className="flex flex-wrap space-y-4 md:space-y-0 md:space-x-4 justify-center py-4">
      {/* Price Dropdown */}
      <div className="relative w-full md:w-auto">
        <select
          value={price}
          onChange={handlePriceChange}
          className="w-full md:w-auto bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 text-sm font-semibold cursor-pointer shadow-sm hover:shadow-md focus:outline-none"
        >
          <option value="">Price ($)</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>

      {/* Rating Dropdown */}
      <div className="relative w-full md:w-auto">
        <select
          value={rating}
          onChange={handleRatingChange}
          className="w-full md:w-auto bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 text-sm font-semibold cursor-pointer shadow-sm hover:shadow-md focus:outline-none"
        >
          <option value="">Ratings</option>
          <option value="4">⭐⭐⭐⭐ and up</option>
          <option value="3">⭐⭐⭐ and up</option>
          <option value="2">⭐⭐ and up</option>
          <option value="1">⭐ and up</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="relative w-full md:w-auto">
        <select
          onChange={handleCategoryChange}
          className="w-full md:w-auto bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 text-sm font-semibold cursor-pointer shadow-sm hover:shadow-md focus:outline-none"
        >
          {/* Displaying all the available category options */}
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
