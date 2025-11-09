import React, { useState } from "react";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";

const Category = ({ selectedCategories = [], onCategoryChange }) => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  
  // In Category.js, update the items array:
const items = [
  {
    _id: 990,
    title: "New Arrivals",
    icons: true,
  },
  {
    _id: 991,
    title: "Fashion",
  },
  {
    _id: 992,
    title: "Electronics",
  },
  {
    _id: 993,
    title: "Home Decor",
  },
  {
    _id: 994,
    title: "Accessories",
  },
  {
    _id: 995,
    title: "Toys",
  },
];

  const handleCategoryClick = (title) => {
    onCategoryChange(title);
  };

  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={false} />
      <div>
        <ul className="flex flex-col gap-2 text-sm lg:text-base text-[#767676]">
          {items.map(({ _id, title, icons }) => (
            <li
              key={_id}
              className="flex items-center justify-between py-2 cursor-pointer hover:text-primeColor transition duration-300"
            >
              <label className="flex items-center gap-3 cursor-pointer w-full">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(title)}
                  onChange={() => handleCategoryClick(title)}
                  className="w-4 h-4 text-primeColor focus:ring-primeColor border-gray-300 rounded"
                />
                <span className={selectedCategories.includes(title) ? "text-primeColor font-semibold" : ""}>
                  {title}
                </span>
              </label>
              {icons && (
                <span
                  onClick={() => setShowSubCatOne(!showSubCatOne)}
                  className="text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                >
                  <ImPlus />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;