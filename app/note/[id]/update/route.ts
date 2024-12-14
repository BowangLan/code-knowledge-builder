import { NextResponse } from 'next/server';
import { updateNoteById } from '@/lib/db/queries/note_queries';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content } = await request.json();

    // Check if at least one of title or content is provided
    if (!title && !content) {
      return NextResponse.json(
        { error: 'At least one of title or content is required' },
        { status: 400 }
      );
    }

    // Update the note with the new title and/or content
    const updateResult = await updateNoteById(params.id, { title, content });

    if (!updateResult) {
      return NextResponse.json(
        { error: 'Note not found or update failed' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Note updated successfully',
      updatedNote: updateResult
    });
  } catch (error: unknown) {
    console.error('Error:', error);
    return NextResponse.json(
      {
        message: 'Error updating note',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}