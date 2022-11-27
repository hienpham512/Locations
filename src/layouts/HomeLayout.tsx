import React from "react";
import { useNavigate, useOutlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { signout } from "../actions/user";
import {
  TableCellsIcon,
  MapIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";

const HomeLayout: React.FC = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/auth/signin");
    });
  }, []);
  const outlet = useOutlet();
  return (
    <div>
      <div className="grid grid-cols-12 h-screen">
        <div className="flex flex-col justify-between space-y-5 col-span-2 py-4 shadow-xl">
          <span
            onClick={() => navigate("/")}
            className="text-3xl text-cyan-700 font-semibold border p-5 shadow-lg rounded-lg mx-auto cursor-pointer hover:scale-110 duration-300">
            CANOPY
          </span>
          <div className="grid grid-cols-1 gap-5">
            <div className="flex items-center gap-3 group">
              <div
                className={`w-2 h-full border-r-[5px] border-cyan-800 rounded-full ${
                  location.pathname === "/" || location.pathname === "/table"
                    ? "scale-100"
                    : "group-hover:scale-75 scale-0"
                } transition-all ease-in `}
              />
              <button
                onClick={() => navigate("/table")}
                className={`border py-2 shadow-lg flex items-center space-x-2 px-6 rounded-lg drop-shadow-lg hover:scale-110 duration-300 ${
                  location.pathname === "/" || location.pathname === "/table"
                    ? "bg-cyan-800 text-white boder-cyan-800"
                    : ""
                }`}>
                <TableCellsIcon className="h-6" />
                <span>Table</span>
              </button>
            </div>
            <div className="flex items-center gap-3 group">
              <div
                className={`w-2 h-full border-r-[5px] border-cyan-800 rounded-full ${
                  location.pathname === "/plan"
                    ? "scale-100"
                    : "group-hover:scale-75 scale-0"
                } transition-all ease-in `}
              />
              <button
                onClick={() => navigate("/plan")}
                className={`border py-2 shadow-lg flex items-center space-x-2 px-7 rounded-lg drop-shadow-lg hover:scale-110 duration-300 ${
                  location.pathname === "/plan"
                    ? "bg-cyan-800 text-white boder-cyan-800"
                    : ""
                }`}>
                <MapIcon className="h-6" />
                <span>Plan</span>
              </button>
            </div>
          </div>
          <button
            onClick={signout}
            className="border-2 border-cyan-800 ring-2 ring-offset-2 ring-cyan-800 py-2 shadow-lg flex items-center space-x-2 px-5 rounded-lg drop-shadow-lg hover:scale-110 duration-300 mx-10 justify-center">
            <ArrowLeftOnRectangleIcon className="h-6" />
            Sign out
          </button>
        </div>
        <div className="col-span-10 borders">{outlet}</div>
      </div>
    </div>
  );
};

export default HomeLayout;
