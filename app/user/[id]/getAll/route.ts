import { NextResponse } from 'next/server';
import { getNotesByUser } from '@/lib/db/queries/note_queries';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json({ error: 'No user ID provided' }, { status: 400 });
  }

  try {
    const notes = await getNotesByUser(params.id);
    if (notes.length === 0) {
      return NextResponse.json({ message: 'No notes found for this user' }, { status: 404 });
    }
    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}