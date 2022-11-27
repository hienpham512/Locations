import React from "react";
import { signIn } from "../actions/user";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = ({}) => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white border rounded-xl p-4 grid place-items-center h-screen w-full">
      <div className="border p-20 rounded-lg  shadow-xl">
        <div className="flex flex-col space-y-6 items-center">
          <div className="flex items-center space-x-2 shadow p-1 rounded-lg hover:scale-110 duration-300">
            <span className="font-light">Welcome to</span>
            <span className="text-2xl text-cyan-700 font-semibold">CANOPY</span>
          </div>
          <span className="text-xl text-sky-900">Sign in</span>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="border p-2 rounded-md shadow-lg bg-sky-800 text-white hover:scale-110 duration-300"
            onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
