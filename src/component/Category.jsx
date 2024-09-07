import React, { useState, useEffect } from "react";
import Today from "./Today";

export default function Category() {
  const categories = ["Panties", "Brallets", "Shorts", "Bra", "Night Wears", "Boxers"];
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [items, setItems] = useState([]); 

  // Fetch items based on the selected category
  const fetchItems = async (category) => {
    try {
      const response = await fetch(`/api/category/${category}`); 
      const data = await response.json();
      setItems(data); 
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); 
    fetchItems(category);
  };

  useEffect(() => {
    fetchItems(categories[0]); 
    setSelectedCategory(categories[0]); 
  }, []);

  return (
    <>
      <section className="wrapper lg:mt-[100px]">
        <div className="mb-4">
          <Today Today="Category" />
          <h1 className="text-3xl mt-4 font-500">Browse By Category</h1>
        </div>

        <ul className="flex gap-10 overflow-x-auto">
          {categories.map((item, idx) => (
            <button
              key={idx}
              className={`border px-5 whitespace-nowrap py-1 rounded-md transition-colors duration-200 ${
                selectedCategory === item ? "bg-blue-500 text-white border-blue-500" : "bg-white text-black border-gray-300"
              }`}
              onClick={() => handleCategoryClick(item)}
            >
              {item}
            </button>
          ))}
        </ul>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.productId} className=" rounded-md">
                <img src={item.productImage} alt={item.productName} className="w-full h-48 object-cover mb-2" />
                <h3 className="text-lg font-bold">{item.productName}</h3>
                <p>{item.productDetails}</p>
                <p className="font-semibold">${item.productPrice}</p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-4 mt-10">No items found for this category.</p>
          )}
        </div>
      </section>
    </>
  );
}
