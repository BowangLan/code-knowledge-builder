import { mockNotes } from '@/data/mock-notes';
import { Note } from '@/types';
import { create } from 'zustand';

type State = {
    notes: Note[];
};

type Action = {
    addNote: (newNote: Note) => void;
    updateNote: (updatedNote: Note) => void;
    removeNote: (noteId: number) => void;
};

export const useNotesStore = create<State & Action>((set) => ({
  notes: mockNotes, // temporary mock data
  addNote: (newNote: Note) => set((state) => ({ notes: [...state.notes, newNote] })),
  updateNote: (updatedNote: Note) => set((state) => ({ notes: state.notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)) })),
  removeNote: (noteId) => set((state) => ({ notes: state.notes.filter((note) => note.id !== noteId) })),
}));
