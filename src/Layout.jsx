import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <main className="px-3 lg:px-5 w-full max-w-[1200px] mx-auto text-center text-gray-600 text-[16px] pb-[24px] min-h-screen flex flex-col justify-between">
      <section>
        <h2 className="text-[28px] md:text-[36px] text-blue-700 pt-3 font-bold">Fake Api Store</h2>
        <div>
          <nav className="text-indigo-600 [&_*:hover]:text-red-500 [&_*]:duration-300 [&_*:active]:opacity-40 flex gap-2">
            <Link to="/"> Home </Link>
            <Link to="/auth/signUp"> Sign Up </Link>
            <Link to="/auth/signIn"> Sign In </Link>
            <Link to="/dashboard"> dashboard </Link>
          </nav>
          {children}
        </div>
      </section>

      <footer>dev: ali</footer>
    </main>
  );
};

export default Layout;
