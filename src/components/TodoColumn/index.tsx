import React from "react";
import { Typography } from "@mui/material";
import "./TodoColumnStyle.css";

const TodoColumn = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="todo-column-wrapper">
      <Typography align="center" variant="h5" component="h5">
        {title}
      </Typography>
      <div className="container">
        <div className="todo-column">{children}</div>
      </div>
    </div>
  );
};

export default TodoColumn;
