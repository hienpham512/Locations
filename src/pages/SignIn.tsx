import React from "react";
import { signIn } from "../actions/user";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = ({}) => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const navigate = useNavigate();

  console.log(import.meta.env.VITE_FIREBASE_API_KEY);

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input
        type="email"
        placeholder="email"
        className="border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className="border p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="border p-2" onClick={handleSignIn}>
        Sign Up
      </button>
    </div>
  );
};

export default SignIn;
