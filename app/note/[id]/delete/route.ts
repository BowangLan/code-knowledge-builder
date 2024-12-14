import { NextResponse } from 'next/server';
import { deleteNoteById } from '@/lib/db/queries/note_queries';

export async function POST(request: Request, context: { params: { id: string } }) {
  try {
    const { params } = context;
    const { id } = params; // Access params inside the async function

    // Execute the delete query without reading the body
    const deleteResult = await deleteNoteById(id).execute();

    if (deleteResult) {
      return NextResponse.json({ message: 'Note deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    }

  } catch (error: unknown) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}