import React from "react";
import Topbar from "../layout/Topbar";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className=" fixed top-0 left-0 w-full z-50 border-b border-gray-200 shadow-md">
      {/* Topbar */}
      <Topbar />
      {/* Navbar */}
      <Navbar />
      {/* Cart Drawer */}
    </header>
  );
};

export default Header;
