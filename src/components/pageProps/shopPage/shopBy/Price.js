import React from "react";
import NavTitle from "./NavTitle";

const Price = ({ selectedPrice, onPriceChange }) => {
  const priceList = [
    {
      _id: 950,
      priceOne: 0.0,
      priceTwo: 49.99,
    },
    {
      _id: 951,
      priceOne: 50.0,
      priceTwo: 99.99,
    },
    {
      _id: 952,
      priceOne: 100.0,
      priceTwo: 199.99,
    },
    {
      _id: 953,
      priceOne: 200.0,
      priceTwo: 399.99,
    },
    {
      _id: 954,
      priceOne: 400.0,
      priceTwo: 599.99,
    },
    {
      _id: 955,
      priceOne: 600.0,
      priceTwo: 1000.0,
    },
  ];

  const handlePriceClick = (price) => {
    onPriceChange(price);
  };

  return (
    <div className="cursor-pointer">
      <NavTitle title="Shop by Price" icons={false} />
      <div className="font-titleFont">
        <ul className="flex flex-col gap-3 text-sm lg:text-base text-[#767676]">
          {priceList.map((item) => (
            <li
              key={item._id}
              className="flex items-center gap-3 py-1 cursor-pointer hover:text-primeColor transition duration-300"
            >
              <input
                type="radio"
                name="priceRange"
                checked={selectedPrice?._id === item._id}
                onChange={() => handlePriceClick(item)}
                className="w-4 h-4 text-primeColor focus:ring-primeColor border-gray-300"
              />
              <span className={selectedPrice?._id === item._id ? "text-primeColor font-semibold" : ""}>
                ${item.priceOne.toFixed(2)} - ${item.priceTwo.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Price;