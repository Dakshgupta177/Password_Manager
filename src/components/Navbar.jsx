import React from "react";
import { FaGithub } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav className="bg-purple-600 h-[10vh] text-white font-bold text-2xl flex items-center px-40 justify-between max-md:px-20 max-sm:px-5">
      <h1>
        <span className="text-green-500"> &lt;</span>Pass
        <span className="text-green-500">OP/&gt;</span>
      </h1>
      <a href="https://github.com/Dakshgupta177/Dakshgupta177" target="_blank">
        <button className="bg-green-500 p-3 flex justify-center items-center max-lg:rounded-2xl rounded-full max-md:h-10 ">
          <FaGithub />
          <span className="mx-2 text-lg max-sm:hidden ">GitHub</span>
        </button>
      </a>
    </nav>
  );
};

export default Navbar;
