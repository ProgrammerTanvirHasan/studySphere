import { createContext, useEffect } from "react";
import { useState } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import app from "./firebase.confiq";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = (googleProvider) => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const loggedOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        axios
          .post(
            `https://stydy-sphere-server.vercel.app/jwt`,
            { email: user.email },
            {
              withCredentials: true,
            }
          )
          .then(() => {});
      } else {
        axios
          .post(`https://stydy-sphere-server.vercel.app/logOut`, null, {
            withCredentials: true,
          })
          .then(() => {});
      }
      setUser(user);
      setLoading(false);
    });

    return () => {
      return unSubscribe();
    };
  }, []);

  const info = {
    user,
    setUser,
    loading,
    createUser,
    signUser,
    loggedOut,
    googleSignIn,
  };
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
