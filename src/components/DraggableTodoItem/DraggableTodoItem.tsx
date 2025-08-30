'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TodoItem as TodoItemType } from '@/store/todoStore';
import TodoItem from '@/components/todoItem';

interface DraggableTodoItemProps {
  todo: TodoItemType;
}

const DraggableTodoItem: React.FC<DraggableTodoItemProps> = ({ todo }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TodoItem todo={todo} />
    </div>
  );
};

export default DraggableTodoItem;
