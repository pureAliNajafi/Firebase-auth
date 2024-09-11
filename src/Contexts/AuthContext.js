import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase"; // Without default import since it's now a named export
import {
  GoogleAuthProvider,
  signInWithPopup, // For Google sign-in
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

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  console.log("daymnnn");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  // no need to use async, Firebase's authentication methods are already asynchronous and return Promises.

  const googleSignIn = () => signInWithPopup(auth, googleProvider);

  const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const signOut = () => firebaseSignOut(auth);
  const passwordReset = (email) => sendPasswordResetEmail(auth, email);
  const userReauthentication = (email, password) => {
    const credential = EmailAuthProvider.credential(email, password);
    return reauthenticateWithCredential(currentUser, credential); // Return the promise, handle in form
  };
  const updateEmail = (email) => firebaseUpdateEmail(currentUser, email);
  const updatePassword = (password) => firebaseUpdatePassword(currentUser, password);
  const sendEmailVerification = () => firebaseSendEmailVerification(currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
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
