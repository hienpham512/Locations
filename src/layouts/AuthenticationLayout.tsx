import React from "react";
import { useOutlet } from "react-router-dom";

interface IAuthenticationLayoutProps {}

const AuthenticationLayout: React.FC<IAuthenticationLayoutProps> = ({}) => {
  const outlet = useOutlet();
  return <>{outlet}</>;
};

export default AuthenticationLayout;
