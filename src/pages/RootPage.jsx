import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RootPage = () => {
  const [fake, setFake] = useState(null);
  const fakeStore = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      // console.log(response);
      const jsonData = await response.json();
      console.log(jsonData);
      setFake(jsonData);
    } catch (e) {
      alert("error while fetching data", e);
    }
  };
  useEffect(() => {
    fakeStore();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-5">
      {fake ? (
        <ul className="w-full flex flex-wrap justify-center gap-5">
          {fake.map((item, index) => (
            <li
              key={index}
              className="w-[250px] bg-white rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <Link to={`/items/${item.id}`} className="block">
                <img
                  className="rounded-t-lg w-full h-[200px] object-cover"
                  src={item.image}
                  alt={item.title}
                />
              </Link>
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 line-clamp-1 mb-1">{item.title}</h2>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{item.description}</p>
                <div className="flex justify-between items-center text-gray-700 font-medium text-sm">
                  <p>
                    📅 {Math.random() > 0.5 ? 2023 : 2024}/{((Math.random() * 11) | 0) + 1}/
                    {((Math.random() * 28) | 0) + 1}
                  </p>
                  <p className="text-indigo-600 font-bold">${item.price}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center">
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      )}
    </div>
  );
};
export default RootPage;
