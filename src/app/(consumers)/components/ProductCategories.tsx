"use client";

import React, { useState } from "react";

import { ChevronDown } from "lucide-react";

interface CategoryGroup {
  title: string;
  items: string[];
  icon?: string;
}

const categoryGroups: CategoryGroup[] = [
  {
    title: "Main Categories",
    items: ["Apparel", "Accessories", "Footwear", "Home"],
    icon: "🏷️",
  },
  {
    title: "Gender",
    items: ["Men", "Women", "Boys", "Girls"],
    icon: "👥",
  },
  {
    title: "Product Types",
    items: [
      "Shirts",
      "Jeans",
      "Watches",
      "Sports Shoes",
      "Casual Shoes",
      "Handbags",
      "Sunglasses",
      "Backpacks",
    ],
    icon: "📦",
  },
  {
    title: "Colors",
    items: [
      "Black",
      "White",
      "Blue",
      "Red",
      "Navy Blue",
      "Grey",
      "Green",
      "Pink",
    ],
    icon: "🎨",
  },
  {
    title: "Seasons",
    items: ["Summer", "Winter", "Spring", "Fall"],
    icon: "🌤️",
  },
  {
    title: "Usage",
    items: ["Casual", "Formal", "Sports", "Party", "Work", "Travel"],
    icon: "🎯",
  },
];

export default function ProductCategories() {
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

  const toggleDropdown = (groupTitle: string) => {
    const newOpenDropdowns = new Set(openDropdowns);
    if (newOpenDropdowns.has(groupTitle)) {
      newOpenDropdowns.delete(groupTitle);
    } else {
      newOpenDropdowns.add(groupTitle);
    }
    setOpenDropdowns(newOpenDropdowns);
  };

  return (
    <div className="container mx-auto my-8 space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Product Categories</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our wide range of product categories. Use the search bar below
          to find specific items from these categories.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm">
          <span>💡</span>
          <span>
            Tip: Try searching for combinations like{" "}
            {`"blue sport shoes" or "green casual shirts"`}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryGroups.map((group) => (
          <div
            key={group.title}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <button
              onClick={() => toggleDropdown(group.title)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200 rounded-t-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{group.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{group.title}</h3>
                  <p className="text-sm text-gray-500">
                    {group.items.length} items
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  openDropdowns.has(group.title) ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDropdowns.has(group.title) && (
              <div className="px-6 pb-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {group.items.map((item, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-150 cursor-default"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
