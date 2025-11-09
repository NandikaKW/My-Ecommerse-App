import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import { paginationItems } from "../../constants";

const Shop = () => {
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
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

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
        // For best sellers, we can sort by badge (items with badge=true first)
        sorted.sort((a, b) => (b.badge === a.badge) ? 0 : b.badge ? 1 : -1);
        break;
      case "New Arrival":
        // For new arrivals, sort by _id in descending order (assuming higher IDs are newer)
        sorted.sort((a, b) => b._id - a._id);
        break;
      case "Price Low to High":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Price High to Low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "Featured":
        // For featured, we can use a combination of badge and price
        sorted.sort((a, b) => {
          if (a.badge && !b.badge) return -1;
          if (!a.badge && b.badge) return 1;
          return b.price - a.price; // Higher priced featured items first
        });
        break;
      default:
        // Default sorting (no change)
        break;
    }
    
    setSortedProducts(sorted);
  }, [filteredProducts, sortOption]);

  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (newFilters) => {
    setSelectedFilters(newFilters);
  };

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Handles a change in the sort option selected by the user.
 * @param {string} sortOption - The new sort option selected by the user.
 */
/*******  ed2e2c72-1f9e-433c-abfb-09dd5d99f305  *******/
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
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />
      
      {/* Mobile Filter Button */}
      <div className="mdl:hidden flex justify-between items-center mb-4">
        <button
          onClick={toggleFilter}
          className="flex items-center gap-2 bg-primeColor text-white px-4 py-2 rounded-md hover:bg-black transition duration-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </button>
        
        <div className="text-sm text-gray-600">
          Showing {sortedProducts.length} products
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
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button 
                    onClick={toggleFilter}
                    className="text-gray-500 hover:text-gray-700"
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
                />
              </div>
              <div className="p-4 border-t">
                <button
                  onClick={toggleFilter}
                  className="w-full bg-primeColor text-white py-2 rounded-md hover:bg-black transition duration-300"
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