import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart, applyCoupon } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  const couponDiscount = useSelector((state) => state.orebiReducer.couponDiscount || { discount: 0, code: "" });
  
  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  // Define coupon codes
  const validCoupons = {
    "SAVE10": 10,   
    "SAVE20": 20,   
    "FREESHIP": "free-shipping", 
    "WELCOME15": 15  
  };

  // Calculate total amount
  useEffect(() => {
    let price = 0;
    products.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmt(price);
  }, [products]);

  // Calculate shipping and reapply coupon logic when total changes
  useEffect(() => {
    let newShippingCharge = 0;
    if (totalAmt <= 200) {
      newShippingCharge = 30;
    } else if (totalAmt <= 400) {
      newShippingCharge = 25;
    } else if (totalAmt > 401) {
      newShippingCharge = 20;
    }
    
    // If free shipping coupon is applied, keep shipping at 0
    if (couponDiscount.code && couponDiscount.code.toUpperCase() === "FREESHIP") {
      setShippingCharge(0);
    } else {
      setShippingCharge(newShippingCharge);
    }
    
    // Recalculate discount if percentage coupon is applied
    if (isCouponApplied && couponDiscount.code && couponDiscount.code.toUpperCase() !== "FREESHIP") {
      const coupon = validCoupons[couponDiscount.code.toUpperCase()];
      if (coupon && typeof coupon === 'number') {
        const discountAmount = (totalAmt * coupon) / 100;
        dispatch(applyCoupon({ discount: discountAmount, code: couponDiscount.code }));
      }
    }
  }, [totalAmt, couponDiscount.code, dispatch, isCouponApplied]);

  // Handle coupon application
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponMessage("Please enter a coupon code");
      return;
    }

    const couponKey = couponCode.toUpperCase();
    const coupon = validCoupons[couponKey];
    
    if (coupon) {
      setIsCouponApplied(true);
      setCouponMessage(`Coupon "${couponKey}" applied successfully!`);
      
      if (coupon === "free-shipping") {
        setShippingCharge(0);
        dispatch(applyCoupon({ discount: 0, code: couponKey }));
      } else {
        // For percentage discounts
        const discountAmount = (totalAmt * coupon) / 100;
        dispatch(applyCoupon({ discount: discountAmount, code: couponKey }));
      }
    } else {
      setIsCouponApplied(false);
      setCouponMessage("Invalid coupon code. Try: SAVE10, SAVE20, FREESHIP, WELCOME15");
    }
  };

  // Handle coupon removal
  const handleRemoveCoupon = () => {
    setIsCouponApplied(false);
    setCouponCode("");
    setCouponMessage("");
    dispatch(applyCoupon({ discount: 0, code: "" }));
    
    // Reset shipping charges
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else if (totalAmt > 401) {
      setShippingCharge(20);
    }
  };

  // Calculate final total
  const calculateFinalTotal = () => {
    let final = totalAmt;
    
    // Apply percentage discount if any
    if (couponDiscount && couponDiscount.discount && couponDiscount.discount > 0) {
      final -= couponDiscount.discount;
    }
    
    // Add shipping (might be 0 if FREESHIP coupon applied)
    final += shippingCharge;
    
    return Math.max(0, final); // Ensure total is not negative
  };

  // Format currency
  const formatCurrency = (amount) => {
    return amount.toFixed(2);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Cart" />
      {products.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {products.map((item) => (
              <div key={item._id}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              dispatch(resetCart());
              handleRemoveCoupon(); // Also clear coupon
            }}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Reset cart
          </button>

          {/* Updated Coupon Section */}
          <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
            <div className="flex flex-col mdl:flex-row items-center gap-4 w-full mdl:w-auto">
              <div className="flex items-center gap-2 w-full">
                <input
                  className={`w-full mdl:w-52 h-10 px-4 border text-primeColor text-sm outline-none rounded-md ${
                    isCouponApplied ? "bg-green-50 border-green-400" : "border-gray-400"
                  }`}
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={isCouponApplied}
                />
                {isCouponApplied ? (
                  <button
                    onClick={handleRemoveCoupon}
                    className="h-10 px-6 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300 whitespace-nowrap"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={handleApplyCoupon}
                    className="h-10 px-6 bg-primeColor text-white font-semibold rounded-md hover:bg-black transition duration-300 whitespace-nowrap"
                  >
                    Apply
                  </button>
                )}
              </div>
              
              {/* Coupon Message */}
              {couponMessage && (
                <p className={`text-sm font-medium ${isCouponApplied ? 'text-green-600' : 'text-red-600'}`}>
                  {couponMessage}
                </p>
              )}
            </div>
            
            {/* Coupon Hint */}
            <div className="mt-2 mdl:mt-0 text-center mdl:text-right">
              <p className="text-sm text-gray-600">
                Try: <span className="font-semibold text-primeColor">SAVE10, SAVE20, FREESHIP</span>
              </p>
            </div>
          </div>

          {/* Cart Totals */}
          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${formatCurrency(totalAmt)}
                  </span>
                </p>
                
                {/* Display Coupon Discount */}
                {couponDiscount && couponDiscount.discount > 0 && (
                  <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium bg-green-50 text-green-700">
                    Coupon Discount ({couponDiscount.code})
                    <span className="font-semibold tracking-wide font-titleFont">
                      -${formatCurrency(couponDiscount.discount)}
                    </span>
                  </p>
                )}
                
                {/* Free Shipping Indicator */}
                {couponDiscount.code === "FREESHIP" && shippingCharge === 0 && (
                  <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium bg-green-50 text-green-700">
                    Shipping Discount (FREESHIP)
                    <span className="font-semibold tracking-wide font-titleFont">
                      Free
                    </span>
                  </p>
                )}
                
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${formatCurrency(shippingCharge)}
                  </span>
                </p>
                
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ${formatCurrency(calculateFinalTotal())}
                  </span>
                </p>
              </div>
              
              <div className="flex justify-end">
                <Link to="/paymentgateway">
                  <button 
                    className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300"
                    disabled={products.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
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

export default Cart;
