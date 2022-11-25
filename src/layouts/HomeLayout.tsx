import React from "react";
import { useNavigate, useOutlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const HomeLayout: React.FC = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/auth/signin");
    });
  }, []);
  const outlet = useOutlet();
  return <div>{outlet}</div>;
};

export default HomeLayout;
