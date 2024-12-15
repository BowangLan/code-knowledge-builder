import { create } from 'zustand';

type State = {
  notes: Note[];
};

type Action = {
  addNotes: (newNotes: Note[]) => void;
  updateNote: (updatedNote: Note) => void;
  removeNote: (noteId: number) => void;
  setNotes: (notes: Note[]) => void;
};

export const useNotesStore = create<State & Action>((set, get) => ({
  notes: [],
  addNotes: (newNotes: Note[]) => {
    const newData = [...get().notes, ...newNotes];
    newData.sort((a, b) => b.createdAt.getTime() - a.updatedAt.getTime());
    set({ notes: newData });
  },
  updateNote: (updatedNote: Note) => set((state) => ({ notes: state.notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)) })),
  removeNote: (noteId) => set((state) => ({ notes: state.notes.filter((note) => note.id !== noteId) })),
  setNotes: (notes) => set({ notes }),
}));
