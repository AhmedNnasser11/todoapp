'use client';

import React, { useState } from "react";
import { Typography } from "@mui/material";
import { CiTrash } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";
import { TodoItem as TodoItemType } from "@/store/todoStore";
import { useDeleteTodo } from "@/hooks/useTodos";
import TodoModal from "@/components/TodoModal/TodoModal";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";
import "./todoItemStyle.css";

interface TodoItemProps {
  todo: TodoItemType;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const deleteTodoMutation = useDeleteTodo();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Edit clicked for todo:', todo.id);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Delete clicked for todo:', todo.id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTodoMutation.mutateAsync(todo.id);
      setDeleteConfirmOpen(false);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <div className="todo-item-wrapper">
      <div className="todo-item-content">
        <Typography variant="h6" component="h6">
          {todo.title}
        </Typography>
        <Typography component="p">
          {todo.description}
        </Typography>
      </div>

      <div 
        className="todo-item-buttons" 
        style={{ pointerEvents: 'all' }}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button onClick={handleEdit}>
          <MdOutlineEdit size={20} />
        </button>

        <button onClick={handleDeleteClick}>
          <CiTrash size={20} />
        </button>
      </div>
      
      <TodoModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        editTodo={todo}
      />
      
      <ConfirmDialog
        open={deleteConfirmOpen}
        title="Delete Todo"
        message={`Are you sure you want to delete "${todo.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
      />
    </div>
  );
};

export default TodoItem;
