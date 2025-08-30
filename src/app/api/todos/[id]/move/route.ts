import { NextRequest, NextResponse } from 'next/server';
import { moveTodo } from '@/lib/db';
import { TodoColumn } from '@/store/todoStore';

// Try both patterns for maximum compatibility
type RouteContext = {
  params: Promise<{ id: string }> | { id: string };
};

// Helper function to safely get params
async function getParams(params: Promise<{ id: string }> | { id: string }) {
  if (params instanceof Promise) {
    return await params;
  }
  return params;
}

// PATCH /api/todos/[id]/move - Move a todo to a different column
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await getParams(context.params);
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
