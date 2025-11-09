import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  return (
    <div className="max-w-container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center"
      >
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="w-20 h-20 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <p className="text-gray-600 mb-2">
            Order ID: #ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
          <p className="text-gray-600">
            Confirmation email will be sent to your registered email address.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/shop">
            <button className="bg-primeColor text-white px-8 py-3 rounded-md hover:bg-black transition duration-300 font-semibold">
              Continue Shopping
            </button>
          </Link>
          <Link to="/">
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-md hover:bg-gray-50 transition duration-300 font-semibold">
              Back to Home
            </button>
          </Link>
        </div>
        
        <p className="text-sm text-gray-500 mt-6">
          Need help? <Link to="/contact" className="text-primeColor hover:underline">Contact our support team</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;