import fs from 'fs/promises';
import path from 'path';
import { TodoItem } from '@/store/todoStore';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'todos.json');

export interface TodoDatabase {
  todos: TodoItem[];
}

export async function readTodos(): Promise<TodoItem[]> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const db: TodoDatabase = JSON.parse(data);
    return db.todos;
  } catch (error) {
    console.error('Error reading todos:', error);
    // Return empty array if file doesn't exist or is corrupted
    return [];
  }
}

export async function writeTodos(todos: TodoItem[]): Promise<void> {
  try {
    const db: TodoDatabase = { todos };
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing todos:', error);
    throw new Error('Failed to save todos');
  }
}

export async function addTodo(todo: Omit<TodoItem, 'id'>): Promise<TodoItem> {
  const todos = await readTodos();
  const newTodo: TodoItem = {
    ...todo,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
  };
  
  todos.push(newTodo);
  await writeTodos(todos);
  
  return newTodo;
}

export async function updateTodo(id: string, updates: Partial<Omit<TodoItem, 'id'>>): Promise<TodoItem | null> {
  const todos = await readTodos();
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return null;
  }
  
  todos[todoIndex] = { ...todos[todoIndex], ...updates };
  await writeTodos(todos);
  
  return todos[todoIndex];
}

export async function deleteTodo(id: string): Promise<boolean> {
  const todos = await readTodos();
  const filteredTodos = todos.filter(todo => todo.id !== id);
  
  if (filteredTodos.length === todos.length) {
    return false; // Todo not found
  }
  
  await writeTodos(filteredTodos);
  return true;
}

export async function moveTodo(id: string, newColumn: TodoItem['column']): Promise<TodoItem | null> {
  return updateTodo(id, { column: newColumn });
}
