// import React from 'react';

// export default function Note() {
//     return (
//         <div className='w-[80%] bg-pink-200 '>
//             <div>Title</div>
//             <div>Content</div>
//             <div>Tags</div>
//         </div>
//     );
// };

import { useNotesStore } from "@/store/notes-store";
import { Note } from "@/types";
import React from "react";

interface NoteProps {
  note: Note;
}

const NoteItem: React.FC<NoteProps> = ({ note }) => {
  const { removeNote } = useNotesStore();

  const handleRemove = () => {
    removeNote(note.id);
  };

  return (
    <div className="bg-white text-black shadow-md rounded-lg p-4 flex flex-col md:flex-row">
      <div className="grow">
        <h2 className="font-bold text-base mb-1">{note.title}</h2>
        <div className="flex-1 text-sm line-clamp-3 text-gray-500 mb-4">
          {note.content}
        </div>
        {
          /* <div className="flex flex-row space-x-52 items-center mb-4w-full ">
          <button className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out">
            More
          </button>
          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 transition duration-150 ease-in-out"
          >
            Remove
          </button>
        </div> */
        }
        <div className="flex flex-wrap gap-2 flex-none">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-500 text-xs px-2.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {
        /* <div className="text-right text-sm text-gray-500 mt-4 md:mt-0 md:ml-4">
        {formatIsoDate(note.createdAt)}
      </div> */
      }
    </div>
  );
};

export default NoteItem;

export function formatIsoDate(isoDate: string): string {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
}
