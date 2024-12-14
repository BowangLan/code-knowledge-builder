type Note = {
  id: string;
  title: string;
  content: string;
  tags: unknown;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

type NoteCreateParams = {
  title: string;
  content: string;
  tags: unknown;
}

type NoteCreateParamsWithUserId = NoteCreateParams & {
  userId: string;
}

type NoteUpdateParams = {
  title?: string;
  content?: string;
  tags?: unknown;
}

type NoteUpdateParamsWithUserId = NoteUpdateParams & {
  userId: string;
}