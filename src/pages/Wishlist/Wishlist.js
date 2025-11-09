import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { removeFromWishlist, addToCart } from "../../redux/orebiSlice";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";

const Wishlist = () => {
  const dispatch = useDispatch();
  //Gets all wishlist items from global state
  const wishlistItems = useSelector((state) => state.orebiReducer.wishlist);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Wishlist" />
      
      {wishlistItems.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Action</h2>
            <h2>Remove</h2>
          </div>
          
          <div className="mt-5">
            {wishlistItems.map((item) => (
              <div key={item._id} className="w-full grid grid-cols-5 mb-4 border py-2">
                <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
                  <img className="w-20 h-20" src={item.image} alt={item.name} />
                  <h1 className="font-titleFont font-semibold">{item.name}</h1>
                </div>
                
                <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
                  <div className="flex w-1/3 items-center text-lg font-semibold">
                    ${item.price}
                  </div>
                  
                  <div className="w-1/3 flex items-center gap-4">
                    <button
                    onClick={()=>dispatch(addToCart({
                      _id: item._id,
                      name: item.name,
                      image: item.image,
                      price: item.price,
                      quantity: 1,
                      colors: item.color
                    }))}
                    className="flex items-center gap-2 bg-primeColor text-white px-4 py-2 hover:bg-black duration-300"
                    >
                      //Shopping cart icon
                      <FaShoppingCart  />
                      Add to Cart
                    </button>
                  </div>
                  
                  <div className="w-1/3 flex items-center justify-center">
                    <button
                      onClick={() => dispatch(removeFromWishlist(item._id))}
                      className="text-red-500 hover:text-red-700 duration-300"
                    >
                      <BsSuitHeartFill className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <BsSuitHeartFill className="w-20 h-20 text-gray-300" />
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Wishlist is empty.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your wishlist feels lonely. Add some products you love to see them here!
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Wishlist;