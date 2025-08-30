"use client"
import React from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import TodoColumn from "@/components/TodoColumn";
import Header from "./Header";
import DraggableTodoItem from "@/components/DraggableTodoItem/DraggableTodoItem";
import TodoItem from "@/components/todoItem";
import useTodoStore, { TodoColumn as TodoColumnType, TodoItem as TodoItemType } from "@/store/todoStore";
import "./homeStyles.css";

export default function Home() {
  const { todos, moveTodo, getTodosByColumn } = useTodoStore();
  const [activeTodo, setActiveTodo] = React.useState<TodoItemType | null>(null);

  const todoColumns: { id: TodoColumnType; title: string }[] = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ];

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const todo = todos.find((t) => t.id === active.id);
    setActiveTodo(todo || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveTodo(null);
    
    if (!over) return;
    
    const activeId = active.id as string;
    const overId = over.id as string;
    
    // Check if dropped over a column
    const targetColumn = todoColumns.find(col => col.id === overId);
    if (targetColumn) {
      moveTodo(activeId, targetColumn.id);
      return;
    }
    
    // If dropped over another todo item, get the column of that item
    const targetTodo = todos.find(todo => todo.id === overId);
    if (targetTodo && targetTodo.column !== todos.find(todo => todo.id === activeId)?.column) {
      moveTodo(activeId, targetTodo.column);
    }
  };

  return (
    <div>
      <Header />
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="todo-column-container">
          {todoColumns.map((column) => {
            const columnTodos = getTodosByColumn(column.id);
            return (
              <TodoColumn
                key={column.id}
                title={column.title}
                columnId={column.id}
                todos={columnTodos}
              >
                {columnTodos.map((todo) => (
                  <DraggableTodoItem key={todo.id} todo={todo} />
                ))}
              </TodoColumn>
            );
          })}
        </div>
        
        <DragOverlay>
          {activeTodo ? <TodoItem todo={activeTodo} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
