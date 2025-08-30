// /api/todos/[id]/route.ts - Vercel compatible version
import { NextRequest, NextResponse } from 'next/server';
import { updateTodo, deleteTodo } from '@/lib/db';

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

// PUT /api/todos/[id] - Update a todo
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await getParams(context.params);
    const body = await request.json();
    const { title, description, column } = body;

    const updatedTodo = await updateTodo(id, {
      ...(title && { title }),
      ...(description && { description }),
      ...(column && { column }),
    });

    if (!updatedTodo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ todo: updatedTodo });
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

// DELETE /api/todos/[id] - Delete a todo
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await getParams(context.params);
    
    const deleted = await deleteTodo(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}
