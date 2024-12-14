type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

type NoteCreateParams = {
  title: string;
  content: string;
  tags: string[];
}

type NoteCreateParamsWithUserId = NoteCreateParams & {
  userId: string;
}

type NoteUpdateParams = {
  title?: string;
  content?: string;
  tags?: string[];
}

type NoteUpdateParamsWithUserId = NoteUpdateParams & {
  userId: string;
}