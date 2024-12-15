import { mockNotes } from '@/data/mock-notes';
import { create } from 'zustand';

type State = {
  notes: Note[];
};

type Action = {
  addNote: (newNote: Note) => void;
  updateNote: (updatedNote: Note) => void;
  removeNote: (noteId: number) => void;
  setNotes: (notes: Note[]) => void;
};

export const useNotesStore = create<State & Action>((set) => ({
  notes: [],
  addNote: (newNote: Note) => set((state) => ({ notes: [...state.notes, newNote] })),
  updateNote: (updatedNote: Note) => set((state) => ({ notes: state.notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)) })),
  removeNote: (noteId) => set((state) => ({ notes: state.notes.filter((note) => note.id !== noteId) })),
  setNotes: (notes) => set({ notes }),
}));
