import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Add useDispatch
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { FaCreditCard, FaPaypal } from "react-icons/fa";
import { resetCart } from "../../redux/orebiSlice"; // Import resetCart

const Payment = () => {
  //navigate between between pages
  const navigate = useNavigate();
  //send actions to update the global state
  const dispatch = useDispatch(); // Initialize dispatch
  const products = useSelector((state) => state.orebiReducer.products);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const totalAmt = products.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCharge = totalAmt <= 200 ? 30 : totalAmt <= 400 ? 25 : 20;
  const finalTotal = totalAmt + shippingCharge;

  const handlePayment = async (e) => {
    e.preventDefault();
    //show ui show processing
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Clear the cart before navigating to success page
      dispatch(resetCart());
      setIsProcessing(false);
      navigate("/payment-success");
    }, 2000);
  };

  if (products.length === 0) {
    return (
      <div className="max-w-container mx-auto px-4">
        <Breadcrumbs title="Payment" />
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link to="/shop">
            <button className="bg-primeColor text-white px-6 py-2 rounded hover:bg-black transition duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment" />
      
      <div className="flex flex-col lg:flex-row gap-8 py-8">
        {/* Payment Form */}
        <div className="lg:w-2/3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
            
            {/* Payment Method Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`p-4 border rounded-lg text-center flex flex-col items-center gap-2 ${
                    paymentMethod === "card" 
                      ? "border-primeColor bg-blue-50" 
                      : "border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <FaCreditCard className="w-6 h-6" />
                  <span>Credit/Debit Card</span>
                </button>
                <button
                  type="button"
                  className={`p-4 border rounded-lg text-center flex flex-col items-center gap-2 ${
                    paymentMethod === "paypal" 
                      ? "border-primeColor bg-blue-50" 
                      : "border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("paypal")}
                >
                  <FaPaypal className="w-6 h-6" />
                  <span>PayPal</span>
                </button>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handlePayment}>
              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primeColor"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primeColor"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primeColor"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primeColor"
                      required
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "paypal" && (
                <div className="text-center py-8">
                  <p className="text-lg mb-4">You will be redirected to PayPal to complete your payment.</p>
                  <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4">
                    <p className="text-yellow-800">
                      Note: This is a demo. No actual payment will be processed.
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full mt-6 py-3 px-4 rounded-md font-semibold text-white ${
                  isProcessing 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-primeColor hover:bg-black"
                } transition duration-300`}
              >
                {isProcessing ? "Processing..." : `Pay $${finalTotal.toFixed(2)}`}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-50 rounded-lg shadow-lg p-6 sticky top-4"
          >
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4">
              {products.map((item) => (
                <div key={item._id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${totalAmt.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${shippingCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Payment;