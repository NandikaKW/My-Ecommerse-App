import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";

const Color = ({ selectedColors = [], onColorChange }) => {
  const [showColors, setShowColors] = useState(true);
  
  const colors = [
    {
      _id: 9001,
      title: "Green",
      base: "#22c55e",
    },
    {
      _id: 9002,
      title: "Gray",
      base: "#a3a3a3",
    },
    {
      _id: 9003,
      title: "Red",
      base: "#dc2626",
    },
    {
      _id: 9004,
      title: "Yellow",
      base: "#f59e0b",
    },
    {
      _id: 9005,
      title: "Blue",
      base: "#3b82f6",
    },
  ];

  const handleColorClick = (colorTitle) => {
    onColorChange(colorTitle);
  };

  return (
    <div>
      <div
        onClick={() => setShowColors(!showColors)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Color" icons={true} />
      </div>
      {showColors && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-3 text-sm lg:text-base text-[#767676]">
            {colors.map((item) => (
              <li
                key={item._id}
                className="flex items-center gap-3 py-1 cursor-pointer hover:text-primeColor transition duration-300"
              >
                <input
                  type="checkbox"
                  checked={selectedColors.includes(item.title)}
                  onChange={() => handleColorClick(item.title)}
                  className="w-4 h-4 text-primeColor focus:ring-primeColor border-gray-300 rounded"
                />
                <span
                  style={{ background: item.base }}
                  className={`w-4 h-4 rounded-full border border-gray-300`}
                ></span>
                <span className={selectedColors.includes(item.title) ? "text-primeColor font-semibold" : ""}>
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

export default Color;