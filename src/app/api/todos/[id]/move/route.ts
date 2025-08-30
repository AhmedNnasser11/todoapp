import { NextRequest, NextResponse } from 'next/server';
import { moveTodo } from '@/lib/db';
import { TodoColumn } from '@/store/todoStore';

// PATCH /api/todos/[id]/move - Move a todo to a different column
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { column } = body;

    if (!column || !['todo', 'in-progress', 'done'].includes(column)) {
      return NextResponse.json(
        { error: 'Valid column is required (todo, in-progress, done)' },
        { status: 400 }
      );
    }

    const movedTodo = await moveTodo(id, column as TodoColumn);

    if (!movedTodo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ todo: movedTodo });
  } catch (error) {
    console.error('Error moving todo:', error);
    return NextResponse.json(
      { error: 'Failed to move todo' },
      { status: 500 }
    );
  }
}