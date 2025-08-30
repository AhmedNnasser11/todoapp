// /api/todos/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { updateTodo, deleteTodo } from '@/lib/db';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// PUT /api/todos/[id] - Update a todo
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params; // Await the params Promise
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
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params; // Await the params Promise
    
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
