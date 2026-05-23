import { FileSystemItem } from "@/types";

export const initialData: FileSystemItem = {
  id: "root",
  name: "Drive",
  type: "folder",
  children: [
    {
      id: "folder-1",
      name: "Documents",
      type: "folder",
      children: [
        {
          id: "file-1",
          name: "Resume.txt",
          type: "file",
          content: "John Doe\nFull Stack Developer\n\nExperience:\n- React, Next.js, TypeScript\n- Node.js, Express\n- MongoDB, PostgreSQL",
        },
        {
          id: "file-2",
          name: "Notes.txt",
          type: "file",
          content: "Meeting notes:\n- Discuss project timeline\n- Review design mockups\n- Plan sprint goals",
        },
      ],
    },
    {
      id: "folder-2",
      name: "Projects",
      type: "folder",
      children: [
        {
          id: "folder-3",
          name: "WebApp",
          type: "folder",
          children: [
            {
              id: "file-3",
              name: "todo.txt",
              type: "file",
              content: "TODO:\n[ ] Setup project\n[ ] Build UI\n[ ] Add API integration",
            },
          ],
        },
        {
          id: "folder-4",
          name: "MobileApp",
          type: "folder",
          children: [],
        },
      ],
    },
    {
      id: "folder-5",
      name: "Pictures",
      type: "folder",
      children: [],
    },
    {
      id: "file-4",
      name: "readme.txt",
      type: "file",
      content: "Welcome to Mini File Explorer!\n\nFeatures:\n- Create folders and files\n- Rename items\n- Delete items\n- Edit text files",
    },
  ],
};