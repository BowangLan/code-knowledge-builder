import { Note } from '@/types';

export const mockNotes: Note[] = [
    {
      id: 1,
      title: "Meeting Notes",
      content: "Discussed the upcoming project milestones and deadlines.",
      createdAt: "2023-12-10T14:48:00Z",
      tags: ["work", "meeting", "project"],
      userId: 101
    },
    {
      id: 2,
      title: "Grocery List",
      content: "Eggs, milk, bread, bananas, and chicken.",
      createdAt: "2023-12-11T09:24:00Z",
      tags: ["personal", "shopping"],
      userId: 102
    },
    {
      id: 3,
      title: "Book Recommendations",
      content: "1. 'Dune' by Frank Herbert 2. 'Foundation' by Isaac Asimov 3. 'Neuromancer' by William Gibson",
      createdAt: "2023-12-12T20:15:00Z",
      tags: ["books", "recommendations"],
      userId: 103
    }
];
  