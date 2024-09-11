import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail as firebaseUpdateEmail,
  updatePassword as firebaseUpdatePassword,
  sendEmailVerification as firebaseSendEmailVerification,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // Google Sign-In function using redirect
  const googleSignIn = () => {
    console.log("Starting Google Sign-In");
    return signInWithRedirect(auth, googleProvider);
  };

  const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const signOut = () => firebaseSignOut(auth);
  const passwordReset = (email) => sendPasswordResetEmail(auth, email);
  const userReauthentication = (email, password) => {
    const credential = EmailAuthProvider.credential(email, password);
    return reauthenticateWithCredential(currentUser, credential);
  };
  const updateEmail = (email) => firebaseUpdateEmail(currentUser, email);
  const updatePassword = (password) => firebaseUpdatePassword(currentUser, password);
  const sendEmailVerification = () => firebaseSendEmailVerification(currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth state changed. Current user:", user);
      setCurrentUser(user);
      setLoading(false);
    });

    // Ensure getRedirectResult is called after auth state changes
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          console.log("Google redirect result:", result);
          setCurrentUser(result.user);
        } else {
          console.log("No redirect result found");
        }
      })
      .catch((error) => {
        console.error("Error getting redirect result:", error);
      });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    googleSignIn,
    signUp,
    signIn,
    signOut,
    passwordReset,
    userReauthentication,
    updateEmail,
    updatePassword,
    sendEmailVerification,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
/* import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unSubscribe;
  }, []);
  const value = { currentUser, signUp };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
 */
