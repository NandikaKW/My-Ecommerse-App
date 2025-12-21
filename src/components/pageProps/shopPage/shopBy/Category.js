import React, { useState } from "react";
import { ImPlus, ImMinus, FaTag } from "react-icons/im";
import { FaCheck, FaTimes, FaTag as TagIcon } from "react-icons/fa";
import NavTitle from "./NavTitle";
import { paginationItems } from "../../../../constants";

const Category = ({ selectedCategories = [], onCategoryChange, activeCategory }) => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  
  // Get unique categories from your actual products
  const getUniqueCategories = () => {
    const categoriesSet = new Set();
    paginationItems.forEach(item => {
      if (item.category) {
        categoriesSet.add(item.category);
      }
    });
    return Array.from(categoriesSet).sort();
  };

  // Get product count for each category
  const getCategoryProductCount = (category) => {
    return paginationItems.filter(item => item.category === category).length;
  };

  // Get all categories with their product counts
  const categories = getUniqueCategories().map(category => ({
    _id: category.toLowerCase().replace(/\s+/g, '-'),
    title: category,
    count: getCategoryProductCount(category),
    hasSubCategories: category === "New Arrivals" // Only New Arrivals has sub-categories
  }));

  // Add "All Products" option
  const allProductsOption = {
    _id: "all",
    title: "All Products",
    count: paginationItems.length,
    hasSubCategories: false
  };

  const allItems = [allProductsOption, ...categories];

  const handleCategoryClick = (title) => {
    if (title === "All Products") {
      // If "All Products" is clicked, clear all categories
      selectedCategories.forEach(cat => onCategoryChange(cat));
    } else {
      onCategoryChange(title);
    }
  };

  // Toggle category selection
  const toggleCategory = (title) => {
    const newSelected = selectedCategories.includes(title)
      ? selectedCategories.filter(cat => cat !== title)
      : [...selectedCategories, title];
    
    // Update parent with all selected categories
    newSelected.forEach(cat => {
      if (!selectedCategories.includes(cat)) {
        onCategoryChange(cat);
      }
    });
    
    // Remove deselected categories
    selectedCategories.forEach(cat => {
      if (!newSelected.includes(cat)) {
        onCategoryChange(cat);
      }
    });
  };

  return (
    <div className="w-full">
      <div className="mb-6 pb-4 border-b border-gray-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TagIcon className="text-black" />
            <h2 className="text-xl font-bold text-black">Categories</h2>
          </div>
          {selectedCategories.length > 0 && (
            <button
              onClick={() => selectedCategories.forEach(cat => onCategoryChange(cat))}
              className="text-xs text-red-600 hover:text-red-800 hover:bg-red-50 px-2 py-1 rounded transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">Filter products by category</p>
      </div>
      
      {/* Category Summary */}
      {selectedCategories.length > 0 && (
        <div className="mb-4 p-3 bg-gray-100 rounded-lg border border-gray-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-800">
                Selected: {selectedCategories.length} categor{selectedCategories.length === 1 ? 'y' : 'ies'}
              </span>
              {activeCategory && (
                <span className="text-xs bg-black text-white px-2 py-1 rounded">
                  Active: {activeCategory}
                </span>
              )}
            </div>
          </div>
          {selectedCategories.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedCategories.map(cat => (
                <span 
                  key={cat} 
                  className="text-xs bg-black text-white px-2 py-1 rounded-full flex items-center gap-1"
                >
                  {cat}
                  <button
                    onClick={() => onCategoryChange(cat)}
                    className="hover:text-red-300 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Categories List */}
      <div className="space-y-2">
        {allItems.map(({ _id, title, count, hasSubCategories }) => {
          const isSelected = selectedCategories.includes(title);
          const isAllProducts = title === "All Products";
          
          return (
            <div
              key={_id}
              className="group"
            >
              <div className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              }`}
                onClick={() => toggleCategory(title)}
              >
                <div className="flex items-center gap-3">
                  {/* Custom checkbox */}
                  <div className={`w-5 h-5 flex items-center justify-center rounded border ${
                    isSelected 
                      ? 'bg-white border-white' 
                      : 'bg-white border-gray-400 group-hover:border-gray-600'
                  }`}>
                    {isSelected && (
                      <FaCheck className={`w-3 h-3 ${isAllProducts ? 'text-black' : 'text-black'}`} />
                    )}
                  </div>
                  
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                        {title}
                      </span>
                      {hasSubCategories && (
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                          +
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-1 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                      {count} product{count !== 1 ? 's' : ''} available
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`text-sm px-2 py-1 rounded ${
                    isSelected
                      ? 'bg-white text-black'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {count}
                  </span>
                  
                  {/* Expand icon for categories with sub-categories */}
                  {hasSubCategories && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowSubCatOne(!showSubCatOne);
                      }}
                      className={`cursor-pointer transition-transform duration-300 ${
                        showSubCatOne ? 'rotate-180' : ''
                      }`}
                    >
                      {showSubCatOne ? (
                        <ImMinus className="text-gray-500 hover:text-black" />
                      ) : (
                        <ImPlus className="text-gray-500 hover:text-black" />
                      )}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Sub-categories (only for New Arrivals) */}
              {hasSubCategories && showSubCatOne && title === "New Arrivals" && (
                <div className="mt-2 ml-10 space-y-2">
                  <div className="p-2 border-l-2 border-gray-300 pl-4">
                    <div className="text-xs text-gray-600 mb-2">New this week</div>
                    <div className="space-y-1">
                      {["Latest Fashion", "New Electronics", "Home Essentials"].map(subCat => (
                        <div
                          key={subCat}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCategory(subCat);
                          }}
                        >
                          <div className={`w-3 h-3 rounded border ${
                            selectedCategories.includes(subCat)
                              ? 'bg-black border-black'
                              : 'border-gray-400'
                          }`}></div>
                          <span className={`text-sm ${
                            selectedCategories.includes(subCat)
                              ? 'text-black font-medium'
                              : 'text-gray-600'
                          }`}>
                            {subCat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-gray-300">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              // Select top 3 categories
              const topCategories = categories.slice(0, 3).map(cat => cat.title);
              topCategories.forEach(cat => {
                if (!selectedCategories.includes(cat)) {
                  onCategoryChange(cat);
                }
              });
            }}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded transition-colors"
          >
            Select Popular
          </button>
          <button
            onClick={() => {
              // Select categories with most products
              const sortedByCount = [...categories].sort((a, b) => b.count - a.count).slice(0, 2);
              sortedByCount.forEach(cat => {
                if (!selectedCategories.includes(cat.title)) {
                  onCategoryChange(cat.title);
                }
              });
            }}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded transition-colors"
          >
            Select Top Rated
          </button>
        </div>
      </div>
      
      {/* Help Text */}
      <div className="mt-4 text-xs text-gray-500">
        <p className="flex items-center gap-2">
          <FaCheck className="text-green-500" />
          Click to select/deselect categories
        </p>
        <p className="mt-1">Products will be filtered based on your selection</p>
      </div>
    </div>
  );
};

export default Category;