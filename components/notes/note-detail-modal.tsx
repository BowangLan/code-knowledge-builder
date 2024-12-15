"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { create } from "zustand";
import { formatIsoDate } from "./note-item";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

type NoteModalState = {
  note: Note | null;
  isOpen: boolean;
  open: (note: Note) => void;
  close: () => void;
};

export const useNoteModal = create<NoteModalState>((set) => ({
  note: null,
  isOpen: false,
  open: (note) => set({ note, isOpen: true }),
  close: () => set({ note: null, isOpen: false }),
}));

export function NoteModalWrapperButton({
  note,
  children,
}: {
  note: Note;
  children: React.ReactNode;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="cursor-pointer"
      onClick={() => {
        useNoteModal.getState().open(note);
      }}
    >
      {children}
    </div>
  );
}

export const NoteModalContent = () => {
  const editor = useCreateBlockNote();
  const isOpen = useNoteModal((state) => state.isOpen);
  const note = useNoteModal((state) => state.note);
  const close = useNoteModal((state) => state.close);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          close();
        }
      }}
    >
      {!!note && (
        <DialogContent>
          <DialogTitle>{note.title}</DialogTitle>
          <div>{note.content}</div>
          {/* <BlockNoteView editor={editor}  content={note.content} /> */}
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div>
            <button
              onClick={(e) => {}}
              className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out p-2"
            >
              Save changes
            </button>
            <div className="text-right text-sm text-gray-500 mt-4 md:mt-0 md:ml-4">
              {formatIsoDate(note.createdAt.toDateString())}
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};
