import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { FaShippingFast, FaShieldAlt, FaHeadset, FaAward } from "react-icons/fa";
import { MdLocalShipping, MdSecurity, MdSupportAgent, MdEmojiEvents } from "react-icons/md";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  
  useEffect(() => {
    setPrevLocation(location.state?.data || "");
  }, [location]);

  const features = [
    {
      icon: <MdLocalShipping className="text-2xl" />,
      title: "Fast Shipping",
      desc: "Free shipping on orders over $200 with express delivery options."
    },
    {
      icon: <MdSecurity className="text-2xl" />,
      title: "Secure Payments", 
      desc: "Your payments are safe with our encrypted payment processing."
    },
    {
      icon: <MdSupportAgent className="text-2xl" />,
      title: "24/7 Support",
      desc: "Our customer support team is always ready to help you."
    },
    {
      icon: <MdEmojiEvents className="text-2xl" />,
      title: "Quality Products",
      desc: "We stand behind the quality of every product we sell."
    }
  ];

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="About" prevLocation={prevLocation} />
      
      {/* Hero Section */}
      <div className="w-full py-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-gray-800">About Orebi</h1>
          <p className="text-base text-lightText max-w-[600px]">
            <span className="text-primeColor font-semibold">Orebi</span> is one of the world's leading ecommerce brands 
            and is internationally recognized for celebrating the essence of classic Worldwide cool looking style.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="w-full py-8 border-b-[1px] border-b-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Story</h2>
        <div className="flex flex-col gap-4 text-lightText">
          <p>
            Founded in 2020, Orebi started with a simple mission: to make online shopping 
            accessible, enjoyable, and trustworthy for everyone. We believe that shopping 
            should be more than just a transaction—it should be an experience.
          </p>
          <p>
            Our team carefully curates every product, ensures fast and reliable delivery, 
            and provides exceptional customer support at every step of your journey with us.
          </p>
          <p>
            What started as a small team of passionate individuals has grown into a trusted 
            platform where customers can discover amazing products with complete confidence.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full py-8 border-b-[1px] border-b-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center gap-3 p-6 shadow-sm hover:shadow-md duration-300 rounded-lg"
            >
              <div className="text-primeColor">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-800 text-lg">{feature.title}</h3>
              <p className="text-sm text-lightText">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full py-8 border-b-[1px] border-b-gray-200">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col gap-2 p-4">
            <span className="text-2xl font-bold text-primeColor">50K+</span>
            <span className="text-sm text-lightText">Happy Customers</span>
          </div>
          <div className="flex flex-col gap-2 p-4">
            <span className="text-2xl font-bold text-primeColor">100+</span>
            <span className="text-sm text-lightText">Brand Partners</span>
          </div>
          <div className="flex flex-col gap-2 p-4">
            <span className="text-2xl font-bold text-primeColor">24/7</span>
            <span className="text-sm text-lightText">Support</span>
          </div>
          <div className="flex flex-col gap-2 p-4">
            <span className="text-2xl font-bold text-primeColor">5★</span>
            <span className="text-sm text-lightText">Average Rating</span>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full py-12 text-center">
        <div className="flex flex-col gap-6 items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Ready to Start Shopping?</h2>
          <p className="text-lightText max-w-[500px]">
            Join thousands of satisfied customers who trust Orebi for their shopping needs.
          </p>
          <Link to="/shop">
            <button className="w-52 h-10 bg-primeColor text-white font-semibold hover:bg-black duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;