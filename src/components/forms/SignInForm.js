import { useAuth } from "../../Contexts/AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRedirectResult } from "firebase/auth";
import { auth } from "../../firebase";
import { useEffect } from "react";
const SignInForm = () => {
  const { googleSignIn, signIn, currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      setLoading(true);
      await signIn(user.email, user.password);
      alert("Signed in successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Failed to sign in: " + error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          console.log("Google redirect result found:", result);
        } else {
          console.log("No redirect result found");
        }
      })
      .catch((error) => {
        console.error("Error getting redirect result:", error);
      });
  }, []);

  // Google Sign-In handler
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await googleSignIn();
      alert("Signed in with Google successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign-in error:", error);
      alert("Failed to sign in with Google: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign In
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-left">
        <form className="space-y-6" action="#" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="duration-300 disabled:bg-gray-400 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </button>
          </div>
          <Link to="/auth/signUp" className="text-center mt-3 block">
            Don't have an account? <span className="text-indigo-700">Sign Up</span>
          </Link>
        </form>
        <div className="px-2 mt-5  flex  justify-center items-center gap-1">
          <div className="flex-1 border-2 h-0 border-gray-400 rounded-sm"></div>
          <strong className="-mt-[3px] inline-block">or</strong>
          <div className="flex-1 border-2 h-0 border-gray-400 rounded-sm"></div>
        </div>
        {/*      <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="duration-300 disabled:border-gray-400 flex w-full justify-center rounded-md border-2 border-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-indigo-500 disabled:text-gray-400  shadow-sm hover:border-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 /focus-visible:outline-red-600"
          >
            <span className="pr-1">Sign in with </span> <span className="text-sky-500"> G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-sky-500">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default SignInForm;
