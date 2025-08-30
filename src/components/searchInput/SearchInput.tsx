import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import "./searchInputStyle.css";

const SearchInput = () => {
  return (
    <div className="search-input-component-wrapper">
      <IoSearchSharp className="search-icon" size={20} />
      <input type="text" placeholder="Search By Task Name Or Description" className="search-input" />
    </div>
  );
};

export default SearchInput;
