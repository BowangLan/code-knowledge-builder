"use client";

import { useNotesStore } from "@/store/notes-store";
import React from "react";

export default function DataLoader({ notes }: { notes: Note[] }) {
  React.useEffect(() => {
    useNotesStore.getState().setNotes(notes);
  }, [notes]);

  return null;
}
