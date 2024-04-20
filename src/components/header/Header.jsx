import React from "react";
import NavItems from "./navItems/NavItems";
import { useSelector } from "react-redux";

// Header component for rendering the header of the application
const Header = () => {
  // getting the dark mode state from the redux store
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  return (
    // Header container with dynamic classes based on the darkMode state
    <div
      className={`header lg:flex lg:justify-between lg:items-center flex-col lg:flex-row py-5  fixed top-0 w-full left-0 z-50 ${
        isDarkMode
          ? "bg-bgCard text-white transition duration-500"
          : "bg-pink-50 border border-solid border-pink-100 transition duration-500"
      } shadow-lg px-4 `}
    >
      {/* Application logo */}
      <span className="lg:border-none border-b-2 border-b-logoColor text-logoColor text-4xl font-bold mb-2 sm:mb-1">
        YONOHA
      </span>

      {/* Navigation items component */}
      <NavItems />
    </div>
  );
};

export default Header;
