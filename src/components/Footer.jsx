import React from "react";
import { FaHeart } from "react-icons/fa";
const Footer = () => {
  return (
    <div className=" bg-gray-800 text-white flex justify-center items-center px-10 flex-col bottom-0">
      <h1 className="text-lg">
        <span className="text-green-500"> &lt;</span>Pass
        <span className="text-green-500">OP/&gt;</span>
      </h1>
      <h1 className="flex items-center justify-center">
        Created with <FaHeart className="mx-2" /> by Daksh
      </h1>
    </div>
    
  );
};

export default Footer;
