import { FileSystemItem, ItemType } from "@/types";
import { v4 as uuidv4 } from "uuid";


// Find an item by ID recursively
export function findItem(
  root: FileSystemItem,
  id: string
): FileSystemItem | null {
  if (root.id === id) return root;
  if (root.children) {
    for (const child of root.children) {
      const found = findItem(child, id);
      if (found) return found;
    }
  }
  return null;
}

// Create a new file or folder
export function createItem(
  root: FileSystemItem,
  parentId: string,
  name: string,
  type: ItemType
): FileSystemItem {
  if (root.id === parentId) {
    return {
      ...root,
      children: [
        ...(root.children || []),
        {
          id: uuidv4(),
          name,
          type,
          content: type === "file" ? "" : undefined,
          children: type === "folder" ? [] : undefined,
        },
      ],
    };
  }
  return {
    ...root,
    children: root.children?.map((child) =>
      createItem(child, parentId, name, type)
    ),
  };
}

// Rename a specific item
export function renameItem(
  root: FileSystemItem,
  id: string,
  newName: string
): FileSystemItem {
  if (root.id === id) return { ...root, name: newName };
  return {
    ...root,
    children: root.children?.map((child) =>
      renameItem(child, id, newName)
    ),
  };
}

// Delete an item and its children
export function deleteItem(
  root: FileSystemItem,
  id: string
): FileSystemItem {
  return {
    ...root,
    children: root.children
      ?.filter((child) => child.id !== id)
      .map((child) => deleteItem(child, id)),
  };
}

// Update the content of a specific text file
export function updateFileContent(
  root: FileSystemItem,
  id: string,
  content: string
): FileSystemItem {
  if (root.id === id) return { ...root, content };
  return {
    ...root,
    children: root.children?.map((child) =>
      updateFileContent(child, id, content)
    ),
  };
}