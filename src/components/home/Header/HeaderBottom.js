// HeaderBottom.js - Updated with correct categories
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { paginationItems } from "../../../constants";

const HeaderBottom = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();
  
  // Define categories with their filter values based on your actual product categories
  const categories = [
    { 
      id: 1, 
      name: "Fashion", 
      filterValue: "fashion",
      icon: "👕",
      productCount: paginationItems.filter(item => item.category === "Fashion").length
    },
    { 
      id: 2, 
      name: "Accessories", 
      filterValue: "accessories",
      icon: "👜",
      productCount: paginationItems.filter(item => item.category === "Accessories").length
    },
    { 
      id: 3, 
      name: "Electronics", 
      filterValue: "electronics",
      icon: "📱",
      productCount: paginationItems.filter(item => item.category === "Electronics").length
    },
    { 
      id: 4, 
      name: "Home Decor", 
      filterValue: "home-decor",
      icon: "🏠",
      productCount: paginationItems.filter(item => item.category === "Home Decor").length
    },
    { 
      id: 5, 
      name: "Toys", 
      filterValue: "toys",
      icon: "🧸",
      productCount: paginationItems.filter(item => item.category === "Toys").length
    },
  ];

  // FIXED: Safe click outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && ref.current.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle category click - navigates to shop with category filter
  const handleCategoryClick = (category) => {
    // Navigate to shop page with category query parameter
    navigate(`/shop?category=${category.filterValue}`);
    setShow(false); // Close dropdown
  };

  // View all categories
  const handleViewAllCategories = () => {
    navigate('/shop');
    setShow(false);
  };

  useEffect(() => {
    const filtered = paginationItems.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div
            onClick={() => setShow(!show)}
            ref={ref}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor relative group"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <p className="text-[14px] font-normal">Shop by Category</p>

            {/* Categories Dropdown */}
            {show && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute top-full left-0 mt-2 z-50 bg-white w-80 text-gray-800 h-auto rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
              >
                {/* Dropdown Header */}
                <div className="bg-black text-white p-4">
                  <h3 className="font-semibold text-lg">Product Categories</h3>
                  <p className="text-sm text-gray-300">Browse products by category</p>
                </div>
                
                {/* Categories List */}
                <div className="max-h-96 overflow-y-auto">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => handleCategoryClick(category)}
                      className="flex items-center justify-between px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{category.icon}</span>
                        <div>
                          <span className="font-medium text-gray-800">{category.name}</span>
                          <p className="text-xs text-gray-500 mt-1">
                            {category.productCount} products available
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                          {category.productCount}
                        </span>
                        <svg 
                          className="w-4 h-4 text-gray-400" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                  
                  {/* View All Button */}
                  <div
                    onClick={handleViewAllCategories}
                    className="px-4 py-4 bg-gray-50 hover:bg-gray-100 cursor-pointer text-center border-t border-b"
                  >
                    <span className="font-semibold text-black hover:text-primeColor transition-colors flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      View All Products
                    </span>
                  </div>
                </div>
                
                {/* Category Help Text */}
                <div className="px-4 py-3 bg-white border-t text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Click any category to filter products</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Search your products here"
            />
            <FaSearch className="w-5 h-5" />
            {searchQuery && (
              <div
                className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer rounded-lg`}
              >
                {searchQuery &&
                  filteredProducts.map((item) => (
                    <div
                      onClick={() =>
                        navigate(
                          `/product/${item.productName
                            .toLowerCase()
                            .split(" ")
                            .join("")}`,
                          {
                            state: {
                              item: item,
                            },
                          }
                        ) & setSearchQuery("")
                      }
                      key={item._id}
                      className="max-w-[600px] h-28 bg-gray-50 mb-3 flex items-center gap-3 p-4 hover:bg-gray-100 transition-colors"
                    >
                      <img className="w-20 h-20 object-cover rounded" src={item.img} alt="productImg" />
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-lg">
                          {item.productName}
                        </p>
                        <p className="text-xs text-gray-600">{item.des}</p>
                        <div className="flex items-center gap-4">
                          <p className="text-sm">
                            Price:{" "}
                            <span className="text-primeColor font-semibold">
                              ${item.price}
                            </span>
                          </p>
                          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          
          {/* User & Cart Icons */}
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div onClick={() => setShowUser(!showUser)} className="flex items-center gap-1">
              <FaUser className="hover:text-black transition-colors" />
              <FaCaretDown className={`transition-transform ${showUser ? 'rotate-180' : ''}`} />
            </div>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute top-10 right-0 z-50 bg-white w-48 text-gray-700 h-auto py-2 rounded-lg shadow-xl border border-gray-200"
              >
                <Link to="/signin">
                  <li className="px-4 py-3 hover:bg-gray-100 hover:text-black duration-300 cursor-pointer border-b">
                    Login
                  </li>
                </Link>
                <Link onClick={() => setShowUser(false)} to="/signup">
                  <li className="px-4 py-3 hover:bg-gray-100 hover:text-black duration-300 cursor-pointer border-b">
                    Sign Up
                  </li>
                </Link>
                <li className="px-4 py-3 hover:bg-gray-100 hover:text-black duration-300 cursor-pointer border-b">
                  Profile
                </li>
                <li className="px-4 py-3 hover:bg-gray-100 hover:text-black duration-300 cursor-pointer">
                  Others
                </li>
              </motion.ul>
            )}
            <Link to="/cart" className="relative">
              <div className="relative hover:text-black transition-colors">
                <FaShoppingCart className="w-5 h-5" />
                {products.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                    {products.length}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;