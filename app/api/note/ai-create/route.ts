import { auth } from "@/app/(auth)/auth";
import { customModel } from "@/lib/ai";
import { createNotes, getNotesByUser } from "@/lib/db/queries/note_queries"
import { generateObject, streamText } from "ai";
import { request } from "http"
import { z } from "zod";


function aggregateTagsFromNotes(notes: Note[]) {
  const tags = new Set<string>()
  notes.forEach((note) => {
    note.tags.forEach((tag) => {
      tags.add(tag)
    })
  })
  return Array.from(tags)
}

const SYSTEM_PROMPT = `
You are a helpful assistant and expert in creating notes.

You will be given a list of notes, a list of tags, and a user input.
Your task is to create a list of new notes from the given user input. These notes should capture the knowledge
necessary to write the original user input.

For exampe, if the user input is a code snippet, you should create a list of how-tos, what-tos, and best-practices
to write the code snippet.

Extract tags from each note appropriately, re-using existing tags. If the tag does not exist, create it.

Each note's content should be short and concise.

Don't generate DUPLICATE NOTES with the same information. 
You can see how the user has learnt from the past notes' titles, 
It's ok to return no notes.
`

function makePrompt(nodes: Note[], userInput: string) {
  const tags = aggregateTagsFromNotes(nodes)
  const output = `
  <UserInput>
  ${userInput}
  </UserInput>
  <Notes>
  ${nodes.map((node) => {
    return `
    <Note id="${node.id}" title="${node.title}" />
    `
  })}
  </Notes>
  <Tags>
  ${tags.map((tag) => {
    return `
    <Tag>${tag}</Tag>
    `
  })}
  </Tags>
  `
  return output
}

export async function POST(request: Request) {
  const { userInput } = await request.json()
  // const body = await await request.body;

  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return new Response('Unauthorized', { status: 401 });
  }
  const userId = session.user.id


  const allNotes = await getNotesByUser(userId)

  const prompt = makePrompt(allNotes, userInput)

  // pass the prompt to the AI
  // and get the response

  // const response = await 
  const result = await generateObject({
    model: customModel("gpt-4o"),
    system: SYSTEM_PROMPT,
    // messages: [
    //   { role: "user", content: prompt },
    // ],
    prompt,
    schema: z.object({
      notes: z.array(
        z.object({
          // id: z.string(),
          title: z.string(),
          content: z.string(),
          tags: z.array(z.string()),
        })
      ),
    }),
  })

  const createdNotes = await createNotes(result.object.notes, userId)

  // const textResult = await result.text
  // console.log(result.object)

  return Response.json(createdNotes)
}