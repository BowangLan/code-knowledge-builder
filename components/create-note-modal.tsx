'use client'

import * as React from 'react'
import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { PlusCircle, X } from 'lucide-react'

export function CreateNoteModal() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [generatedNote, setGeneratedNote] = useState<{
    title: string;
    content: string;
    generated_note: string;
    id: string;
  } | null>(null)

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/note/ai-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: code }),
      })
      
      if (!response.ok) throw new Error('Failed to create note')
      
      const data = await response.json()
      if (data.success && data.notes?.[0]) {
        setGeneratedNote(data.notes[0])
        setOpen(false) // Close create modal
        setShowNoteModal(true) // Show note display modal
      } else {
        throw new Error(data.message || 'Failed to create note')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

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
                {isLoading ? 'Analyzing...' : 'Create Note'}
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
                  {generatedNote.title}
                </Dialog.Title>
                
                <div className="space-y-4 mb-4">
                  <div className="prose dark:prose-invert max-w-none">
                    <h3 className="text-lg font-medium">Original Content</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-auto">
                      <code>{generatedNote.content}</code>
                    </pre>
                  </div>

                  <div className="prose dark:prose-invert max-w-none">
                    <h3 className="text-lg font-medium">Generated Notes</h3>
                    <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap">
                      {generatedNote.generated_note}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowNoteModal(false)}>
                    Close
                  </Button>
                  <Button onClick={() => window.location.href = `/notes/${generatedNote.id}`}>
                    View Full Note
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
  )
}