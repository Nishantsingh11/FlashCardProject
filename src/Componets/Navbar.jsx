import React from 'react';
import logo from "../img/logo.png";

const Navbar = () => {
  return (
    <div className='border-2 bg-white w-screen h-20 shadow-gray-500 shadow-sm flex items-center'>
      <img src={logo} alt="Almabetter Img" className='h-10' />
    </div>
  );
}

export default Navbar;
