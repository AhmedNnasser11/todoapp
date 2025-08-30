import React from "react";
import { Typography } from "@mui/material";
import { CiTrash } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";
import "./todoItemStyle.css";

const TodoItem = () => {
  return (
    <div className="todo-item-wrapper">
      <Typography variant="h6" component="h6">
        design landing page
      </Typography>
      <Typography component="p">
        design landing page create using html css and js
      </Typography>

      <div className="todo-item-buttons">
        <button>
          <MdOutlineEdit size={20} />
        </button>

        <button>
          <CiTrash size={20} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
