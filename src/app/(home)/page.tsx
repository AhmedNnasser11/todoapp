'use client';

import React from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import TodoColumn from "@/components/TodoColumn";
import Header from "./Header";
import DraggableTodoItem from "@/components/DraggableTodoItem/DraggableTodoItem";
import TodoItem from "@/components/todoItem";
import { TodoColumn as TodoColumnType, TodoItem as TodoItemType } from "@/store/todoStore";
import { useTodos, useMoveTodo } from "@/hooks/useTodos";
import "./homeStyles.css";

export default function Home() {
  const { data: todos = [], isLoading } = useTodos();
  const moveTodoMutation = useMoveTodo();
  const [activeTodo, setActiveTodo] = React.useState<TodoItemType | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

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
      moveTodoMutation.mutate({ id: activeId, column: targetColumn.id });
      return;
    }
    
    // If dropped over another todo item, get the column of that item
    const targetTodo = todos.find(todo => todo.id === overId);
    if (targetTodo && targetTodo.column !== todos.find(todo => todo.id === activeId)?.column) {
      moveTodoMutation.mutate({ id: activeId, column: targetTodo.column });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="todo-column-container">
          {todoColumns.map((column) => {
            const columnTodos = todos.filter(todo => todo.column === column.id);
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
