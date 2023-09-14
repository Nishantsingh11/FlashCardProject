import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div className="container mx-auto mt-20">
      <h2 className="text-3xl font-bold self-start table">Create FlashCard</h2>
      <div className="flex flex-row my-4">
        <Link to="/" className="mr-4 font-bold text-red-700">
          Create New
        </Link>
        <Link to="/myflasCard" className="mr-4  text-blue-700">
          My Flashcard
        </Link>
      </div>
      <hr  className='border-1 border-black'/>

    </div>
  );
};

export default Header;
