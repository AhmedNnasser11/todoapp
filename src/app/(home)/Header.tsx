'use client';

import SearchInput from "@/components/searchInput/SearchInput";
import { Button } from "@mui/material";
import React, { useState } from "react";
import TodoModal from "@/components/TodoModal/TodoModal";
import "./homeStyles.css";

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="home-header">
      <div className="container">
        <div className="home-inputs-wrapper">
          <SearchInput />
          <Button variant="contained" onClick={handleOpenModal}>
            Add Task
          </Button>
        </div>
      </div>
      
      <TodoModal
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Header;
