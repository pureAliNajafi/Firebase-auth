import React from "react";
import { useLocation } from "react-router-dom";
const TestAuth = ({ url }) => {
  const location = useLocation();
  const containsAuthPath = location.pathname.includes("/__/auth/");

  return (
    <div>
      {location.pathname}
      {containsAuthPath ? (
        <iframe
          src={location.pathname}
          width="100%"
          height="500px"
          title="Auth Iframe"
          style={{ border: "none" }}
        ></iframe>
      ) : (
        <p>The URL does not contain '/__/auth/'.</p>
      )}
    </div>
  );
};

export default TestAuth;
