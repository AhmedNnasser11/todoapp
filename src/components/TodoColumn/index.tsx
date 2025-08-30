import React from "react";
import { Typography } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TodoColumn as TodoColumnType, TodoItem } from "@/store/todoStore";
import "./TodoColumnStyle.css";

interface TodoColumnProps {
  title: string;
  columnId: TodoColumnType;
  todos: TodoItem[];
  children: React.ReactNode;
}

const TodoColumn: React.FC<TodoColumnProps> = ({ title, columnId, todos, children }) => {
  const { setNodeRef } = useDroppable({
    id: columnId,
  });

  const todoIds = todos.map((todo) => todo.id);

  return (
    <div className="todo-column-wrapper">
      <Typography align="center" variant="h5" component="h5">
        {title}
      </Typography>
      <div className="container">
        <div className="todo-column" ref={setNodeRef}>
          <SortableContext items={todoIds} strategy={verticalListSortingStrategy}>
            {children}
          </SortableContext>
        </div>
      </div>
    </div>
  );
};

export default TodoColumn;
