// ShopSideNav.js - Black and white theme
import React, { useState, useEffect } from "react";
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";
import Color from "./shopBy/Color";
import Price from "./shopBy/Price";
import { FaTimes, FaFilter, FaTag } from "react-icons/fa";
import { paginationItems } from "../../../constants";

const ShopSideNav = ({ selectedFilters, onFilterChange, onClearAll, activeCategory }) => {
  const [localActiveCategory, setLocalActiveCategory] = useState("");
  
  // Get unique categories from products
  const getUniqueCategories = () => {
    const categoriesSet = new Set();
    paginationItems.forEach(item => {
      if (item.category) {
        categoriesSet.add(item.category);
      }
    });
    return Array.from(categoriesSet).sort();
  };

  const allCategories = getUniqueCategories();
  
  // Sync with activeCategory prop
  useEffect(() => {
    if (activeCategory) {
      setLocalActiveCategory(activeCategory);
      
      // If category is not in selected filters, add it
      if (!selectedFilters.categories.includes(activeCategory)) {
        const newFilters = {
          ...selectedFilters,
          categories: [activeCategory]
        };
        onFilterChange(newFilters);
      }
    } else {
      setLocalActiveCategory("");
    }
  }, [activeCategory]);

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...selectedFilters };
    
    if (filterType === 'priceRange') {
      newFilters.priceRange = value;
    } else if (filterType === 'categories') {
      const currentFilters = newFilters[filterType];
      const isSelected = currentFilters.includes(value);
      
      if (isSelected) {
        newFilters[filterType] = currentFilters.filter(item => item !== value);
        if (value === localActiveCategory) {
          setLocalActiveCategory("");
        }
      } else {
        if (localActiveCategory && localActiveCategory !== value) {
          newFilters[filterType] = [value];
          setLocalActiveCategory(value);
        } else {
          newFilters[filterType] = [...currentFilters, value];
        }
      }
    } else {
      const currentFilters = newFilters[filterType];
      const isSelected = currentFilters.includes(value);
      
      if (isSelected) {
        newFilters[filterType] = currentFilters.filter(item => item !== value);
      } else {
        newFilters[filterType] = [...currentFilters, value];
      }
    }
    
    onFilterChange(newFilters);
  };

  // Function to remove individual filters
  const removeFilter = (filterType, value) => {
    const newFilters = { ...selectedFilters };
    
    if (filterType === 'priceRange') {
      newFilters.priceRange = null;
    } else if (filterType === 'categories') {
      newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
      if (value === localActiveCategory) {
        setLocalActiveCategory("");
      }
    } else {
      newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
    }
    
    onFilterChange(newFilters);
  };

  const getActiveFiltersCount = () => {
    return (
      selectedFilters.categories.length +
      selectedFilters.colors.length +
      selectedFilters.brands.length +
      (selectedFilters.priceRange ? 1 : 0)
    );
  };

  // Clear category from active category
  const clearActiveCategory = () => {
    setLocalActiveCategory("");
    const newFilters = {
      ...selectedFilters,
      categories: []
    };
    onFilterChange(newFilters);
  };

  // Get product count for each category
  const getCategoryProductCount = (category) => {
    return paginationItems.filter(item => item.category === category).length;
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Filter Header - Black theme */}
      <div className="flex justify-between items-center border-b border-gray-300 pb-4">
        <div className="flex items-center gap-2">
          <FaFilter className="text-black" />
          <h2 className="text-xl font-bold text-black">Filters</h2>
        </div>
        {getActiveFiltersCount() > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 bg-gray-200 px-2 py-1 rounded">
              {getActiveFiltersCount()} active
            </span>
            <button
              onClick={onClearAll}
              className="text-sm text-red-600 hover:text-red-800 transition duration-300 flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded"
            >
              <FaTimes className="text-xs" />
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Active Category Banner - Black and white */}
      {localActiveCategory && (
        <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-700 font-medium">Active Category:</p>
              <h3 className="text-lg font-bold text-black mt-1">{localActiveCategory}</h3>
            </div>
            <button
              onClick={clearActiveCategory}
              className="text-gray-600 hover:text-red-600 transition duration-300 bg-white p-2 rounded-full hover:bg-red-50"
              title="Clear category filter"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Showing {getCategoryProductCount(localActiveCategory)} products
          </p>
        </div>
      )}

      {/* Quick Category Navigation - Black and white */}
      <div className="bg-white border border-gray-300 rounded-lg p-4">
        <h3 className="font-semibold text-black mb-3 flex items-center gap-2">
          <FaTag className="text-gray-600" />
          Browse Categories
        </h3>
        <div className="space-y-2">
          {allCategories.map((category) => {
            const productCount = getCategoryProductCount(category);
            return (
              <button
                key={category}
                onClick={() => handleFilterChange('categories', category)}
                className={`w-full text-left p-3 rounded transition-all duration-200 border ${
                  selectedFilters.categories.includes(category)
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      selectedFilters.categories.includes(category) 
                        ? 'bg-white' 
                        : 'bg-gray-400'
                    }`} />
                    <span className="font-medium">{category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      selectedFilters.categories.includes(category)
                        ? 'bg-white text-black'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {productCount}
                    </span>
                    {selectedFilters.categories.includes(category) && (
                      <FaTimes className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filters Display - Black and white */}
      {getActiveFiltersCount() > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Active Filters:</h3>
            <span className="text-xs bg-black text-white px-2 py-1 rounded">
              {getActiveFiltersCount()} applied
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.categories.map(cat => (
              <div
                key={cat}
                className="flex items-center bg-white border border-black rounded-full pl-3 pr-2 py-1.5"
              >
                <span className="text-sm text-black font-medium">{cat}</span>
                <button
                  onClick={() => removeFilter('categories', cat)}
                  className="ml-2 text-gray-500 hover:text-red-600 transition duration-200 hover:bg-red-50 p-1 rounded-full"
                  title="Remove"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </div>
            ))}
            {selectedFilters.colors.map(color => (
              <div
                key={color}
                className="flex items-center bg-white border border-gray-300 rounded-full pl-3 pr-2 py-1.5"
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full border border-gray-300" 
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                  <span className="text-sm text-gray-700">{color}</span>
                </div>
                <button
                  onClick={() => removeFilter('colors', color)}
                  className="ml-2 text-gray-500 hover:text-red-600 transition duration-200 hover:bg-red-50 p-1 rounded-full"
                  title="Remove"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </div>
            ))}
            {selectedFilters.brands.map(brand => (
              <div
                key={brand}
                className="flex items-center bg-white border border-gray-300 rounded-full pl-3 pr-2 py-1.5"
              >
                <span className="text-sm text-gray-700">{brand}</span>
                <button
                  onClick={() => removeFilter('brands', brand)}
                  className="ml-2 text-gray-500 hover:text-red-600 transition duration-200 hover:bg-red-50 p-1 rounded-full"
                  title="Remove"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </div>
            ))}
            {selectedFilters.priceRange && (
              <div className="flex items-center bg-white border border-gray-300 rounded-full pl-3 pr-2 py-1.5">
                <span className="text-sm text-gray-700">
                  ${selectedFilters.priceRange.priceOne} - ${selectedFilters.priceRange.priceTwo}
                </span>
                <button
                  onClick={() => removeFilter('priceRange', selectedFilters.priceRange)}
                  className="ml-2 text-gray-500 hover:text-red-600 transition duration-200 hover:bg-red-50 p-1 rounded-full"
                  title="Remove"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
          
          {/* Clear All Button */}
          {getActiveFiltersCount() > 1 && (
            <div className="mt-3 pt-3 border-t border-gray-300">
              <button
                onClick={onClearAll}
                className="w-full py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition duration-300 flex items-center justify-center gap-2 border border-red-200"
              >
                <FaTimes />
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Products Count Summary - Black theme */}
      <div className="bg-black text-white p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Filtered Products</p>
            <p className="text-2xl font-bold">
              {selectedFilters.categories.length > 0 
                ? `${selectedFilters.categories.join(", ")}`
                : "All Categories"
              }
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Active Filters</p>
            <p className="text-2xl font-bold">
              {getActiveFiltersCount()}
            </p>
          </div>
        </div>
        {selectedFilters.categories.length > 0 && (
          <p className="text-xs mt-2 opacity-75 border-t border-gray-700 pt-2">
            Showing products from {selectedFilters.categories.length} categor{selectedFilters.categories.length === 1 ? 'y' : 'ies'}
          </p>
        )}
      </div>

      {/* Filter Components */}
      <div className="space-y-6">
        <Category 
          selectedCategories={selectedFilters.categories}
          onCategoryChange={(category) => handleFilterChange('categories', category)}
          activeCategory={localActiveCategory}
        />
        <Color 
          selectedColors={selectedFilters.colors}
          onColorChange={(color) => handleFilterChange('colors', color)}
        />
        <Brand 
          selectedBrands={selectedFilters.brands}
          onBrandChange={(brand) => handleFilterChange('brands', brand)}
        />
        <Price 
          selectedPrice={selectedFilters.priceRange}
          onPriceChange={(price) => handleFilterChange('priceRange', price)}
        />
      </div>

      {/* Apply Filters Button (for mobile) */}
      <div className="mdl:hidden bg-gray-100 p-4 rounded-lg border-t border-gray-300">
        <button
          onClick={() => {
            const event = new Event('filterApplied');
            window.dispatchEvent(event);
          }}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-300 font-medium"
        >
          Apply Filters
        </button>
        <p className="text-xs text-gray-600 text-center mt-2">
          Filters are applied automatically
        </p>
      </div>
    </div>
  );
};

export default ShopSideNav;