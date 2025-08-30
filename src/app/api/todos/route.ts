// /api/todos/route.ts (with search filter added)
import { NextRequest, NextResponse } from 'next/server';
import { readTodos, addTodo } from '@/lib/db';

// GET /api/todos - Fetch all todos with optional search filter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    
    let todos = await readTodos();
    
    // Filter todos if search parameter is provided
    if (search) {
      const searchLower = search.toLowerCase();
      todos = todos.filter(todo => 
        todo.title.toLowerCase().includes(searchLower) ||
        todo.description.toLowerCase().includes(searchLower)
      );
    }
    
    return NextResponse.json({ todos });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

// POST /api/todos - Create a new todo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, column } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const newTodo = await addTodo({
      title,
      description,
      column: column || 'todo',
    });

    return NextResponse.json({ todo: newTodo }, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}