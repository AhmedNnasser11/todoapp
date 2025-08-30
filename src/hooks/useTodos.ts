import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { TodoItem, TodoColumn } from '@/store/todoStore';
import { useToast } from '@/components/providers/ToastProvider';

const API_BASE = '/api/todos';

// API functions
const fetchTodos = async (): Promise<TodoItem[]> => {
  const response = await axios.get(API_BASE);
  return response.data.todos;
};

const createTodo = async (todo: Omit<TodoItem, 'id'>): Promise<TodoItem> => {
  const response = await axios.post(API_BASE, todo);
  return response.data.todo;
};

const updateTodo = async (id: string, updates: Partial<Omit<TodoItem, 'id'>>): Promise<TodoItem> => {
  const response = await axios.put(`${API_BASE}/${id}`, updates);
  return response.data.todo;
};

const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE}/${id}`);
};

const moveTodo = async (id: string, column: TodoColumn): Promise<TodoItem> => {
  const response = await axios.patch(`${API_BASE}/${id}/move`, { column });
  return response.data.todo;
};

// React Query hooks
export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  
  return useMutation({
    mutationFn: createTodo,
    onMutate: async (newTodo: Omit<TodoItem, 'id'>) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      
      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<TodoItem[]>(['todos']);
      
      // Create a temporary todo with a placeholder ID
      const tempTodo: TodoItem = {
        ...newTodo,
        id: `temp-${Date.now()}`,
      };
      
      // Optimistically update to the new value
      queryClient.setQueryData<TodoItem[]>(['todos'], (old) => {
        if (!old) return [tempTodo];
        return [...old, tempTodo];
      });
      
      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onSuccess: () => {
      showToast('Todo created successfully!', 'success');
    },
    onError: (err, newTodo, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      showToast('Failed to create todo. Please try again.', 'error');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Omit<TodoItem, 'id'>> }) =>
      updateTodo(id, updates),
    onMutate: async ({ id, updates }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      
      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<TodoItem[]>(['todos']);
      
      // Optimistically update to the new value
      queryClient.setQueryData<TodoItem[]>(['todos'], (old) => {
        if (!old) return [];
        return old.map((todo) =>
          todo.id === id ? { ...todo, ...updates } : todo
        );
      });
      
      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onSuccess: () => {
      showToast('Todo updated successfully!', 'success');
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      showToast('Failed to update todo. Please try again.', 'error');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  
  return useMutation({
    mutationFn: deleteTodo,
    onMutate: async (id: string) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      
      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<TodoItem[]>(['todos']);
      
      // Optimistically update to the new value
      queryClient.setQueryData<TodoItem[]>(['todos'], (old) => {
        if (!old) return [];
        return old.filter((todo) => todo.id !== id);
      });
      
      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onSuccess: () => {
      showToast('Todo deleted successfully!', 'success');
    },
    onError: (err, id, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      showToast('Failed to delete todo. Please try again.', 'error');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useMoveTodo = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  
  return useMutation({
    mutationFn: ({ id, column }: { id: string; column: TodoColumn }) =>
      moveTodo(id, column),
    onMutate: async ({ id, column }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      
      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<TodoItem[]>(['todos']);
      
      // Optimistically update to the new value
      queryClient.setQueryData<TodoItem[]>(['todos'], (old) => {
        if (!old) return [];
        return old.map((todo) =>
          todo.id === id ? { ...todo, column } : todo
        );
      });
      
      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      showToast('Failed to move todo. Please try again.', 'error');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

// Helper hook to get todos by column
export const useTodosByColumn = (column: TodoColumn) => {
  const { data: todos = [] } = useTodos();
  return todos.filter(todo => todo.column === column);
};
