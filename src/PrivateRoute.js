import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  const location = useLocation(); // Get the current location/path // or passing as props

  // Define authenticated and unauthenticated paths
  const mustBeAuthenticatedPaths = ["/dashboard", "/update-profile"];
  const mustBeNotAuthenticatedPaths = ["/auth/signIn", "/auth/signUp"];

  // Check if the current location is in the authenticated paths
  const isAuthPath = mustBeAuthenticatedPaths.includes(location.pathname);
  // Check if the current location is in the unauthenticated paths
  const isNotAuthPath = mustBeNotAuthenticatedPaths.includes(location.pathname);

  // If the user must be authenticated for this path and is not, redirect to sign-in
  if (isAuthPath && !currentUser) {
    return <Navigate to="/auth/signIn" />;
  }

  // If the user must not be authenticated for this path and is, redirect to dashboard
  if (isNotAuthPath && currentUser) {
    return <Navigate to="/dashboard" />;
  }

  // For all other cases, render the component
  return <Component {...rest} />;
};

export default PrivateRoute;
/* 
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  const mustBeAuthenticatePathes=["/dashboard","/update-profile"]
  const mustBeNotAuthenticatePathes=["/auth/signIn","/auth/signUp"]
// doesnt matter to be authenticate "/"
  return currentUser ? <Component {...rest} /> : <Navigate to="/auth/signIn" />;
};

export default PrivateRoute;

*/
