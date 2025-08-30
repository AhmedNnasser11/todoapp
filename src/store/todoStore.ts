// Types for todo application
export type TodoColumn = 'todo' | 'in-progress' | 'done';

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  column: TodoColumn;
}

// We're now using React Query for server state management
// This file only contains types and can be extended for client-side state if needed
