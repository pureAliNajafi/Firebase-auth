import React, { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
const DashboardPage = () => {
  const { currentUser, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      alert("singed out successfully!");
      navigate("/auth/signIn");
    } catch (error) {
      // Log and provide feedback on the error
      console.error("Error during signup:", error);
      alert("Failed to sign Out: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="text-lg flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <h2 className="font-bold text-xl underline mb-3">Dashboard</h2>
      <div className="text-left mx-auto max-w-sm">
        {/* {currentUser && <pre>{JSON.stringify(currentUser, null, 2)}</pre>} */}
        {currentUser ? (
          <div className="flex flex-col gap-4">
            <div>
              <strong>gmail: </strong>
              {currentUser.email}
            </div>
            <div className="text-center">
              <Link
                to="/update-profile"
                className="duration-300 disabled:bg-gray-400 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update profile
              </Link>
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="mt-3 duration-300 disabled:bg-gray-400 text-sky-600"
              >
                sign Out
              </button>
            </div>
          </div>
        ) : (
          "not logged in"
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
