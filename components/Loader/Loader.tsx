import Image from "next/image";
import React from "react";
import Logo from "../../public/images/logo (1).png";

const Loader = () => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50"
      style={{ zIndex: 9999 }}
    >
      <Image src={Logo} alt="Loading..." className="animate-pulse" />
    </div>
  );
};

export default Loader;
