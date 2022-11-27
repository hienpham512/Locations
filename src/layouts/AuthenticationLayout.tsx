import React from "react";
import { auth } from "../firebase/firebase";
import { useOutlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

interface IAuthenticationLayoutProps {}

const AuthenticationLayout: React.FC<IAuthenticationLayoutProps> = ({}) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) navigate("/");
    });
  }, []);
  const outlet = useOutlet();
  return <>{outlet}</>;
};

export default AuthenticationLayout;
