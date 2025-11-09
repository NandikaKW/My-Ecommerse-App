import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";

const SignUp = () => {
  const navigate = useNavigate();
  
  // ============= Initial State Start here =============
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [checked, setChecked] = useState(false);
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [errCity, setErrCity] = useState("");
  const [errCountry, setErrCountry] = useState("");
  const [errZip, setErrZip] = useState("");
  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ============= Event Handler Start here =============
 const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrPhone("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
    setErrAddress("");
  };

  const handleCity = (e) => {
    setCity(e.target.value);
    setErrCity("");
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
    setErrCountry("");
  };

  const handleZip = (e) => {
    setZip(e.target.value);
    setErrZip("");
  };

  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!checked) {
      setIsLoading(false);
      return;
    }

    //start as no error
    let hasError = false;

    if (!clientName) {
      setErrClientName("Enter your name");
      hasError = true;
    }
    if (!email) {
      setErrEmail("Enter your email");
      hasError = true;
    } else {
      if (!EmailValidation(email)) {
        //show the error message
        setErrEmail("Enter a Valid email");
        hasError = true;
      }
    }
    if (!phone) {
      setErrPhone("Enter your phone number");
      hasError = true;
    }
    if (!password) {
      setErrPassword("Create a password");
      hasError = true;
    } else {
      if (password.length < 6) {
        setErrPassword("Passwords must be at least 6 characters");
        hasError = true;
      }
    }
    if (!address) {
      setErrAddress("Enter your address");
      hasError = true;
    }
    if (!city) {
      setErrCity("Enter your city name");
      hasError = true;
    }
    if (!country) {
      setErrCountry("Enter the country you are residing");
      hasError = true;
    }
    if (!zip) {
      setErrZip("Enter the zip code of your area");
      hasError = true;
    }

    if (hasError) {
      setIsLoading(false);
      return;
    }

    // ============== Getting the value ==============
    if (
      clientName &&
      email &&
      EmailValidation(email) &&
      password &&
      password.length >= 6 &&
      address &&
      city &&
      country &&
      zip
    ) {
      setSuccessMsg(
        `Hello dear ${clientName}, Welcome to Orebi! Your account has been created successfully.`
      );
      
      // Simulate API call delay
      setTimeout(() => {
        setIsLoading(false);
        // Redirect to home page after successful sign up
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <img src={logoLight} alt="logoImg" className="h-12" />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/signin"
            className="font-medium text-primeColor hover:text-black"
          >
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {successMsg ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="mt-4 text-sm text-green-600">{successMsg}</p>
              <p className="mt-2 text-sm text-gray-600">
                Redirecting to home page...
              </p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSignUp}>
              {/* Personal Information */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={handleName}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primeColor focus:border-primeColor sm:text-sm"
                    placeholder="John Doe"
                  />
                  {errClientName && (
                    <p className="mt-1 text-sm text-red-600">{errClientName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmail}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primeColor focus:border-primeColor sm:text-sm"
                    placeholder="john@example.com"
                  />
                  {errEmail && (
                    <p className="mt-1 text-sm text-red-600">{errEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhone}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primeColor focus:border-primeColor sm:text-sm"
                    placeholder="+1 (555) 123-4567"
                  />
                  {errPhone && (
                    <p className="mt-1 text-sm text-red-600">{errPhone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={handlePassword}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primeColor focus:border-primeColor sm:text-sm"
                    placeholder="••••••••"
                  />
                  {errPassword && (
                    <p className="mt-1 text-sm text-red-600">{errPassword}</p>
                  )}
                </div>
              </div>

              {/* Address Information */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={handleAddress}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primeColor focus:border-primeColor sm:text-sm"
                    placeholder="123 Main St"
                  />
                  {errAddress && (
                    <p className="mt-1 text-sm text-red-600">{errAddress}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={handleCity}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primeColor focus:border-primeColor sm:text-sm"
                      placeholder="New York"
                    />
                    {errCity && (
                      <p className="mt-1 text-sm text-red-600">{errCity}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={zip}
                      onChange={handleZip}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primeColor focus:border-primeColor sm:text-sm"
                      placeholder="10001"
                    />
                    {errZip && (
                      <p className="mt-1 text-sm text-red-600">{errZip}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={handleCountry}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primeColor focus:border-primeColor sm:text-sm"
                    placeholder="United States"
                  />
                  {errCountry && (
                    <p className="mt-1 text-sm text-red-600">{errCountry}</p>
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  className="h-4 w-4 text-primeColor focus:ring-primeColor border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the{" "}
                  <a href="#" className="text-primeColor hover:text-black">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primeColor hover:text-black">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={!checked || isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  checked && !isLoading
                    ? "bg-primeColor hover:bg-black cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primeColor transition duration-300`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          )}

          {!successMsg && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-medium text-primeColor hover:text-black"
                >
                  Sign in
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;