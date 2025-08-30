import { create } from 'zustand';

export type TodoColumn = 'todo' | 'in-progress' | 'done';

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  column: TodoColumn;
}

interface TodoStore {
  todos: TodoItem[];
  addTodo: (todo: Omit<TodoItem, 'id'>) => void;
  updateTodo: (id: string, updates: Partial<TodoItem>) => void;
  deleteTodo: (id: string) => void;
  moveTodo: (id: string, newColumn: TodoColumn) => void;
  getTodosByColumn: (column: TodoColumn) => TodoItem[];
}

const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [
    // Sample data
    {
      id: '1',
      title: 'Design landing page',
      description: 'Create a beautiful landing page using HTML, CSS and JS',
      column: 'todo',
    },
    {
      id: '2',
      title: 'Setup database',
      description: 'Configure PostgreSQL database for the application',
      column: 'todo',
    },
    {
      id: '3',
      title: 'API Development',
      description: 'Build REST API endpoints for user management',
      column: 'in-progress',
    },
    {
      id: '4',
      title: 'User Authentication',
      description: 'Implement JWT-based authentication system',
      column: 'in-progress',
    },
    {
      id: '5',
      title: 'Project Setup',
      description: 'Initial project configuration and dependencies',
      column: 'done',
    },
  ],
  
  addTodo: (todo) => {
    const newTodo: TodoItem = {
      ...todo,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    set((state) => ({
      todos: [...state.todos, newTodo],
    }));
  },

  updateTodo: (id, updates) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      ),
    }));
  },

  deleteTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },

  moveTodo: (id, newColumn) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, column: newColumn } : todo
      ),
    }));
  },

  getTodosByColumn: (column) => {
    return get().todos.filter((todo) => todo.column === column);
  },
}));

export default useTodoStore;
