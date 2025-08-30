"use client"
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import useTodoStore, { TodoItem, TodoColumn } from '@/store/todoStore';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface TodoModalProps {
  open: boolean;
  onClose: () => void;
  editTodo?: TodoItem | null;
}

const TodoModal: React.FC<TodoModalProps> = ({ open, onClose, editTodo }) => {
  const { addTodo, updateTodo } = useTodoStore();
  
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    column: 'todo' as TodoColumn,
  });

  useEffect(() => {
    if (editTodo) {
      setFormData({
        id: editTodo.id,
        title: editTodo.title,
        description: editTodo.description,
        column: editTodo.column,
      });
    } else {
      setFormData({
        id: '',
        title: '',
        description: '',
        column: 'todo',
      });
    }
  }, [editTodo, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<TodoColumn>) => {
    setFormData((prev) => ({
      ...prev,
      column: e.target.value as TodoColumn,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      return;
    }

    if (editTodo) {
      updateTodo(editTodo.id, {
        title: formData.title,
        description: formData.description,
        column: formData.column,
      });
    } else {
      addTodo({
        title: formData.title,
        description: formData.description,
        column: formData.column,
      });
    }

    handleClose();
  };

  const handleClose = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      column: 'todo',
    });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="todo-modal-title"
      aria-describedby="todo-modal-description"
    >
      <Box sx={style}>
        <Typography id="todo-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          {editTodo ? 'Edit Todo' : 'Add New Todo'}
        </Typography>
        
        <form onSubmit={handleSubmit}>
          {editTodo && (
            <TextField
              fullWidth
              label="ID"
              name="id"
              value={formData.id}
              disabled
              sx={{ mb: 2 }}
            />
          )}
          
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={3}
            required
            sx={{ mb: 2 }}
          />
          
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="column-select-label">Column</InputLabel>
            <Select
              labelId="column-select-label"
              id="column-select"
              value={formData.column}
              label="Column"
              onChange={handleSelectChange}
            >
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {editTodo ? 'Update' : 'Add'} Todo
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default TodoModal;
