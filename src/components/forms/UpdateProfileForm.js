import React from "react";
import { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
const UpdateProfileForm = () => {
  const { currentUser, userReauthentication, updatePassword, updateEmail, sendEmailVerification } =
    useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user = {
      email: formData.get("email"),
      currentPassword: formData.get("current-password"),
      newPassword: formData.get("new-password"),
      newPasswordConfirm: formData.get("new-password-confirm"),
    };
    console.log("Submitting with", user);

    // Check if passwords match
    if (user.newPassword !== user.newPasswordConfirm) {
      alert("Error: Passwords don't match");
      return;
    }

    setLoading(true);
    // Reauthentication
    try {
      await userReauthentication(currentUser.email, user.currentPassword); // Re-authenticate first
      console.log("Reauthenticated successfully");
    } catch (error) {
      console.log("failed Reauthentication:", error);
      alert("Confirmation failed ,sign in first: " + error.message);
      setLoading(false);
      return;
    }

    // updating
    try {
      if (user.newPassword === "" && currentUser.email !== user.email) {
        await updateEmail(user.email);
        await sendEmailVerification();
        alert("Email Updated successfully!");
      } else if (user.newPassword !== "" && currentUser.email === user.email) {
        await updatePassword(user.newPassword); // Use newPassword, not current password
        alert("Password Updated successfully!");
      } else if (user.newPassword !== "" && currentUser.email !== user.email) {
        await updateEmail(user.email);
        await updatePassword(user.newPassword); // Update new password
        await sendEmailVerification();
        alert("Email & Password Updated successfully!");
      } else {
        alert("no cahnges detected");
      }
    } catch (error) {
      console.log("Error during Updating Email & Password:", error);
      alert("Failed to Update: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Update Profile
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-left">
          <form className="space-y-6" action="#" onSubmit={onSubmit}>
            <div>
              <label
                htmlhtmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder={currentUser.email}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlhtmlFor="current-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  current password <span className="text-gray-500">{"(required)"}</span>
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="current-password"
                  name="current-password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlhtmlFor="new-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="new-password"
                  name="new-password"
                  type="password"
                  placeholder="leave blank to keep the same"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlhtmlFor="new-password-confirm"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm the new password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="new-password-confirm"
                  name="new-password-confirm"
                  type="password"
                  placeholder="leave blank to keep the same"
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
                Update
              </button>
              <Link to="/dashboard" className="text-center mt-3 block">
                <span className="text-indigo-700"> Cancel </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
