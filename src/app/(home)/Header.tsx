import SearchInput from "@/components/searchInput/SearchInput";
import { Button } from "@mui/material";
import React from "react";
import "./homeStyles.css";

const Header = () => {
  return (
    <div className="home-header">
      <div className="container">
        <div className="home-inputs-wrapper">
          <SearchInput />
          <Button variant="contained">Add Task</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
