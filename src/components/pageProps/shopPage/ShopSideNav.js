import React from "react";
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";
import Color from "./shopBy/Color";
import Price from "./shopBy/Price";

const ShopSideNav = ({ selectedFilters, onFilterChange, onClearAll }) => {
  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...selectedFilters };
    
    if (filterType === 'priceRange') {
      newFilters.priceRange = value;
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

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Filter Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-bold text-primeColor">Filters</h2>
        {getActiveFiltersCount() > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {getActiveFiltersCount()} active
            </span>
            <button
              onClick={onClearAll}
              className="text-sm text-red-500 hover:text-red-700 transition duration-300"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {getActiveFiltersCount() > 0 && (
        <div className="bg-gray-50 p-3 rounded-lg">
          <h3 className="text-sm font-semibold mb-2">Active Filters:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.categories.map(cat => (
              <button
                key={cat}
                onClick={() => removeFilter('categories', cat)}
                className="bg-primeColor text-white px-2 py-1 rounded-full text-xs flex items-center gap-1 hover:bg-red-500 transition duration-300"
              >
                {cat}
                <span className="ml-1">×</span>
              </button>
            ))}
            {selectedFilters.colors.map(color => (
              <button
                key={color}
                onClick={() => removeFilter('colors', color)}
                className="bg-primeColor text-white px-2 py-1 rounded-full text-xs flex items-center gap-1 hover:bg-red-500 transition duration-300"
              >
                {color}
                <span className="ml-1">×</span>
              </button>
            ))}
            {selectedFilters.brands.map(brand => (
              <button
                key={brand}
                onClick={() => removeFilter('brands', brand)}
                className="bg-primeColor text-white px-2 py-1 rounded-full text-xs flex items-center gap-1 hover:bg-red-500 transition duration-300"
              >
                {brand}
                <span className="ml-1">×</span>
              </button>
            ))}
            {selectedFilters.priceRange && (
              <button
                onClick={() => removeFilter('priceRange', selectedFilters.priceRange)}
                className="bg-primeColor text-white px-2 py-1 rounded-full text-xs flex items-center gap-1 hover:bg-red-500 transition duration-300"
              >
                ${selectedFilters.priceRange.priceOne} - ${selectedFilters.priceRange.priceTwo}
                <span className="ml-1">×</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Filter Components */}
      <Category 
        selectedCategories={selectedFilters.categories}
        onCategoryChange={(category) => handleFilterChange('categories', category)}
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
  );
};

export default ShopSideNav;