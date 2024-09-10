import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

function ItemDetailPage() {
  const { id } = useParams();
  const { currentUser } = useAuth();

  const [fake, setFake] = useState(null);
  const [loading, setLoading] = useState(true);
  const [BuyLoading, setBuyLoading] = useState(false);

  const fakeStore = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const jsonData = await response.json();
      setFake(jsonData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fakeStore();
  }, []);

  const handleBuyClick = () => {
    if (!currentUser) {
      alert("Sign in first to make a purchase.");
      return;
    }

    setBuyLoading(true);
    setTimeout(() => {
      setBuyLoading(false);
      alert(`You bought ${fake.title} for $${fake.price} using your store credit!`);
    }, 3000); // Simulate a 3-second loading time
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center /bg-gray-50">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 w-[90%] max-w-[900px] mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center">
            {/* Product Image */}
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <img
                className="rounded-lg w-full h-full object-cover"
                src={fake.image}
                alt={fake.title}
              />
            </div>
            {/* Product Details */}
            <div className="w-full md:w-1/2 px-6">
              <h1
                className={`duration-300 text-3xl font-semibold mb-4 ${
                  BuyLoading ? "text-gray-400" : "text-blue-600"
                }`}
              >
                {fake.title}
              </h1>
              <p className="text-xl text-green-600 font-bold mb-4">${fake.price}</p>
              <p className="text-gray-600 mb-6">📅 {"2023/6/21"}</p>
              <p className="text-gray-500 mb-6">{fake.description}</p>

              <button
                onClick={handleBuyClick}
                disabled={BuyLoading}
                className="duration-300 disabled:bg-gray-400  flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                {BuyLoading ? "Buying" : `Buy for $ ${fake.price}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemDetailPage;
