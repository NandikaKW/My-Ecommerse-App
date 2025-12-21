// Shop.js - Updated with correct category handling
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import { paginationItems } from "../../constants";

const Shop = () => {
  const location = useLocation();
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(paginationItems);
  const [sortedProducts, setSortedProducts] = useState(paginationItems);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    colors: [],
    brands: [],
    priceRange: null
  });
  const [sortOption, setSortOption] = useState("Best Sellers");
  const [viewMode, setViewMode] = useState("grid");
  const [activeCategory, setActiveCategory] = useState("");

  // Category mapping for URL parameters
  const categoryUrlMap = {
    'fashion': 'Fashion',
    'accessories': 'Accessories',
    'electronics': 'Electronics',
    'home-decor': 'Home Decor',
    'toys': 'Toys',
    'home': 'Home Decor',
    'clothes': 'Fashion',
    'bags': 'Accessories',
    'furniture': 'Home Decor',
    'home-appliances': 'Home Decor'
  };

  // Extract category from URL query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    
    if (categoryParam) {
      // Map URL parameter to actual category name
      const mappedCategory = categoryUrlMap[categoryParam] || categoryParam;
      setActiveCategory(mappedCategory);
      
      // Set the category filter
      if (!selectedFilters.categories.includes(mappedCategory)) {
        setSelectedFilters(prev => ({
          ...prev,
          categories: [mappedCategory]
        }));
      }
    } else {
      // Clear active category if no category in URL
      setActiveCategory("");
    }
  }, [location.search]);

  // Filter products based on selected filters
  useEffect(() => {
    let filtered = paginationItems;

    // Filter by categories
    if (selectedFilters.categories.length > 0) {
      filtered = filtered.filter(product => 
        selectedFilters.categories.includes(product.category)
      );
    }

    // Filter by colors
    if (selectedFilters.colors.length > 0) {
      filtered = filtered.filter(product => 
        selectedFilters.colors.includes(product.color)
      );
    }

    // Filter by brands
    if (selectedFilters.brands.length > 0) {
      filtered = filtered.filter(product => 
        selectedFilters.brands.includes(product.brand)
      );
    }

    // Filter by price range
    if (selectedFilters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= selectedFilters.priceRange.priceOne && 
        product.price <= selectedFilters.priceRange.priceTwo
      );
    }

    setFilteredProducts(filtered);
  }, [selectedFilters]);

  // Sort products whenever sort option or filtered products change
  useEffect(() => {
    const sorted = [...filteredProducts];
    
    switch (sortOption) {
      case "Best Sellers":
        sorted.sort((a, b) => (b.badge === a.badge) ? 0 : b.badge ? 1 : -1);
        break;
      case "New Arrival":
        sorted.sort((a, b) => b._id - a._id);
        break;
      case "Price Low to High":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Price High to Low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "Featured":
        sorted.sort((a, b) => {
          if (a.badge && !b.badge) return -1;
          if (!a.badge && b.badge) return 1;
          return b.price - a.price;
        });
        break;
      default:
        break;
    }
    
    setSortedProducts(sorted);
  }, [filteredProducts, sortOption]);

  // Handle category filter removal
  const handleRemoveCategoryFilter = () => {
    setSelectedFilters(prev => ({
      ...prev,
      categories: []
    }));
    setActiveCategory("");
  };

  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (newFilters) => {
    setSelectedFilters(newFilters);
    
    // Update active category if categories changed
    if (newFilters.categories.length === 1) {
      setActiveCategory(newFilters.categories[0]);
    } else if (newFilters.categories.length === 0) {
      setActiveCategory("");
    }
  };

  const handleSortChange = (sortOption) => {
    setSortOption(sortOption);
  };

  const handleViewChange = (viewMode) => {
    setViewMode(viewMode);
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      categories: [],
      colors: [],
      brands: [],
      priceRange: null
    });
    setActiveCategory("");
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />
      
      {/* Active Filters Display */}
      {(selectedFilters.categories.length > 0 || activeCategory) && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg border border-gray-300">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-800">Active Filters:</span>
              
              {/* Category Filter Badge */}
              {selectedFilters.categories.length > 0 && (
                <div className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-full">
                  <span>Category: {selectedFilters.categories.join(", ")}</span>
                  <button 
                    onClick={handleRemoveCategoryFilter}
                    className="ml-1 hover:text-gray-300 transition-colors"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
            
            {/* Clear All Button */}
            {selectedFilters.categories.length > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-red-600 hover:text-red-800 font-medium hover:bg-red-50 px-3 py-1.5 rounded transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
          
          {/* Category Title */}
          {activeCategory && (
            <div className="mt-4 pt-4 border-t border-gray-300">
              <h2 className="text-2xl font-bold text-black">{activeCategory}</h2>
              <p className="text-gray-600 mt-1">
                Showing {sortedProducts.length} products in this category
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Mobile Filter Button */}
      <div className="mdl:hidden flex justify-between items-center mb-4">
        <button
          onClick={toggleFilter}
          className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-md hover:bg-gray-800 transition duration-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </button>
        
        <div className="text-sm text-gray-700">
          <span className="font-medium">{sortedProducts.length}</span> products
          {activeCategory && <span className="text-gray-600"> in <span className="font-medium">{activeCategory}</span></span>}
        </div>
      </div>

      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        {/* Left Sidebar - Desktop */}
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav 
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearAll={clearAllFilters}
            activeCategory={activeCategory}
          />
        </div>

        {/* Mobile Filter Sidebar */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 mdl:hidden">
            <div 
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={toggleFilter}
            ></div>
            <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-lg overflow-y-auto">
              <div className="p-4 border-b bg-black text-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button 
                    onClick={toggleFilter}
                    className="text-gray-300 hover:text-white"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <ShopSideNav 
                  selectedFilters={selectedFilters}
                  onFilterChange={handleFilterChange}
                  onClearAll={clearAllFilters}
                  activeCategory={activeCategory}
                />
              </div>
              <div className="p-4 border-t">
                <button
                  onClick={toggleFilter}
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-300 font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner 
            itemsPerPageFromBanner={itemsPerPageFromBanner} 
            totalProducts={sortedProducts.length}
            onSortChange={handleSortChange}
            onViewChange={handleViewChange}
            activeCategory={activeCategory}
          />
          <Pagination 
            itemsPerPage={itemsPerPage} 
            products={sortedProducts}
            viewMode={viewMode}
          />
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;