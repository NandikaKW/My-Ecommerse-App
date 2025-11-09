import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";

const Brand = ({ selectedBrands = [], onBrandChange }) => {
  const [showBrands, setShowBrands] = useState(true);
  
  const brands = [
    {
      _id: 9006,
      title: "Apple",
    },
    {
      _id: 9007,
      title: "Ultron",
    },
    {
      _id: 9008,
      title: "Unknown",
    },
    {
      _id: 9009,
      title: "Shoppers Home",
    },
    {
      _id: 9010,
      title: "Hoichoi",
    },
  ];

  const handleBrandClick = (brandTitle) => {
    onBrandChange(brandTitle);
  };

  return (
    <div>
      <div
        onClick={() => setShowBrands(!showBrands)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Brand" icons={true} />
      </div>
      {showBrands && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-3 text-sm lg:text-base text-[#767676]">
            {brands.map((item) => (
              <li
                key={item._id}
                className="flex items-center gap-3 py-1 cursor-pointer hover:text-primeColor transition duration-300"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(item.title)}
                  onChange={() => handleBrandClick(item.title)}
                  className="w-4 h-4 text-primeColor focus:ring-primeColor border-gray-300 rounded"
                />
                <span className={selectedBrands.includes(item.title) ? "text-primeColor font-semibold" : ""}>
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Brand;