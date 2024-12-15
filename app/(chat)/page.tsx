import { cookies } from "next/headers";

import { Chat } from "@/components/chat";
import { DEFAULT_MODEL_NAME, models } from "@/lib/ai/models";
import { generateUUID } from "@/lib/utils";
import NoteList from "@/components/notes/note-list";
import DataLoader from "./data-loader";
import { getNotesByUser } from "@/lib/db/queries/note_queries";
import { auth } from "../(auth)/auth";

export default async function Page() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return (
      <>
        <div>Not Authorized</div>
      </>
    );
  }
  const userId = session.user.id;

  // const cookieStore = await cookies();
  // const modelIdFromCookie = cookieStore.get('model-id')?.value;

  // const selectedModelId =
  //   models.find((model) => model.id === modelIdFromCookie)?.id ||
  //   DEFAULT_MODEL_NAME;
  const notes = await getNotesByUser(userId);

  return (
    <>
      <NoteList />
      <DataLoader notes={notes} />
    </>
  );
}
