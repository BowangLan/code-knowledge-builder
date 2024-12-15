"use client";

import React from "react";
import NoteItem from "./note-item";
import { useNotesStore } from "@/store/notes-store";

interface NoteListProps {
  //notes: Note[];
}

const NoteList: React.FC<NoteListProps> = () => {
  const { notes } = useNotesStore();

  return (
    <div className="w-full h-screen bg-zinc-100 max-h-screen overflow-y-auto">
      <div
        className="max-w-6xl mx-auto grid px-4 sm:px-6 lg:px-8 p-10 gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {notes.length > 0
          ? (
            notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
              />
            ))
          )
          : <p className="text-center text-gray-500">No notes available.</p>}
      </div>
    </div>
  );
};

export default NoteList;
