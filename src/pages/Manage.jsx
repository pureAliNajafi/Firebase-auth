import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Manage = () => {
  const [fake, setFake] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const loadFakeStore = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const jsonData = await response.json();
    setFake(jsonData);
  };

  const addNewProduct = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        const result = await response.json();
        setFake([...fake, result]);
        setNewProduct({
          title: "",
          price: "",
          description: "",
          image: "",
          category: "",
        });
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFakeStore();
  }, []);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const deleteProduct = async (id) => {
    setDeleteLoading("pending...");
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const updatedFakeStore = fake.filter((product) => product.id !== id);
        setFake(updatedFakeStore);
        setDeleteLoading("Done ✅");
      } else {
        throw new Error("Failed to delete product");
        setDeleteLoading("Failed to delete product");
      }
    } catch (error) {
      console.log(error);
      setDeleteLoading("error");
    }
    setTimeout(() => {
      setDeleteLoading(null);
    }, 1000);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <main className="flex flex-col lg:flex-row-reverse">
      <div className="fixed top-3 left-3">{deleteLoading && deleteLoading}</div>{" "}
      <div className="flex flex-col items-center pt-8">
        <h2 className="text-xl font-bold pb-2">Add a new product</h2>
        <form className="flex flex-col items-start">
          <label htmlhtmlFor="title" className="pb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newProduct.title}
            onChange={handleInputChange}
            className="border-gray-300 border rounded-md px-2 py-1 mb-4"
          />
          <label htmlhtmlFor="price" className="pb-2">
            Price:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="border-gray-300 border rounded-md px-2 py-1 mb-4"
          />
          <label htmlhtmlFor="description" className="pb-2">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="border-gray-300 border rounded-md px-2 py-1 mb-4"
          ></textarea>
          <label htmlhtmlFor="image" className="pb-2">
            Image URL:
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={newProduct.image}
            onChange={handleInputChange}
            className="border-gray-300 border rounded-md px-2 py-1 mb-4"
          />
          <label htmlhtmlFor="category" className="pb-2">
            Category:
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            className="border-gray-300 border rounded-md px-2 py-1 mb-4"
          />
        </form>
        <button
          onClick={addNewProduct}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-xs"
          type="submit"
        >
          Add Product
        </button>
      </div>
      <ul className="w-full flex flex-row justify-center flex-wrap gap-3 pt-8 text-left px-[15px]">
        {fake.map((item, index) => (
          <li
            key={index}
            className="relative flex flex-row h-[200px] w-[400px] rounded-lg shadow-md hover:shadow-lg duration-300 p-1"
          >
            <div
              className="cursor-pointer absolute bottom-1 right-1 w-[30px] h-[30px] bg-red-400 rounded-full text-white hover:opacity-75 text-center "
              onClick={() => deleteProduct(item.id)}
            >
              <span className="translate-y-[2.2px] inline-block">X</span>
            </div>
            <Link to={`/items/${item.id}`} className="block w-full h-full w-[200px]">
              <img className="rounded-[4px] w-full h-full object-cover" src={item.image} alt="" />
            </Link>
            <div className="w-[200px] flex flex-col justify-between py-1 px-1">
              <p className="text-[24px] font-bold line-clamp-4">{item.title} </p>
              <p>{item.price}$</p>{" "}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Manage;
