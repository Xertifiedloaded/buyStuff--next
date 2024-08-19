'use client'
import { categories } from "@/utils/Utilities";
import React, { useState, useEffect, useCallback } from "react";

export default function GridCategory() {
  const [showMore, setShowMore] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const updateItemsToShow = useCallback(() => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setItemsToShow(categories.length);
    } else if (width >= 501) {
      setItemsToShow(2);
    } else if (width >= 200) {
      setItemsToShow(1);
    }
  }, []);

  useEffect(() => {
    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, [updateItemsToShow]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative mt-14">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-8">
          {categories.slice(0, itemsToShow).map((category, idx) => (
            <h1 className="uppercase font-500 text-[#555] text-lg" key={idx}>
              {category}
            </h1>
          ))}
        </div>
        <div>
          {categories.length > itemsToShow && (
            <div className="relative ">
              <button
                className="text-blue-500 hover:underline"
                onClick={toggleDropdown}
              >
                {dropdownOpen ? "Show Less" : "Show More"}
              </button>
              {dropdownOpen && (
                <div className="absolute top-full z-20 right-[-27px] mt-2 bg-white rounded shadow-lg w-[250px]">
                  <div className="p-4">
                    {categories.slice(itemsToShow).map((category, idx) => (
                      <h1
                        className="uppercase text-[#555] text-sm mb-4"
                        key={idx}
                      >
                        {category}
                      </h1>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
