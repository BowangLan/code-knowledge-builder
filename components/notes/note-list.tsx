'use client';

import React from 'react';
import { Note } from '@/types';
import NoteItem from './note-item';
import { useNotesStore } from '@/store/notes-store';

interface NoteListProps {
  //notes: Note[];
}

const NoteList: React.FC<NoteListProps> = () => {
    const { notes } = useNotesStore();

  return (
    <div className="w-full h-screen bg-zinc-300">
      <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 p-10 w-[90%]" >
        {notes.length > 0 ? (
          notes.map(note => (
            <NoteItem
              key={note.id}
              note={note}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No notes available.</p>
        )}
      </div>
    </div>
  );
};

export default NoteList;
