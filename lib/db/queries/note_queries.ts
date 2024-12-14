import { desc, eq } from 'drizzle-orm';
import { note } from '../schema';
import { db } from './client';

export function getNoteById(id: string) {
  return db.select().from(note).where(eq(note.id, id));
}

export function getNotesByUser(userId: string) {
  return db.select().from(note).where(eq(note.userId, userId)).orderBy(desc(note.createdAt));
}

export function deleteNoteById(id: string) {
  return db.delete(note).where(eq(note.id, id));
}

export function createNotes(data: NoteCreateParams[], userId: string) {
  return db.insert(note).values(data.map((note) => ({ ...note, userId }))).returning();
}

export function updateNoteById(id: string, data: NoteUpdateParams) {
  return db.update(note).set(data).where(eq(note.id, id));
}