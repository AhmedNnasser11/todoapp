"use client"
import React, { useState } from "react";
import { Typography } from "@mui/material";
import { CiTrash } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";
import useTodoStore, { TodoItem as TodoItemType } from "@/store/todoStore";
import TodoModal from "@/components/TodoModal/TodoModal";
import "./todoItemStyle.css";

interface TodoItemProps {
  todo: TodoItemType;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { deleteTodo } = useTodoStore();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <div className="todo-item-wrapper">
      <Typography variant="h6" component="h6">
        {todo.title}
      </Typography>
      <Typography component="p">
        {todo.description}
      </Typography>

      <div className="todo-item-buttons">
        <button onClick={handleEdit}>
          <MdOutlineEdit size={20} />
        </button>

        <button onClick={handleDelete}>
          <CiTrash size={20} />
        </button>
      </div>
      
      <TodoModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        editTodo={todo}
      />
    </div>
  );
};

export default TodoItem;
