"use client";

import * as React from "react";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { PlusCircle, X } from "lucide-react";
import { useNotesStore } from "@/store/notes-store";

export function CreateNoteModal() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [generatedNote, setGeneratedNote] = useState<
    {
      title: string;
      content: string;
      generated_note: string;
      id: string;
    }[] | null
  >(null);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/note/ai-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: code }),
      });

      if (!response.ok) throw new Error("Failed to create note");

      const data = await response.json();
      if (data.success && data.notes?.[0]) {
        setGeneratedNote(data.notes);
        setOpen(false); // Close create modal
        setShowNoteModal(true); // Show note display modal
        useNotesStore.getState().addNotes(data.notes);
      } else {
        throw new Error(data.message || "Failed to create note");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <Button
            className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0"
            size="icon"
          >
            <PlusCircle className="h-6 w-6" />
          </Button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg bg-background rounded-lg p-6">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Create Code Note
            </Dialog.Title>

            <Dialog.Description className="text-sm text-muted-foreground mb-4">
              Paste your code below and I'll create a note.
            </Dialog.Description>

            <Textarea
              placeholder="Paste your note here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[200px] mb-4"
            />

            <div className="flex justify-end gap-2">
              <Dialog.Close asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.Close>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Analyzing..." : "Create Note"}
              </Button>
            </div>

            <Dialog.Close asChild>
              <button
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Note Display Modal */}
      <Dialog.Root open={showNoteModal} onOpenChange={setShowNoteModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-2xl bg-background rounded-lg p-6">
            {generatedNote && (
              <>
                <Dialog.Title className="text-xl font-semibold mb-4">
                  Successfully Generated {generatedNote.length} Notes
                </Dialog.Title>

                <div className="pt-2 pb-6 max-h-[400px] overflow-y-scroll">
                  {generatedNote?.map((n, i) => {
                    return (
                      <div key={i} className="py-2 flex flex-row">
                        <div className="mr-3 font-medium text-sm">{i + 1}</div>
                        <div className="flex-1 flex flex-col">
                          <h3 className="text-sm">{n.title}</h3>
                          <div className="pt-1 text-xs text-muted-foreground">
                            {n.content}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowNoteModal(false)}
                  >
                    Close
                  </Button>
                </div>
              </>
            )}

            <Dialog.Close asChild>
              <button
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                aria-label="Close"
                onClick={() => setShowNoteModal(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
