import React from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist, removeFromWishlist } from "../../../redux/orebiSlice";

const Product = (props) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.orebiReducer.wishlist);
  const { viewMode = "grid" } = props;
  
  const _id = props.productName;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = props;

  // Check if product is in wishlist
  const isInWishlist = wishlistItems.some(item => item._id === props._id);

  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(props._id));
    } else {
      dispatch(addToWishlist({
        _id: props._id,
        name: props.productName,
        image: props.img,
        badge: props.badge,
        price: props.price,
        color: props.color,
      }));
    }
  };

  // List view layout
  if (viewMode === "list") {
    return (
      <div className="w-full relative group border border-gray-200 rounded-lg p-4 hover:shadow-lg transition duration-300">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Product Image */}
          <div className="md:w-1/4 relative">
            <Image className="w-full h-48 object-cover rounded" imgSrc={props.img} />
            <div className="absolute top-2 left-2">
              {props.badge && <Badge text="New" />}
            </div>
            {/* Wishlist Heart Icon */}
            <div className="absolute top-2 right-2">
              <button
                onClick={handleWishlistToggle}
                className={`p-2 rounded-full ${
                  isInWishlist 
                    ? "bg-primeColor text-white" 
                    : "bg-white text-gray-600 hover:bg-primeColor hover:text-white"
                } transition duration-300 shadow-md`}
              >
                {isInWishlist ? <BsSuitHeartFill /> : <BsSuitHeart />}
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-3/4 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-primeColor mb-2">
                {props.productName}
              </h2>
              <p className="text-lg font-semibold text-gray-800 mb-2">${props.price}</p>
              <p className="text-gray-600 mb-3">{props.des}</p>
              <p className="text-sm text-gray-500 mb-3">Color: {props.color}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      _id: props._id,
                      name: props.productName,
                      quantity: 1,
                      image: props.img,
                      badge: props.badge,
                      price: props.price,
                      colors: props.color,
                    })
                  )
                }
                className="flex items-center gap-2 bg-primeColor text-white px-4 py-2 rounded-md hover:bg-black transition duration-300"
              >
                <FaShoppingCart />
                Add to Cart
              </button>
              <button
                onClick={handleProductDetails}
                className="flex items-center gap-2 border border-primeColor text-primeColor px-4 py-2 rounded-md hover:bg-primeColor hover:text-white transition duration-300"
              >
                <MdOutlineLabelImportant />
                View Details
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`flex items-center gap-2 border px-4 py-2 rounded-md transition duration-300 ${
                  isInWishlist
                    ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    : "border-gray-300 text-gray-600 hover:border-primeColor hover:text-primeColor"
                }`}
              >
                {isInWishlist ? <BsSuitHeartFill /> : <BsSuitHeart />}
                {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default grid view
  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden">
        <div>
          <Image className="w-full h-full" imgSrc={props.img} />
        </div>
        <div className="absolute top-6 left-8">
          {props.badge && <Badge text="New" />}
        </div>
        
        {/* Wishlist Heart Icon - Top Right */}
        <div className="absolute top-4 right-4">
          <button
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full ${
              isInWishlist 
                ? "bg-primeColor text-white" 
                : "bg-white text-gray-600 hover:bg-primeColor hover:text-white"
            } transition duration-300 shadow-md`}
          >
            {isInWishlist ? <BsSuitHeartFill /> : <BsSuitHeart />}
          </button>
        </div>

        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li
              onClick={() =>
                dispatch(
                  addToCart({
                    _id: props._id,
                    name: props.productName,
                    quantity: 1,
                    image: props.img,
                    badge: props.badge,
                    price: props.price,
                    colors: props.color,
                  })
                )
              }
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
            <li
              onClick={handleWishlistToggle}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              <span>
                {isInWishlist ? <BsSuitHeartFill className="text-primeColor" /> : <BsSuitHeart />}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {props.productName}
          </h2>
          <p className="text-[#767676] text-[14px]">${props.price}</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{props.color}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;